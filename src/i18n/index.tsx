import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import enDictionary from './en.json';
import { DEFAULT_LOCALE, type Dictionary, LOCALES, type Locale } from './types.ts';
import zhDictionary from './zh.json';

const STORAGE_KEY = 'locale';

const dictionaries: Record<Locale, Dictionary> = {
  zh: zhDictionary as Dictionary,
  en: enDictionary as Dictionary,
};

interface I18nContextValue {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (next: Locale) => void;
  toggle: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * 通过 dot-path 读取嵌套字典。
 * 例：t(d, 'home.hero.title')
 */
export function t<K extends keyof Dictionary>(d: Dictionary, path: K): Dictionary[K];
export function t(d: Dictionary, path: string): unknown {
  const segments = path.split('.');
  let current: unknown = d;
  for (const seg of segments) {
    if (current && typeof current === 'object' && seg in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[seg];
    } else {
      return path;
    }
  }
  return current;
}

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LOCALES as readonly string[]).includes(stored)) {
      return stored as Locale;
    }
  } catch {
    /* SSR / 隐私模式 */
  }
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // 初始为默认 locale；浏览器端 useEffect 中读取 localStorage 修正
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== locale) setLocaleState(stored);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    // 触发 <html lang> 同步
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
  }, [locale, setLocale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dictionary: dictionaries[locale],
      setLocale,
      toggle,
    }),
    [locale, setLocale, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}

/**
 * 便捷 hook：返回当前字典 + 简单 t 函数
 */
export function useT() {
  const { dictionary, locale, setLocale, toggle } = useI18n();
  return { t: dictionary, locale, setLocale, toggle };
}

export type { Dictionary, Locale } from './types.ts';
export { DEFAULT_LOCALE, LOCALES } from './types.ts';
