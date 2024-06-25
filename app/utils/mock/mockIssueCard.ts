export const mockIssue = [
  {
    type: "task",
    name: "Issue 1",
    key: "ISS-1",
    project: "Projects 1",
    status: "In Progress"
  },
  {
    type: "epic",
    name: "Issue 2",
    key: "ISS-2",
    project: "Projects 1",
    status: "In Progress"
  },
  {
    type: "story",
    name: "Issue 3",
    key: "ISS-3",
    project: "Projects 1",
    status: "In Progress"
  },
  {
    type: "bug",
    name: "Issue 4",
    key: "ISS-4",
    project: "Projects 1",
    status: "In Progress"
  }
];

export type TMockIssue = {
  type: string;
  name: string;
  key: string;
  project: string;
  status: string;
}