"use client";
import { BacklogCard, IssueContainerCard } from "@components/molecules";
import { toast } from "@components/ui/use-toast";
import { en } from "@en";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { api, fetchData } from "@http";
import { TDroppable, TIssueItem, TMoveDroppableResult, TMoveFunc } from "@pages/types";
import { SprintMapValue, TDragUpdate } from "@server/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
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
    refetchOnWindowFocus: false,
    queryFn: () => fetchData(`${api.issues}/${projectId}`),
  });

  const mutationDifferentList = useMutation({
    mutationFn: (draggable: TDragUpdate) => {
      return axios.put(`${api.issues}/${draggable?.id}`, draggable);
    }
  });
    
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
    destination: TDroppable,
    draggableId: string | number,
  ) => {
    const sourceIndex = schema.findIndex((item: SprintMapValue) => item.id === sourceId);
    const destIndex = schema.findIndex((item: SprintMapValue) => item.id === destId);
    const result = move({
      source: schema[sourceIndex].data,
      destination: schema[destIndex].data,
      droppableSource: source,
      droppableDestination: destination
    });

    const sendData = {
      id: draggableId,
      source: sourceId,
      dest: destId,
    };

    mutationDifferentList.mutate(sendData);

    const newSchema = [...schema];
    newSchema[sourceIndex].data = result[sourceId];
    newSchema[destIndex].data = result[destId];

    setSchema(newSchema);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      toast({
        variant: "destructive",
        description: "Error: item dropped outside the list."
      });
      return;
    }

    const sourceId = source.droppableId;
    const destId = destination.droppableId;
    const draggableId = result?.draggableId;

    if (sourceId === destId) {
      handleSameListDrop(sourceId, source.index, destination.index);
    } else {
      handleDifferentListDrop(sourceId, destId, source, destination, draggableId);
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
                data={item}
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
                  <p className="text-center  text-zinc-500 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-900 py-4 rounded">
                      {en.emptySprint}
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