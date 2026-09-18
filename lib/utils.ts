import type { MouseEvent } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRepeatClick(event: MouseEvent): boolean {
  return event.detail > 1;
}
