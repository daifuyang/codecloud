import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '#/lib/utils';

interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface BentoItemProps extends HTMLAttributes<HTMLDivElement> {
  /** 占几列（lg 断点下生效） */
  colSpan?: 1 | 2 | 3 | 4 | 6;
  /** 占几行 */
  rowSpan?: 1 | 2;
  /** 视觉强调：primary 用品牌色边框，quiet 用灰色 */
  tone?: 'default' | 'primary' | 'quiet';
  children?: ReactNode;
}

const COL_SPAN_MAP: Record<NonNullable<BentoItemProps['colSpan']>, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  6: 'lg:col-span-6',
};

const ROW_SPAN_MAP: Record<NonNullable<BentoItemProps['rowSpan']>, string> = {
  1: 'lg:row-span-1',
  2: 'lg:row-span-2',
};

const TONE_MAP: Record<NonNullable<BentoItemProps['tone']>, string> = {
  default: 'border-border bg-surface',
  primary: 'border-brand-500/30 bg-gradient-to-br from-brand-50/60 to-surface',
  quiet: 'border-border/60 bg-surface/40',
};

/**
 * Bento 网格容器：12 列（lg+），移动端 1 列
 */
export function BentoGrid({ className, children, ...rest }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(180px,auto)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Bento 单项：支持 colSpan / rowSpan / tone
 */
export function BentoItem({
  colSpan = 1,
  rowSpan = 1,
  tone = 'default',
  className,
  children,
  ...rest
}: BentoItemProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-6',
        'transition-all duration-300',
        tone === 'primary'
          ? 'hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-lg'
          : 'hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md',
        COL_SPAN_MAP[colSpan],
        ROW_SPAN_MAP[rowSpan],
        TONE_MAP[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}