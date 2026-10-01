import type { Request } from 'express';

// Verified against real Render request logs: every request reaches Node from
// Render's local proxy (req.ip is always ::1), so keying on req.ip put every
// shopper in one shared bucket. Cloudflare sits in front of Render and
// overwrites cf-connecting-ip, so that header can't be forged — but for
// traffic via the Vercel /api rewrite it's a Vercel egress IP shared by many
// shoppers. Vercel puts the real shopper in x-vercel-forwarded-for, which a
// direct caller CAN forge. Hence two throttlers: a per-shopper one keyed on
// clientIp, and an upstream backstop keyed on the unforgeable upstreamIp so
// forging the header can't buy more than the backstop allows.

function header(req: Request, name: string): string | undefined {
  const v = req.headers[name];
  const first = (Array.isArray(v) ? v[0] : v)?.split(',')[0]?.trim();
  return first || undefined;
}

export function upstreamIp(req: Request): string {
  return header(req, 'cf-connecting-ip') ?? req.ip ?? 'unknown';
}

export function clientIp(req: Request): string {
  return header(req, 'x-vercel-forwarded-for') ?? upstreamIp(req);
}
