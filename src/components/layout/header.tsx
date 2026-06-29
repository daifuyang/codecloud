import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '#/components/ui/button.tsx';
import { Container } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { NAV_ITEMS, SITE } from '#/lib/constants.ts';
import { cn } from '#/lib/utils.ts';
import { LangSwitch } from './lang-switch.tsx';
import { NavLink } from './nav-link.tsx';
import { ThemeToggle } from './theme-toggle.tsx';

export function Header() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // 滚动时加阴影
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 路由变化时关闭移动菜单（pathname 作为 trigger，非 effect 内引用）
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname used as a re-trigger, not read inside the effect
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors',
        scrolled
          ? 'border-border bg-bg/80 backdrop-blur-md'
          : 'border-transparent bg-bg/0 backdrop-blur-0',
      )}
    >
      <Container size="xl" className="flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-text">
          <Logo />
          <span className="text-lg tracking-tight">{SITE.brand}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              href={item.href}
              label={t.nav[item.labelKey.split('.')[1] as keyof typeof t.nav] ?? item.labelKey}
              active={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)}
            />
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LangSwitch />
          <Button size="sm" leftIcon={<span className="h-1.5 w-1.5 rounded-full bg-white" />}>
            {t.common.bookDemo}
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text md:hidden hover:bg-surface-strong"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile panel */}
      {open ? (
        <div className="border-t border-border bg-bg md:hidden">
          <Container size="xl" className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.key}
                href={item.href}
                label={t.nav[item.labelKey.split('.')[1] as keyof typeof t.nav] ?? item.labelKey}
                active={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)}
                onClick={() => setOpen(false)}
              />
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              <ThemeToggle />
              <LangSwitch />
              <Button size="sm" className="ml-auto">
                {t.common.bookDemo}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function Logo() {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg',
        'bg-gradient-to-br from-brand-500 to-accent-500',
        'text-white font-black text-sm',
        'shadow-sm',
      )}
    >
      码
    </span>
  );
}
