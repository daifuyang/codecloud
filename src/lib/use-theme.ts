import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'theme';

const SCRIPT = `(function(){try{var stored=window.localStorage.getItem('${STORAGE_KEY}');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);root.style.colorScheme=resolved;root.setAttribute('data-theme',mode);}catch(e){}})();`;

function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'auto';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored;
  } catch {
    /* ignore */
  }
  return 'auto';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'auto') {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const resolved = resolveTheme(mode);
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  root.setAttribute('data-theme', mode);
}

/**
 * 主题 Hook：light / dark / auto，持久化到 localStorage。
 * 在 <head> 内联脚本里先跑一次避免闪烁，本 hook 用于交互切换。
 */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [resolved, setResolved] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = readStoredTheme();
    setMode(stored);
    setResolved(resolveTheme(stored));
  }, []);

  // 监听系统主题变化（auto 模式时）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (mode === 'auto') setResolved(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode]);

  const setTheme = useCallback((next: ThemeMode) => {
    setMode(next);
    setResolved(resolveTheme(next));
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    applyTheme(next);
  }, []);

  const cycle = useCallback(() => {
    const order: ThemeMode[] = ['light', 'dark', 'auto'];
    const idx = order.indexOf(mode);
    const next = order[(idx + 1) % order.length] ?? 'auto';
    setTheme(next);
  }, [mode, setTheme]);

  return { mode, resolved, setTheme, cycle };
}

/**
 * 在 SSR <head> 里内联执行，避免主题闪烁。
 * 输出 IIFE 字符串。
 */
export const themeInitScript = SCRIPT;
