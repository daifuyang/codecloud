import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '#/lib/utils.ts';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  children?: ReactNode;
}

/**
 * 通用卡片：边框 + 背景 + 阴影 + 圆角
 * - interactive: 增加 hover 抬升效果
 */
export function Card({ interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface',
        'shadow-sm',
        interactive &&
          cn(
            'transition-all duration-300',
            'hover:-translate-y-1 hover:shadow-lg hover:border-brand-500/40',
          ),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
