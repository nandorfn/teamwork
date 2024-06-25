import { z } from "zod";

export const commentServer = z.object({
  text: z.string(),
  projectId: z.number(),
  issueId: z.number(),
});