import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '#/lib/utils.ts';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
}

const SIZE_MAP = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
} as const;

/**
 * 居中容器，带水平内边距。
 */
export function Container({
  as: Tag = 'div',
  size = 'xl',
  className,
  children,
  ...rest
}: ContainerProps) {
  const Component = Tag;
  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', SIZE_MAP[size], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
