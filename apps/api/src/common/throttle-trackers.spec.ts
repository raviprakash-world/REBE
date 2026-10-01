import type { Request } from 'express';
import { clientIp, upstreamIp } from './throttle-trackers';

const req = (headers: Record<string, string>, ip = '::1') => ({ headers, ip }) as unknown as Request;

describe('throttle trackers', () => {
  // Header shape copied from a real Render request log for a Vercel-proxied call.
  const viaVercel = req({
    'cf-connecting-ip': '13.127.127.107',
    'x-vercel-forwarded-for': '157.49.116.240',
    'x-forwarded-for': '157.49.116.240,13.127.127.107, 172.68.175.70, 10.31.245.18',
  });

  it('keys shoppers behind the Vercel proxy on their own IP', () => {
    expect(clientIp(viaVercel)).toBe('157.49.116.240');
  });

  it('keys the backstop on the Cloudflare-set upstream IP, not the forgeable header', () => {
    expect(upstreamIp(viaVercel)).toBe('13.127.127.107');
  });

  it('keys direct callers on the Cloudflare IP', () => {
    const direct = req({ 'cf-connecting-ip': '203.0.113.9' });
    expect(clientIp(direct)).toBe('203.0.113.9');
    expect(upstreamIp(direct)).toBe('203.0.113.9');
  });

  it('falls back to req.ip with no proxy headers (local dev)', () => {
    expect(clientIp(req({}, '127.0.0.1'))).toBe('127.0.0.1');
  });
});
