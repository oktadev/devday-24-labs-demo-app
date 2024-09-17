import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripObjectName(object: string): string {
  const id = object.match(/(?<=:).*/g);
  return id ? id[0] : "";
}
