import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Container, FigLabel, Heading, Section } from '#/components/ui';
import { cn } from '#/lib/utils';
import { useI18n } from '#/i18n';
import type { ProductDetailContent } from '#/i18n/types';

interface ProductDetailFaqsProps {
  kicker: string;
  title: string;
  items: ProductDetailContent['faqs']['items'];
}

export function ProductDetailFaqs({ kicker, title, items }: ProductDetailFaqsProps) {
  const { locale } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section spacing="xl" variant="dark" className="section-dark-text border-y border-border">
      <Container size="md">
        <div className="mb-12 flex flex-col gap-4">
          <FigLabel n={5} className="text-brand-400" />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-brand-300 ring-1 ring-inset ring-white/10">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
            {kicker}
          </span>
          <Heading as={2} size="2xl" className="!text-white">
            {title}
          </Heading>
          <p className="text-sm text-slate-400">
            {locale === 'zh' ? '点击展开任意一个问题 · 快速看重点' : 'Click any question · quick highlights'}
          </p>
        </div>

        <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          {items.map((item, idx) => {
            const open = openIdx === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  aria-expanded={open}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200',
                    'hover:bg-white/5',
                    open && 'bg-white/[0.06]',
                  )}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs font-medium text-brand-400">
                      0{idx + 1}
                    </span>
                    <span
                      className={cn(
                        'text-base transition-all sm:text-lg',
                        open ? 'font-bold text-white' : 'font-medium text-slate-200',
                      )}
                    >
                      {item.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 transition-all duration-300',
                      open ? 'rotate-180 text-brand-400' : 'text-slate-500',
                    )}
                  />
                </button>
                {open ? (
                  <div className="border-l-2 border-brand-400 px-6 pb-6 pl-14 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* 底部联系引导 */}
        <div className="mt-8 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm">
          <span className="text-slate-300">
            {locale === 'zh' ? '没找到答案？' : 'Still have questions?'}
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-300 transition-colors hover:text-brand-200"
          >
            <MessageCircle className="h-4 w-4" />
            {locale === 'zh' ? '联系我们' : 'Contact us'}
          </Link>
        </div>
      </Container>
    </Section>
  );
}