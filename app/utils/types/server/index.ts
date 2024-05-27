export type TUser = {
  id: number;
  userId: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
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