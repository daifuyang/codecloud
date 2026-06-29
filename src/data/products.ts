/**
 * 产品详情数据
 * 结构性字段放这里，文案走 i18n（按 productDetail.{id} 分组）
 */

export type ProductId = 'crm' | 'genlabs' | 'media' | 'mall';
export type Accent = 'cyan' | 'blue' | 'emerald' | 'slate';

export interface ProductMeta {
  id: ProductId;
  name: string;
  href: string;
  accent: Accent;
}

export const PRODUCT_META: readonly ProductMeta[] = [
  { id: 'crm', name: '移山 CRM', href: '/products/crm', accent: 'cyan' },
  { id: 'genlabs', name: 'genlabs.cc', href: '/products/genlabs', accent: 'blue' },
  { id: 'media', name: '新媒体素材管理平台', href: '/products/media', accent: 'emerald' },
  { id: 'mall', name: '移山商城', href: '/products/mall', accent: 'slate' },
] as const;

export const PRODUCT_META_BY_ID: Record<ProductId, ProductMeta> = PRODUCT_META.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<ProductId, ProductMeta>,
);

export function isProductId(id: string): id is ProductId {
  return id in PRODUCT_META_BY_ID;
}

/** i18n key 命名空间（按 id） */
export const I18N_NAMESPACE = 'productDetail' as const;
