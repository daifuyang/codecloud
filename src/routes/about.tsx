import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Check } from 'lucide-react';
import { Button, Card, Container } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_METRICS, SITE } from '#/lib/constants.ts';

export const Route = createFileRoute('/about')({ component: AboutPage });

const PRINCIPLES = {
  zh: [
    { title: '先解决真实问题', desc: '不为了炫技堆功能，优先把客户每天都在发生的流程做顺。' },
    { title: '产品化优先', desc: '能复用成熟产品就不重新造轮子，把预算花在真正差异化的环节。' },
    { title: '长期可维护', desc: '从上线第一天就考虑权限、数据、运维和后续迭代成本。' },
  ],
  en: [
    { title: 'Solve real problems first', desc: 'We avoid feature theater and focus on workflows teams run every day.' },
    { title: 'Product-first delivery', desc: 'Reuse mature products whenever possible and spend budget on real differentiation.' },
    { title: 'Built to maintain', desc: 'Permissions, data, operations and iteration cost are considered from day one.' },
  ],
} as const;

function AboutPage() {
  const { t, locale } = useT();
  const principles = PRINCIPLES[locale];

  return (
    <Container size="lg" className="py-10 sm:py-14">
      <section className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
          {t.nav.about}
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {locale === 'zh'
            ? '用产品和工程能力，陪中小企业把业务跑稳'
            : 'Product and engineering capability for SMBs that need to run steadily'}
        </h1>
        <p className="mt-5 text-lg leading-8 text-text-soft">
          {locale === 'zh'
            ? `${SITE.brand} 专注于 AI 内容、客户经营、交易变现和技术底座，把可复用的软件产品与可落地的工程交付结合起来，帮助团队减少重复劳动、沉淀数据资产。`
            : `${SITE.brandEn} focuses on AI content, customer operations, commerce and platform foundations, combining reusable software products with practical engineering delivery.`}
        </p>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_METRICS.map((metric) => {
          const valueKey = metric.valueKey.split('.')[1] as '50' | '10' | '4' | '99';
          const metricData = t.metric[valueKey];

          return (
            <Card key={metric.valueKey} className="bg-surface-elevated p-6 shadow-none dark:bg-surface">
              <p className="text-3xl font-semibold tracking-tight text-text">
                {metricData.value}
                {metric.suffix}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-soft">{metricData.label}</p>
            </Card>
          );
        })}
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
            {locale === 'zh' ? '我们相信' : 'What we believe'}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">
            {locale === 'zh' ? '软件应该让业务更轻，而不是更复杂' : 'Software should make work lighter, not more complex'}
          </h2>
          <p className="mt-5 text-base leading-8 text-text-soft">
            {locale === 'zh'
              ? '中小企业最需要的不是庞大的系统蓝图，而是能快速上线、持续迭代、团队愿意每天使用的工具。'
              : 'SMBs do not need oversized system blueprints. They need tools that launch quickly, evolve steadily and get used every day.'}
          </p>
        </div>

        <div className="grid gap-4">
          {principles.map((item) => (
            <Card key={item.title} className="bg-surface-elevated p-6 shadow-none dark:bg-surface">
              <div className="flex gap-4">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-soft">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-5 rounded-2xl border border-border bg-surface-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:bg-surface">
        <div>
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">
            {locale === 'zh' ? '想了解我们能做什么？' : 'Want to see what we can do?'}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">
            {locale === 'zh' ? '从一次业务梳理开始' : 'Start with a workflow review'}
          </h2>
        </div>
        <Button asChild variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
          <Link to="/contact">{t.common.bookDemo}</Link>
        </Button>
      </section>
    </Container>
  );
}
