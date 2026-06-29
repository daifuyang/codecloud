import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '#/lib/utils.ts';

interface KickerProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/**
 * 小标签：分区上方的眉题（小写大写英文风格）
 */
export function Kicker({ children, className, ...rest }: KickerProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        'text-xs font-semibold uppercase tracking-[0.16em] text-brand-600',
        'dark:text-brand-400',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
