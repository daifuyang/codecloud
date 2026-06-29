/**
 * 字典类型：所有 key 必须出现在 Dictionary 中。
 * 这样写错 key 时 TS 会报错。
 */
export type Locale = 'zh' | 'en';

export const LOCALES: readonly Locale[] = ['zh', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'zh';

export type Dictionary = {
  common: {
    cta: string;
    ctaSecondary: string;
    learnMore: string;
    contactSales: string;
    bookDemo: string;
    getStarted: string;
    copyright: string;
  };
  nav: {
    home: string;
    products: string;
    services: string;
    about: string;
    contact: string;
  };
  theme: {
    light: string;
    dark: string;
    auto: string;
  };
  lang: {
    zh: string;
    en: string;
    switchTo: string;
  };
  home: {
    hero: {
      kicker: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
    metrics: {
      kicker: string;
    };
    products: {
      kicker: string;
      title: string;
      subtitle: string;
      viewAll: string;
    };
    capabilities: {
      kicker: string;
      title: string;
      subtitle: string;
    };
    testimonials: {
      kicker: string;
      title: string;
      subtitle: string;
    };
    cta: {
      title: string;
      subtitle: string;
      primaryCta: string;
    };
  };
  product: {
    genlabs: { tag: string };
    media: { tag: string };
    crm: { tag: string };
    mall: { tag: string };
  };
  capability: {
    content: { title: string; desc: string; bullets: readonly string[] };
    customer: { title: string; desc: string; bullets: readonly string[] };
    commerce: { title: string; desc: string; bullets: readonly string[] };
    foundry: { title: string; desc: string; bullets: readonly string[] };
  };
  metric: {
    '50': { value: string; label: string };
    '10': { value: string; label: string };
    '4': { value: string; label: string };
    '99': { value: string; label: string };
  };
  testimonial: {
    '1': { quote: string; name: string; role: string };
    '2': { quote: string; name: string; role: string };
    '3': { quote: string; name: string; role: string };
  };
  footer: {
    tagline: string;
    products: string;
    services: string;
    company: string;
    contact: string;
    icp: string;
  };
  productDetail: {
    common: {
      breadcrumbHome: string;
      breadcrumbProducts: string;
      primaryCta: string;
      secondaryCta: string;
      screenshotPlaceholder: string;
      logosKicker: string;
      fig: {
        '01': string;
        '02': string;
        '03': string;
        '04': string;
        '05': string;
        '06': string;
      };
      sections: {
        featuresKicker: string;
        scenariosKicker: string;
        screenshotKicker: string;
        faqsKicker: string;
        relatedKicker: string;
        ctaKicker: string;
        ctaTitle: string;
        ctaSubtitle: string;
        ctaPrimary: string;
      };
    };
    crm: ProductDetailContent;
    genlabs: ProductDetailContent;
    media: ProductDetailContent;
    mall: ProductDetailContent;
  };
};

export interface ProductDetailContent {
  tagline: string;
  description: string;
  features: {
    title: string;
    items: ReadonlyArray<{ title: string; desc: string }>;
  };
  scenarios: {
    title: string;
    items: ReadonlyArray<{ title: string; role: string; desc: string }>;
  };
  faqs: {
    title: string;
    items: ReadonlyArray<{ q: string; a: string }>;
  };
}
