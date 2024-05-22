import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  key: z.string().min(3, 'Key cannot be empty, at least 3 characters'),
})
export type TProjectForm = z.infer<typeof projectSchema>;
