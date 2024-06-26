import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
let bcrypt = require("bcryptjs");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPass = (unHashPass: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(unHashPass, salt);
  return { salt, hashedPassword };
};

export const parseNumber = (value: any): number | null => {
  return value ? Number(value) : null;
};

export   const countFilterArr = (data: any, key: string,  value: string) => {
  return data?.filter((item: any) => item?.[key]?.toLowerCase() === value?.toLowerCase())?.length;
};

  
export const getInitials = (name: string) => {
  if (!name) return "";
  const nameParts = name.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else if (nameParts.length === 2) {
    return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
  } else {
    return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase() + nameParts[2].charAt(0).toUpperCase();
  }
};

export const getTimeAgo = (date: Date) => {
  const now: Date = new Date();
  const parsedDate: Date = new Date(date);
  const diffInMilliseconds: number = now.getTime() - parsedDate.getTime();

  const seconds: number = Math.floor(diffInMilliseconds / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
      return parsedDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric"
      });
  } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};


