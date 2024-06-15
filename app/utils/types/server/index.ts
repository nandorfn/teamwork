export type HttpStatusCodes = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500;

export interface HttpMetaMessage {
  [key: string]: string;
}

export type TUser = {
  id: number;
  userId: string;
  name: string;
  email: string;
  password: string;
  salt?: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SprintDataItem {
  id: string;
  type: string | null;
  text: string | null;
  status: string | null;
  parent: {
      name: string;
      color: string;
  };
}

export interface SprintMapValue {
  id: string;
  title: string;
  startDate?: string | Date;
  endDate?: string | Date;
  status: string;
  data: SprintDataItem[];
}

export type TStartSprintServer = {
  name: string;
  duration: string;
  startDate?: string | Date;
  endDate?: string | Date;
  goal?: string;
}

export type TIssuesByAssigne = {
  id: number;
  summary: string;
  description: string;
  statusId: number;
  assigneeId: number;
  projectId: number;
  type: string;
  color: string;
  row: number;
  sprintId: 3;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  project: {
    name: string;
    key: string;
  }
  workflowStatus: {
    name: string;
  }
}