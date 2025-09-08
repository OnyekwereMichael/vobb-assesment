import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatToShortDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString();
}

