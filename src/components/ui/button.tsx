import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '#/lib/utils.ts';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /**
   * 把样式合到唯一子元素上（典型用法是包一个 <Link>）。
   * 父级 props（如 onClick）会透传。
   */
  asChild?: boolean;
}

const VARIANT_MAP: Record<Variant, string> = {
  primary: cn(
    'bg-brand-500 text-white shadow-sm',
    'hover:bg-brand-600 hover:shadow-md hover:-translate-y-0.5',
    'active:bg-brand-700 active:translate-y-0',
    'focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2',
  ),
  secondary: cn(
    'bg-surface-strong text-text border border-border',
    'hover:bg-surface hover:border-border-strong',
    'focus-visible:ring-2 focus-visible:ring-brand-500/30',
  ),
  ghost: cn('text-text-soft', 'hover:bg-surface-strong hover:text-text'),
  outline: cn('border border-border-strong text-text bg-transparent', 'hover:bg-surface-strong'),
};

const SIZE_MAP: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
};

const BASE_CLASSES = cn(
  'inline-flex items-center justify-center font-semibold whitespace-nowrap',
  'transition-all duration-200',
  'disabled:opacity-50 disabled:pointer-events-none',
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    className,
    children,
    asChild = false,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classes = cn(BASE_CLASSES, VARIANT_MAP[variant], SIZE_MAP[size], className);

  if (asChild) {
    const child = Children.only(children);
    if (isValidElement(child)) {
      const el = child as ReactElement<{ className?: string; children?: ReactNode }>;
      return cloneElement(el, {
        ...rest,
        className: cn(classes, el.props.className),
        children: (
          <>
            {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
            {el.props.children}
            {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
          </>
        ),
      });
    }
  }

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
    </button>
  );
});
