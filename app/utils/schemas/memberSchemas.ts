import { z } from "zod";

export const memberSchema = z.object({
  email: z.string().min(1, "email is required"),
});

export type TMemberSchema = z.infer<typeof memberSchema>;