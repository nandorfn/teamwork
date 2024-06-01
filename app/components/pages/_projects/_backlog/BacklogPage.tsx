"use client";
import { BacklogCard, IssueContainerCard } from "@components/molecules";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { api, fetchData } from "@http";
import { TDroppable, TIssueItem, TMoveDroppableResult, TMoveFunc } from "@pages/types";
import { SprintMapValue } from "@server/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const reorder = (
  list: TIssueItem[],
  startIndex: number,
  endIndex: number
): TIssueItem[] => {
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
}: TMoveFunc): TMoveDroppableResult => {
  const sourceClone = Array?.from(source);
  const destClone = Array?.from(destination);
  const [removed] = sourceClone?.splice(droppableSource?.index, 1);

  destClone.splice(droppableDestination?.index, 0, removed);

  const result: TMoveDroppableResult = {};
  result[droppableSource?.droppableId] = sourceClone;
  result[droppableDestination?.droppableId] = destClone;
  return result;
};

const BacklogPage: React.FC = () => {
  
  const path = usePathname();
  const projectId = path?.split("/")[2];
  
  const {
    data: issues,
    isLoading: isIssueLoading,
  } = useQuery({
    queryKey: ["issues", `${projectId}`],
    queryFn: () => fetchData(`${api.issues}/${projectId}`),
  });
  console.log(issues);
    
  const [schema, setSchema] = useState(issues?.data);  
  useEffect(() => {
    setSchema(issues?.data);
  }, [issues?.data]);
  
  const handleSameListDrop = (
    listId: string,
    startIndex: number,
    endIndex: number
  ) => {
    const listIndex = schema.findIndex((item: SprintMapValue) => item.id === listId);
    const items = reorder(schema[listIndex].data, startIndex, endIndex);
    const newSchema = [...schema];
    newSchema[listIndex].data = items;
    setSchema(newSchema);
  };

  const handleDifferentListDrop = (
    sourceId: string,
    destId: string,
    source: TDroppable,
    destination: TDroppable
  ) => {
    const sourceIndex = schema.findIndex((item: SprintMapValue) => item.id === sourceId);
    const destIndex = schema.findIndex((item: SprintMapValue) => item.id === destId);
    const result = move({
      source: schema[sourceIndex].data,
      destination: schema[destIndex].data,
      droppableSource: source,
      droppableDestination: destination
    });

    const newSchema = [...schema];
    newSchema[sourceIndex].data = result[sourceId];
    newSchema[destIndex].data = result[destId];

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
      <section className="flex flex-col gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {schema?.map((item: SprintMapValue) => (
            <Fragment key={item?.id}>
              <IssueContainerCard 
                length={item?.data?.length}
                title={item?.title} 
                isBacklog
                droppabledId={item?.id}>
                {item?.data?.length > 0 ? (item?.data?.map((it, i) => (
                  <Draggable
                    key={it.id}
                    draggableId={it.id}
                    index={i}
                  >
                    {(provided, snap) => (
                      <BacklogCard
                        data={it}
                        snap={snap}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))) : (
                  <p className="text-center bg-zinc-900 py-4 rounded">
                      Currently, there are no issues listed in this project. Keep up the great work!
                  </p>
                )}
              </IssueContainerCard>
            </Fragment>
          ))
          }
        </DragDropContext>
      </section>
    </>
  );
};

export default BacklogPage;