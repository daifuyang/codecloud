import { Link } from '@tanstack/react-router';
import { ArrowRight, Check } from 'lucide-react';
import { Button, Card, Container, Section } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';

export function HeroSection() {
  const { t, locale } = useT();
  const entryCards =
    locale === 'zh'
      ? [
          {
            title: '想提升内容效率',
            desc: 'AI 写作、素材管理、多平台发布',
            href: '/products/genlabs',
          },
          {
            title: '想管好客户和回款',
            desc: '线索、客户、商机、合同全流程',
            href: '/products/crm',
          },
          {
            title: '想搭建业务系统',
            desc: '商城、CRM、云资源和定制交付',
            href: '/services',
          },
        ]
      : [
          {
            title: 'Improve content output',
            desc: 'AI writing, asset management and publishing',
            href: '/products/genlabs',
          },
          {
            title: 'Manage customers and payments',
            desc: 'Leads, accounts, deals and contracts',
            href: '/products/crm',
          },
          {
            title: 'Build business systems',
            desc: 'Commerce, CRM, cloud and custom delivery',
            href: '/services',
          },
        ];

  return (
    <Section spacing="lg" className="overflow-hidden border-b border-border bg-bg">
      <Container size="lg" className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-border bg-surface-elevated px-3 py-1 text-sm font-medium text-text-soft dark:bg-surface">
              {locale === 'zh' ? '面向中小企业的产品与数字化交付' : 'Products and delivery for SMB workflows'}
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl">
              {locale === 'zh' ? (
                <>
                  帮你把内容、客户和交易流程
                  <span className="text-gradient-brand"> 跑起来</span>
                </>
              ) : (
                <>
                  Make content, customer and commerce workflows
                  <span className="text-gradient-brand"> easier to run</span>
                </>
              )}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-soft">
              {locale === 'zh'
                ? '码上云提供可直接使用的软件产品，也提供围绕实际业务流程的落地交付。先从一个具体问题开始，不做无效复杂化。'
                : 'CodeCloaud provides ready-to-use products and practical delivery around real business workflows. Start with one concrete problem, without unnecessary complexity.'}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link to="/contact">{t.home.hero.primaryCta}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/products">{t.home.hero.secondaryCta}</Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-col gap-2 text-sm text-text-soft sm:flex-row sm:items-center sm:gap-5">
              {[
                locale === 'zh' ? '30 分钟业务梳理' : '30-minute workflow review',
                locale === 'zh' ? '先评估再交付' : 'Assess before delivery',
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-600 dark:text-brand-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Card className="bg-surface-elevated p-5 shadow-none dark:bg-surface sm:p-6">
            <div className="rounded-2xl border border-border bg-bg p-5 dark:bg-surface-strong">
              <p className="text-sm font-semibold text-text">
                {locale === 'zh' ? '你可以从这里开始' : 'Start from your current need'}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-soft">
                {locale === 'zh'
                  ? '不确定选哪个产品也没关系，先按业务问题进入。'
                  : 'If you are not sure which product fits, start from the business problem.'}
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              {entryCards.map((item, index) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group rounded-2xl border border-border bg-bg p-4 transition-colors hover:border-border-strong hover:bg-surface-strong dark:bg-surface-strong dark:hover:bg-surface"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-text">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-text-soft">{item.desc}</p>
                    </div>
                    <span className="mt-1 text-xs font-semibold tabular-nums text-text-muted transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                      0{index + 1}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
