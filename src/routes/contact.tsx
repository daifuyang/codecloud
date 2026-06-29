import { createFileRoute } from '@tanstack/react-router';
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { Button, Card, Container } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { SITE } from '#/lib/constants.ts';

export const Route = createFileRoute('/contact')({ component: ContactPage });

const DEMAND_OPTIONS = {
  zh: ['产品试用', '业务系统建设', 'AI 内容工具', '商城 / CRM 集成'],
  en: ['Product trial', 'Business system', 'AI content tools', 'Commerce / CRM integration'],
} as const;

function ContactPage() {
  const { t, locale } = useT();
  const demandOptions = DEMAND_OPTIONS[locale];
  const fields = {
    name: locale === 'zh' ? '姓名 / 公司' : 'Name / Company',
    contact: locale === 'zh' ? '电话 / 邮箱' : 'Phone / Email',
    need: locale === 'zh' ? '需求简述' : 'What do you need?',
  };

  return (
    <Container size="lg" className="py-10 sm:py-14">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
            {t.nav.contact}
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {locale === 'zh' ? '把你的业务需求发给我们' : 'Send us your business requirements'}
          </h1>
          <p className="mt-5 text-lg leading-8 text-text-soft">
            {locale === 'zh'
              ? '无论是试用现有产品、梳理业务流程，还是评估定制开发，我们都会先帮你判断最合适的落地路径。'
              : 'Whether you need a product trial, workflow review or custom development assessment, we will help identify the right delivery path first.'}
          </p>

          <div className="mt-8 grid gap-4">
            <ContactMethod
              icon={<Mail className="h-5 w-5" />}
              label={locale === 'zh' ? '邮箱' : 'Email'}
              value={SITE.contact.email}
              href={`mailto:${SITE.contact.email}`}
            />
            <ContactMethod
              icon={<Phone className="h-5 w-5" />}
              label={locale === 'zh' ? '电话' : 'Phone'}
              value={SITE.contact.phone}
              href={`tel:${SITE.contact.phone}`}
            />
            <ContactMethod
              icon={<MapPin className="h-5 w-5" />}
              label={locale === 'zh' ? '地址' : 'Address'}
              value={SITE.contact.address}
            />
          </div>
        </div>

        <Card className="bg-surface-elevated p-6 shadow-none dark:bg-surface sm:p-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
              <MessageSquare className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-text">
                {locale === 'zh' ? '预约沟通' : 'Book a conversation'}
              </h2>
              <p className="mt-1 text-sm text-text-soft">
                {locale === 'zh' ? '当前为静态表单，提交能力后续接入。' : 'Static form for now. Submission will be wired later.'}
              </p>
            </div>
          </div>

          <form className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-text">{fields.name}</span>
              <input
                className="h-12 rounded-xl border border-border bg-bg px-4 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 dark:bg-surface-strong"
                placeholder={locale === 'zh' ? '例如：上海某某科技 / 张先生' : 'Example: Acme Inc. / Jane'}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-text">{fields.contact}</span>
              <input
                className="h-12 rounded-xl border border-border bg-bg px-4 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 dark:bg-surface-strong"
                placeholder={locale === 'zh' ? '留下手机号或邮箱' : 'Phone number or email'}
              />
            </label>

            <div className="grid gap-2">
              <span className="text-sm font-medium text-text">
                {locale === 'zh' ? '关注方向' : 'Area of interest'}
              </span>
              <div className="flex flex-wrap gap-2">
                {demandOptions.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text-soft dark:bg-surface-strong"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-text">{fields.need}</span>
              <textarea
                className="min-h-32 resize-y rounded-xl border border-border bg-bg px-4 py-3 text-sm leading-6 text-text outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 dark:bg-surface-strong"
                placeholder={
                  locale === 'zh'
                    ? '简单描述当前业务、团队规模、想解决的问题。'
                    : 'Briefly describe your workflow, team size and the problem to solve.'
                }
              />
            </label>

            <Button type="button" className="mt-1 w-full">
              {t.common.bookDemo}
            </Button>
          </form>
        </Card>
      </section>
    </Container>
  );
}

function ContactMethod({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-elevated p-4 dark:bg-surface">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="mt-1 text-sm text-text-soft">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  );
}
