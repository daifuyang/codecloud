import { Link } from '@tanstack/react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { NAV_ITEMS, SITE } from '#/lib/constants.ts';

export function Footer() {
  const { t } = useT();

  const groups: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
    {
      title: t.footer.products,
      links: [
        { label: 'genlabs.cc', href: '/products/genlabs' },
        {
          label: t.nav.services === '服务' ? '新媒体素材平台' : 'New media platform',
          href: '/products/media',
        },
        { label: '移山 CRM', href: '/products/crm' },
        { label: '移山商城', href: '/products/mall' },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.about, href: '/about' },
        { label: t.nav.contact, href: '/contact' },
        { label: t.nav.services, href: '/services' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container size="xl" className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 text-text">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-black text-white">
                码
              </span>
              <span className="text-lg font-bold tracking-tight">{SITE.brand}</span>
            </Link>
            <p className="max-w-sm text-sm text-text-soft">{t.footer.tagline}</p>
          </div>

          {groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-text">{g.title}</h4>
              <ul className="flex flex-col gap-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-text-soft hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-text">{t.footer.contact}</h4>
            <ul className="flex flex-col gap-2 text-sm text-text-soft">
              <li className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{SITE.contact.phone}</span>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{SITE.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.brand}. {t.common.copyright}.
          </p>
          <p>{SITE.icp}</p>
        </div>
      </Container>

      {/* hidden nav hint for tree-shaking */}
      <span className="hidden">{NAV_ITEMS.length}</span>
    </footer>
  );
}
