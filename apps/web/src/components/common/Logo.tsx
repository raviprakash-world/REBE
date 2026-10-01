import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  /** Use light on the pine hero/footer blocks, dark everywhere else. */
  tone?: 'dark' | 'light';
}

/**
 * Mark: two leaves splitting open from a common point, stem tapering below
 * into a root - a seedling breaking ground. Carried over from the Tane
 * identity, where the same shape doubled as a "T" letterform; that reading
 * doesn't carry over to "Rebe" (wrong first letter), so this is now just
 * the growth mark on its own merits. One fill color, no separate stroke
 * details, so it holds up unbroken from the 16px favicon to a hero mark.
 * TODO: if an "R" letterform integration is wanted, that's a real redesign
 * pass, not a find-and-replace - flagged, not done here.
 */
export function Logo({ className, tone = 'dark' }: LogoProps) {
  const color = tone === 'dark' ? 'var(--color-heading)' : 'var(--color-cream-light)';
  return (
    <span className={cn('inline-flex items-center gap-2 font-display font-semibold text-xl', className)} style={{ color }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M10.8 8.6L13.2 8.6C13.1 12.6 12.9 17 12.4 19.4C12.3 19.9 11.7 19.9 11.6 19.4C11.1 17 10.9 12.6 10.8 8.6Z"
          fill={color}
        />
        <path d="M12 9.6C9.8 7.6 6.5 6.6 3.8 8.4C6.3 9.6 9.6 10.2 12 9.6Z" fill={color} />
        <path d="M12 9.6C14.2 7.6 17.5 6.6 20.2 8.4C17.7 9.6 14.4 10.2 12 9.6Z" fill={color} />
      </svg>
      Rebe
    </span>
  );
}
