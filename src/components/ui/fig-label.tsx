import type { HTMLAttributes } from 'react';
import { cn } from '#/lib/utils';

interface FigLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** 编号数字，如 2 → "FIG 0.2" */
  n: number;
}

/**
 * Linear 风格小编号标签：FIG 0.X
 * 用于 section header / 卡片左上角，制造"产品手册化"叙事感
 */
export function FigLabel({ n, className, ...rest }: FigLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.16em]',
        'text-brand-600 dark:text-brand-400',
        className,
      )}
      {...rest}
    >
      Fig 0.{n}
    </span>
  );
}