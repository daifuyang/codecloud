import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '#/components/ui/index.ts';
import type { Product } from '#/lib/constants.ts';
import { cn } from '#/lib/utils.ts';

interface ProductCardProps {
  product: Product;
  tag: string;
}

export function ProductCard({ product, tag }: ProductCardProps) {
  return (
    <Card
      interactive
      className={cn(
        'group relative flex h-full min-h-64 flex-col overflow-hidden p-7 sm:p-8',
        'bg-surface-elevated shadow-none',
        'dark:bg-surface',
      )}
    >
      <div className="mb-7 flex items-center justify-between gap-4">
        <span className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text-soft dark:bg-surface-strong">
          {tag}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-text">
        <Link
          to={product.href}
          className="outline-none transition-colors hover:text-brand-600 focus-visible:text-brand-600 dark:hover:text-brand-300 dark:focus-visible:text-brand-300"
        >
          {product.name}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-base leading-7 text-text-soft">{product.description}</p>

      <Link
        to={product.href}
        className={cn(
          'mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold',
          'text-text transition-colors hover:text-brand-600 dark:hover:text-brand-300',
        )}
      >
        <span>了解详情</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Card>
  );
}
