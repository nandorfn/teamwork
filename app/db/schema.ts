import { relations } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTable,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id"),
  userId: text("userId").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  avatar: text("avatar"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const memberships = pgTable("memberships", {
  id: serial("id"),
  userId: text("userId"),
  projectId: integer("projectId"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const projects = pgTable("projects", {
  id: serial("id"),
  name: text("name"),
  desciption: text("description"),
  icon: text("icon"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const workflows = pgTable("workflows", {
  id: serial("id"),
  name: text("name"),
  description: text("description"),
  projectId: integer("projectId"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const worklowStatus = pgTable("workflowStatus", {
  id: serial("id"),
  name: text("name"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const issues = pgTable("issues", {
  id: serial("id"),
  title: text("title"),
  description: text("description"),
  statusId: integer("statusId"),
  assigneeId: integer("assigneeId"),
  reporterId: integer("reporterId"),
  projectId: integer("projectId"),
});

export const comments = pgTable("comments", {
  id: serial("id"),
  text: text("text"),
  userId: text("userId"),
  issueId: integer("issueId"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const backlogs = pgTable("backlogs", {
  id: serial("id"),
  name: text("name"),
  description: text("description"),
  projectId: integer("projectId"),
  issueTypeId: integer("issueTypeId"),
  statusId: integer("statusId"),
  assigneId: integer("assigneId"),
  reporterId: integer("reporterId"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const sprints = pgTable("sprints", {
  id: serial("id"),
  name: text("name"),
  startDate: date("startDate"),
  endDate: date("endDate"),
  projectId: integer("projectId"),
});

export const issueHierarchy = pgTable("issueHierarchy", {
  id: serial("id"),
  issueId: integer("issueId"),
  parentIssueId: integer("parentIssueId"),
});

export const sprintIssues = pgTable("sprintsIssues", {
  id: serial("id"),
  sprintId: integer("sprintId"),
  issueId: integer("issueId"),
});

export const issueTypes = pgTable("issueTypes", {
  id: serial("id"),
  name: text("name"),
  description: text("description"),
});

export const userRelations = relations(users, ({ many }) => ({
  memberships: many(memberships),
}));
