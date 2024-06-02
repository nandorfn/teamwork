import { z } from "zod";

export const startSprintSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  duration: z.string(),
  startDate: z.string().transform((str) => new Date(str)),  endDate: z.string().transform((str) => new Date(str)), 
  goal: z.string(),
});
export type TStartSprint = z.infer<typeof startSprintSchema>;

