import { z } from "zod";

export const issueSchema = z.object({
  summary: z.string().min(1, "Summary is required"),
  issueType: z.string().min(1, "Issue Type is required"),
  status: z.string(),
  description: z.string().nullable(),
  assigneeIssue: z.string().nullable(),
  parent: z.string().nullable(),
  sprint: z.string().nullable(),
  reporter: z.string().nullable(),
});

export type TIssueForm = z.infer<typeof issueSchema>;

export const issueServer = z.object({
  summary: z.string().min(1, "Summary is required"),
  issueType: z.string().min(1, "Issue Type is required"),
  status: z.string(),
  description: z.string().nullable(),
  assigneeIssue: z.string().nullable(),
  parent: z.string().nullable(),
  sprint: z.string().nullable(),
  reporter: z.string().nullable(),
  projectId: z.string(),
});

export type TIssueServer = z.infer<typeof issueServer>;