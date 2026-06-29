/**
 * 站点静态配置 & 内容数据
 * 文案走 i18n，结构化数据（产品 / 能力 / 指标）放这里
 */

export const SITE = {
  brand: '码上云',
  brandEn: 'CodeCloaud',
  productLine: '移山',
  domain: 'mashangcloud.com',
  contact: {
    email: 'codecloud2020@163.com',
    phone: '19201439219',
    address: '上海市浦东新区张江高科技园区',
  },
  social: {
    github: 'https://github.com/mashangcloud',
    wechat: '码上云官方',
  },
  icp: '浙ICP备2020040312号',
} as const;

/* === 顶部导航 === */
export interface NavItem {
  key: string;
  href: string;
  labelKey: 'nav.home' | 'nav.products' | 'nav.services' | 'nav.about' | 'nav.contact';
}

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/', labelKey: 'nav.home' },
  { key: 'products', href: '/products', labelKey: 'nav.products' },
  { key: 'services', href: '/services', labelKey: 'nav.services' },
  { key: 'about', href: '/about', labelKey: 'nav.about' },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact' },
] as const;

/* === 首页：产品矩阵（4 个） === */
export interface Product {
  id: string;
  name: string;
  description: string;
  href: string;
  tagKey: 'product.genlabs.tag' | 'product.media.tag' | 'product.crm.tag' | 'product.mall.tag';
}

export const HOME_PRODUCTS: readonly Product[] = [
  {
    id: 'genlabs',
    name: 'genlabs.cc',
    description: '面向自媒体创作者的 AI 内容服务平台，集成素材库、配音、图片、视频和作品草稿。',
    href: '/products/genlabs',
    tagKey: 'product.genlabs.tag',
  },
  {
    id: 'media',
    name: '新媒体素材管理平台',
    description: '为公众号、知乎等新媒体团队提供素材沉淀、内容编排、多平台适配和一键快速发布。',
    href: '/products/media',
    tagKey: 'product.media.tag',
  },
  {
    id: 'crm',
    name: '移山 CRM',
    description: '面向中小企业的客户管理系统，覆盖线索、客户、商机、合同、回款和跟进记录。',
    href: '/products/crm',
    tagKey: 'product.crm.tag',
  },
  {
    id: 'mall',
    name: '移山商城',
    description:
      '面向中小商家的商城系统，复用成熟的电商经验，覆盖商品、订单、库存、营销与小程序端。',
    href: '/products/mall',
    tagKey: 'product.mall.tag',
  },
] as const;

/* === 首页：能力矩阵（4 大系列） === */
export interface Capability {
  id: 'content' | 'customer' | 'commerce' | 'foundry';
  titleKey:
    | 'capability.content.title'
    | 'capability.customer.title'
    | 'capability.commerce.title'
    | 'capability.foundry.title';
  descKey:
    | 'capability.content.desc'
    | 'capability.customer.desc'
    | 'capability.commerce.desc'
    | 'capability.foundry.desc';
  bulletsKey:
    | 'capability.content.bullets'
    | 'capability.customer.bullets'
    | 'capability.commerce.bullets'
    | 'capability.foundry.bullets';
  href: string;
}

export const HOME_CAPABILITIES: readonly Capability[] = [
  {
    id: 'content',
    titleKey: 'capability.content.title',
    descKey: 'capability.content.desc',
    bulletsKey: 'capability.content.bullets',
    href: '/services/content',
  },
  {
    id: 'customer',
    titleKey: 'capability.customer.title',
    descKey: 'capability.customer.desc',
    bulletsKey: 'capability.customer.bullets',
    href: '/services/customer',
  },
  {
    id: 'commerce',
    titleKey: 'capability.commerce.title',
    descKey: 'capability.commerce.desc',
    bulletsKey: 'capability.commerce.bullets',
    href: '/services/commerce',
  },
  {
    id: 'foundry',
    titleKey: 'capability.foundry.title',
    descKey: 'capability.foundry.desc',
    bulletsKey: 'capability.foundry.bullets',
    href: '/services/foundry',
  },
] as const;

/* === 首页：关键指标 === */
export interface Metric {
  valueKey: 'metric.50.value' | 'metric.10.value' | 'metric.4.value' | 'metric.99.value';
  labelKey: 'metric.50.label' | 'metric.10.label' | 'metric.4.label' | 'metric.99.label';
  suffix?: string;
}

export const HOME_METRICS: readonly Metric[] = [
  { valueKey: 'metric.50.value', labelKey: 'metric.50.label', suffix: '+' },
  { valueKey: 'metric.10.value', labelKey: 'metric.10.label', suffix: '+' },
  { valueKey: 'metric.4.value', labelKey: 'metric.4.label' },
  { valueKey: 'metric.99.value', labelKey: 'metric.99.label', suffix: '%' },
] as const;

/* === 首页：客户证言（占位） === */
export interface Testimonial {
  quoteKey: 'testimonial.1.quote' | 'testimonial.2.quote' | 'testimonial.3.quote';
  nameKey: 'testimonial.1.name' | 'testimonial.2.name' | 'testimonial.3.name';
  roleKey: 'testimonial.1.role' | 'testimonial.2.role' | 'testimonial.3.role';
  avatar: string;
}

export const HOME_TESTIMONIALS: readonly Testimonial[] = [
  {
    quoteKey: 'testimonial.1.quote',
    nameKey: 'testimonial.1.name',
    roleKey: 'testimonial.1.role',
    avatar: 'A',
  },
  {
    quoteKey: 'testimonial.2.quote',
    nameKey: 'testimonial.2.name',
    roleKey: 'testimonial.2.role',
    avatar: 'L',
  },
  {
    quoteKey: 'testimonial.3.quote',
    nameKey: 'testimonial.3.name',
    roleKey: 'testimonial.3.role',
    avatar: 'Z',
  },
] as const;
