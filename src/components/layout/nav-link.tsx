import { Link } from '@tanstack/react-router';
import { cn } from '#/lib/utils.ts';

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavLink({ href, label, active = false, onClick }: NavLinkProps) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center px-1 py-2 text-sm font-medium transition-colors',
        active ? 'text-text' : 'text-text-soft hover:text-text',
        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full',
        'after:scale-x-0 after:bg-gradient-to-r after:from-brand-500 after:to-accent-500',
        'after:origin-left after:transition-transform after:duration-200',
        active || 'group-hover:after:scale-x-100',
        active && 'after:scale-x-100',
      )}
    >
      {label}
    </Link>
  );
}
