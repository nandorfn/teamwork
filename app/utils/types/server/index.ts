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
  parent: {
      name: string;
      color: string;
  };
}

export interface SprintMapValue {
  id: string;
  title: string;
  data: SprintDataItem[];
}