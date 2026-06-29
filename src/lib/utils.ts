import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 className：clsx 处理条件，twMerge 处理 tailwind 冲突。
 * 例：cn('p-4', isActive && 'bg-brand-500', 'p-2') → 'bg-brand-500 p-2'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
