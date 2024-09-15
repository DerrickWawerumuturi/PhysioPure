import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    username:
      type === "sign-in" ? z.string().min(3).optional() : z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });
