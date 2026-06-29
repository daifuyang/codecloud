import { Link } from '@tanstack/react-router';
import { PRODUCT_META } from '#/data/products.ts';
import { useT } from '#/i18n/index.tsx';
import { cn } from '#/lib/utils.ts';

interface ProductSidebarProps {
  currentId?: string;
}

export function ProductSidebar({ currentId }: ProductSidebarProps) {
  const { t } = useT();

  return (
    <aside className="sticky top-20 hidden h-fit w-56 shrink-0 lg:block">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
        {t.productDetail.common.breadcrumbProducts}
      </div>
      <nav className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-2">
        {PRODUCT_META.map((p) => {
          const active = currentId === p.id;
          return (
            <Link
              key={p.id}
              to={p.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                  : 'text-text-soft hover:bg-surface-strong hover:text-text',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-black',
                  active ? 'bg-brand-500 text-white' : 'bg-surface-strong text-text-soft',
                )}
              >
                {p.name.charAt(0)}
              </span>
              <span className="truncate">{p.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
