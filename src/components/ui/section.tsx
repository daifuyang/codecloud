import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '#/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  /** 主题：default = 浅色，dark = 强制深色（不跟随用户主题） */
  variant?: 'default' | 'dark';
  children?: ReactNode;
}

const SPACING_MAP = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-28',
  xl: 'py-24 sm:py-36',
} as const;

/**
 * 区块容器，统一垂直间距 + 主题切换
 */
export function Section({
  as: Tag = 'section',
  spacing = 'lg',
  variant = 'default',
  className,
  children,
  ...rest
}: SectionProps) {
  const Component = Tag;
  return (
    <Component
      className={cn(
        'relative',
        SPACING_MAP[spacing],
        variant === 'dark' && 'bg-section-dark text-slate-100',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}