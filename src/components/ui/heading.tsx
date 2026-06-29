import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '#/lib/utils.ts';

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  children?: ReactNode;
}

const SIZE_MAP: Record<HeadingSize, string> = {
  sm: 'text-lg sm:text-xl',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl',
  xl: 'text-3xl sm:text-4xl lg:text-5xl',
  '2xl': 'text-4xl sm:text-6xl lg:text-7xl',
  '3xl': 'text-5xl sm:text-7xl lg:text-8xl',
};

const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
};

/**
 * 排版标题，自动根据 as 选择合适尺寸，可覆盖。
 */
export function Heading({ as = 2, size, className, children, ...rest }: HeadingProps) {
  const Tag = `h${as}` as ElementType;
  const finalSize = size ?? DEFAULT_SIZE[as];
  return (
    <Tag
      className={cn(
        'font-bold tracking-[-0.02em] text-text',
        as === 1 && 'leading-[1.05]',
        SIZE_MAP[finalSize],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}