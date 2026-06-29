import { Container } from '#/components/ui';
import { useT } from '#/i18n';

interface ClientLogosProps {
  /**
   * 6-8 个占位公司名（首字母色块会渲染）
   * 默认给一组行业常见名字
   */
  logos?: readonly string[];
}

const DEFAULT_LOGOS = ['天璇数科', '中启智算', '云泽物联', '蓝芯科技', '星汉智能', '拓远数据'] as const;

/**
 * 客户 logo 横排带：Stripe 风格社会证明
 * 用首字母色块占位（避免依赖外部资源）
 */
export function ClientLogos({ logos = DEFAULT_LOGOS }: ClientLogosProps) {
  const { t } = useT();

  return (
    <section className="border-y border-border bg-surface/40 py-10">
      <Container size="xl">
        <div className="flex flex-col items-center gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
            {t.productDetail.common.logosKicker}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {logos.map((name) => {
              const initial = name.charAt(0);
              return (
                <div
                  key={name}
                  className="flex items-center gap-2 grayscale opacity-70 transition-opacity hover:opacity-100"
                >
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-500/80 to-accent-500/80 text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    {initial}
                  </span>
                  <span className="text-sm font-semibold text-text-soft">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}