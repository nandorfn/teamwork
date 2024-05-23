'use client'
import { BacklogCard, IssueContainerCard } from "@components/molecules";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { fetchData } from '@http';
import { TDroppable, TIssueItem, TMoveDroppableResult, TMoveFunc } from "@pages/types";
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { Fragment, useState } from "react";

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
    const [schema, setSchema] = useState([
      {
        id: 'sprint1',
        title: 'Sprint',
        data: [
          {
            id: "123",
            type: "epic",
            text: "123-text",
            parent: {
              name: "Feature 1",
              color: "blue",
            }
          },
          {
            id: "345",
            type: "story",
            text: "345-text",
            parent: {
              name: "Feature 1",
              color: "yellow",
            }
          },
          {
            id: "567",
            type: "bug",
            text: "567-text",
            parent: {
              name: "Feature 1",
              color: "blue",
            }
          },
          {
            id: "789",
            type: "task",
            text: "789-text",
            parent: {
              name: "Feature 1",
              color: "purple",
            }
          }
        ]
      },
      {
        id: 'sprint2',
        title: 'Sprint2',
        data: [
          {
            id: "111",
            type: "task",
            text: "123-text",
            parent: {
              name: "Feature 1",
              color: "blue",
            }
          },
          {
            id: "222",
            type: "task",
            text: "345-text",
            parent: {
              name: "Feature 1",
              color: "blue",
            }
          },
          {
            id: "333",
            type: "epic",
            text: "567-text",
            parent: {
              name: "Feature 1",
              color: "blue",
            }
          },
          {
            id: "444",
            type: "story",
            text: "789-text",
            parent: {
              name: "Feature 1",
              color: "blue",
            }
          }
        ]
      },
    ]
    );
    
    const path = usePathname();
    const projectId = path?.split('/')[2]
    
    const {
      data: issues,
      isLoading: isIssueLoading,
    } = useQuery({
      queryKey: ['issues'],
      queryFn: () => fetchData(`/api/issues/${projectId}`),
    });
    
  const handleSameListDrop = (
    listId: string,
    startIndex: number,
    endIndex: number
  ) => {
    const listIndex = schema.findIndex(item => item.id === listId);
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
    const sourceIndex = schema.findIndex(item => item.id === sourceId);
    const destIndex = schema.findIndex(item => item.id === destId);
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
          {schema?.map((item) => (
            <Fragment key={item?.id}>
              <IssueContainerCard 
                length={item?.data?.length}
                title={item?.title} 
                isBacklog
                droppabledId={item?.id}>
                {item?.data?.map((it, i) => (
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
                ))}
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