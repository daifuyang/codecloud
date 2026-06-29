import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { Footer, Header } from '#/components/layout/index.ts';
import { I18nProvider } from '#/i18n/index.tsx';
import { themeInitScript } from '#/lib/use-theme.ts';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '码上云 - 用 AI 与商业套件赋能中小企业' },
      { title: '码上云 · 让 AI 走进每个业务场景' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
});

function RootLayout() {
  return <Outlet />;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 在水合前同步主题，避免闪烁。脚本是常量字符串，非用户输入，无 XSS 风险。 */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: SSR 内联常量脚本，用于主题闪烁抑制 */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}
