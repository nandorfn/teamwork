import { TBoardIssue } from "@server/types";

export type TDroppable = {
  index: number;
  droppableId: string;
}

export type TIssueItem = {
  id: string;
  type: string;
  text: string;
  parent: {
    name: string;
    color: string;
  }
}

export type TMoveDroppableResult = {
  [key: string]: {
    id: string;
    type: string;
    text: string;
    parent: {
      name: string;
      color: string;
    }
  }[];
}
export type TMoveBoardResult = {
  [key: string]: TBoardIssue[];
}

export type TMoveFunc = {
  source: TIssueItem[];
  destination: TIssueItem[];
  droppableSource: TDroppable;
  droppableDestination: TDroppable;
}
export type TMoveBoard = {
  source: TBoardIssue[];
  destination: TBoardIssue[];
  droppableSource: TDroppable;
  droppableDestination: TDroppable;
}