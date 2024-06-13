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
  if (!name) return null;
  const nameParts = name.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else if (nameParts.length === 2) {
    return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
  } else {
    return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase() + nameParts[2].charAt(0).toUpperCase();
  }
};


