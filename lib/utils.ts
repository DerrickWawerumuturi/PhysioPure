import { MyInlineContent, MyTableContent } from "@/types";
import { Block, TableContent } from "@blocknote/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const Categories = [
  {
    name: "Orthopedic",
    url: "/orthopedics",
    description:
      "Orthopedic Care and Solutions: Topics related to the treatment and prevention of musculoskeletal conditions. Learn about innovative procedures, recovery tips, and how to manage injuries affecting bones, joints, and muscles.",
  },
  {
    name: "Physiotherapy",
    url: "/physiotherapy",
    description:
      " Discover the latest in physiotherapy techniques, exercises, and rehabilitation practices to help you recover from injuries, manage pain, and improve mobility and function",
  },
  {
    name: "Pediatric",
    url: "/pediatric",
    description:
      "Focused on the health of children and adolescents, this blog provides insights into pediatric care, common childhood conditions, and tips to support your child's growth and development.",
  },
  {
    name: "Neurology",
    url: "/neurology",
    description:
      "Stay informed about neurological disorders, treatments, and advances in understanding the brain and nervous system. Our blog offers advice and research on managing conditions like epilepsy, stroke, and neurodegenerative diseases.",
  },
  {
    name: "Patient",
    url: "/patient",
    description:
      "Delve into topics that center around patient care, experiences, and the journey through medical treatment. This blog is for patients and caregivers looking for support, stories, and resources",
  },
  {
    name: "Testimonials and Case Studies",
    url: "/testimonials-and-caseStudies",
    description:
      "Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.",
  },
  {
    name: "Wellness and Lifestyle",
    url: "/wellness-and-lifestyle",
    description:
      "Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.",
  },
  {
    name: "Cardiopulmology",
    url: "/cardiopulmology",
    description:
      "Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.",
  },
  {
    name: "Physiotherapy",
    url: "/physiotherapy",
    description:
      "Focused on issues unique to women’s health, this blog addresses everything from reproductive health to wellness strategies for women at every stage of life.",
  },
  {
    name: "Women’s Health",
    url: "/womens-health",
    description: "",
  },
];

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

export const generateSlug = (title: string, username: string) => {
  const slugStart = title + username;
  return slugStart
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const parseInlineContent = (inlineContent: MyInlineContent): string => {
  if (typeof inlineContent === "string") {
    return inlineContent;
  }

  if ("text" in inlineContent) {
    const { text, bold, italic, underline, strikethrough, link } =
      inlineContent;
    let formattedText = text;

    if (bold) formattedText = `**${formattedText}**`;
    if (italic) formattedText = `*${formattedText}*`;
    if (underline) formattedText = `_${formattedText}_`;
    if (strikethrough) formattedText = `~~${formattedText}~~`;
    if (link) formattedText = `[${formattedText}](${link})`;

    return formattedText;
  }

  // Handle other inline types if needed
  return "";
};

export const simplifyContent = (blocks: Block[]): string => {
  return blocks
    .map((block) => {
      console.log("let's get the block type", block.type);
      switch (block.type) {
        case "heading":
          return `${block.content.map(parseInlineContent).join("")}`;

        case "paragraph":
          return block.content.map(parseInlineContent).join("");

        case "numberedListItem":
          return block.content
            .map(
              (inlineContent, index) =>
                `${index + 1}. ${parseInlineContent(inlineContent)}`
            )
            .join("\n");

        case "checkListItem":
          return block.content
            .map((inlineContent) => `• ${parseInlineContent(inlineContent)}`)
            .join("\n");

        case "image":
          return `![${block.content || "Image"}](${block.content})`;

        case "table":
          const table = block.content as MyTableContent;
          return table.map((row: any[]) => `| ${row.join(" | ")} |`).join("\n");

        default:
          return "";
      }
    })
    .join("\n\n");
};

export const timeDifference = (updatedAt: string): string => {
  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();
  const diffMins = currentDate.getTime() - updatedDate.getTime();

  const seconds = Math.floor(diffMins / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months >= 1) {
    return updatedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
};

export const publishedDate = (date: string | Date) => {
  if (date) {
    const validDate = typeof date === "string" ? new Date(date) : date;
    return validDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return "Date not available";
};
