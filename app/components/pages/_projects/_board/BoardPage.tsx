"use client";
import React, { useEffect, useState } from "react";
import { IssueContainerCard, TodoCard } from "@components/molecules";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { TDroppable, TMoveBoard, TMoveBoardResult } from "@pages/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { api, fetchData } from "@http";
import axios from "axios";
import { TAllBoard, TBoardIssue } from "@server/types";

const reorder = (
  list: TBoardIssue[],
  startIndex: number,
  endIndex: number
): TBoardIssue[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(result);
  return result;
};

const move = ({
  source,
  destination,
  droppableSource,
  droppableDestination
}: TMoveBoard) => {
  const sourceClone = Array?.from(source);
  const destClone = Array?.from(destination);
  const [removed] = sourceClone?.splice(droppableSource?.index, 1);

  destClone.splice(droppableDestination?.index, 0, removed);

  const result: TMoveBoardResult = {};
  result[droppableSource?.droppableId] = sourceClone;
  result[droppableDestination?.droppableId] = destClone;
  return result;
};


const BoardPage: React.FC = () => {

  const path = usePathname()?.split("/");
  const currentProjectId = path[2];
  const {
    data: board,
    isLoading: isBoardLoading,
  } = useQuery({
    queryKey: ["board", `${path}`],
    refetchOnWindowFocus: false,
    queryFn: () => axios.get(`${api.workflows}/board/${currentProjectId}`),
  });


  const [schema, setSchema] = useState<TAllBoard[]>(board?.data?.data);

  useEffect(() => {
    setSchema(board?.data?.data);
  }, [board?.data?.data]);

  const handleSameListDrop = (
    listId: string,
    startIndex: number,
    endIndex: number
  ) => {
    const listIndex = schema.findIndex((item: TAllBoard) => String(item.id) === listId);
    const items = reorder(schema[listIndex]?.project?.issues, startIndex, endIndex);
    const newSchema = [...schema];
    if (newSchema[listIndex]) {
      if (newSchema[listIndex].project) {
        newSchema[listIndex].project.issues = items;
        setSchema(newSchema);
      }
    }
  };

  const handleDifferentListDrop = (
    sourceId: string,
    destId: string,
    source: TDroppable,
    destination: TDroppable
  ) => {
    const sourceIndex = schema.findIndex((item: TAllBoard) => String(item.id) === sourceId);
    const destIndex = schema.findIndex((item: TAllBoard) => String(item.id) === destId);
    const result = move({
      source: schema[sourceIndex].project.issues,
      destination: schema[destIndex].project.issues,
      droppableSource: source,
      droppableDestination: destination
    });

    const newSchema = [...schema];
    newSchema[sourceIndex].project.issues = result[sourceId];
    newSchema[destIndex].project.issues = result[destId];

    setSchema(newSchema);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      console.log("Item dropped outside the list.");
      return;
    }

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    if (sourceId === destId) {
      handleSameListDrop(sourceId, source.index, destination.index);
    } else {
      handleDifferentListDrop(sourceId, destId, source, destination);
    }
  };
  return (
    <>
      <section className="flex flex-row gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {schema?.map((item: TAllBoard) => {
            return (
              <div className="w-80" key={item?.id}>
                <IssueContainerCard
                  length={item?.project?.issues?.length}
                  containerChildClass="gap-3"
                  data={item?.project?.issues}
                  title={item?.name}
                  droppabledId={String(item?.id)}>
                  {item?.project?.issues?.map((it, i) => (
                    <Draggable
                      key={it.id}
                      draggableId={String(it.id)}
                      index={i}
                    >
                      {(provided, snap) => (
                        <TodoCard
                          data={it}
                          snap={snap}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                </IssueContainerCard>
              </div>
            );
          })
          }
        </DragDropContext>
      </section>
    </>
  );
};

export default BoardPage;