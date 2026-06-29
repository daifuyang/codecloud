import { cn } from '#/lib/utils';
import type { ProductMeta } from '#/data/products';

interface ProductMockFallbackProps {
  product: ProductMeta;
  placeholder: string;
}

/**
 * 非 CRM 产品的 fallback 占位：
 * 3 层渐变 + 抽象图形 + 占位说明
 */
export function ProductMockFallback({ product, placeholder }: ProductMockFallbackProps) {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* 背景层：大渐变 */}
      <div
        className={cn(
          'absolute inset-0 z-10 rounded-2xl border border-border',
          'bg-gradient-to-br from-brand-500/15 via-accent-500/10 to-brand-700/15',
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 mask-radial" />
      </div>

      {/* 中层：抽象图形 */}
      <div
        className={cn(
          'absolute right-6 top-6 z-20 h-24 w-24 rounded-2xl',
          'bg-gradient-to-br from-brand-500 to-accent-500 opacity-80',
          'shadow-lg blur-[2px]',
        )}
      />
      <div
        className={cn(
          'absolute bottom-12 left-8 z-20 h-16 w-16 rounded-xl',
          'bg-gradient-to-br from-accent-500 to-brand-700 opacity-70',
          'shadow-md blur-[1px]',
        )}
      />

      {/* 前景：产品首字母 + 占位说明 */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3">
        <span
          className={cn(
            'inline-flex h-16 w-16 items-center justify-center rounded-2xl',
            'bg-gradient-to-br from-brand-500 to-accent-500',
            'text-2xl font-black text-white shadow-xl',
          )}
        >
          {product.name.charAt(0)}
        </span>
        <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-text-soft backdrop-blur">
          {placeholder}
        </span>
      </div>
    </div>
  );
}