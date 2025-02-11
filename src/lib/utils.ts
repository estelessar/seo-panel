import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility fonksiyonlarını oluşturuyorum.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
