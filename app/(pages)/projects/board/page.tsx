'use client'
import React, { useState } from "react";
import { IssueContainerCard, TodoCard } from "@components/molecules";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { TDroppable, TIssueItem, TMoveDroppableResult, TMoveFunc } from "@pages/types";

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

const page = () => {
    const [schema, setSchema] = useState([
        {
            id: 'todo1',
            title: 'To-dos',
            data: [
                {
                    id: "123",
                    type: "a",
                    text: "123-text"
                },
                {
                    id: "345",
                    type: "b",
                    text: "345-text"
                },
                {
                    id: "567",
                    type: "a",
                    text: "567-text"
                },
                {
                    id: "789",
                    type: "b",
                    text: "789-text"
                }
            ]
        },
        {
            id: 'onprogress',
            title: 'On Progress',
            data: [
                {
                    id: "111",
                    type: "a",
                    text: "123-text"
                },
                {
                    id: "222",
                    type: "b",
                    text: "345-text"
                },
                {
                    id: "333",
                    type: "a",
                    text: "567-text"
                },
                {
                    id: "444",
                    type: "b",
                    text: "789-text"
                }
            ]
        },
    ]
    );

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
        <section className="flex flex-row gap-5">
            <DragDropContext onDragEnd={onDragEnd}>
                {schema?.map((item) => (
                    <React.Fragment key={item?.id}>
                        <IssueContainerCard title={item?.title} droppabledId={item?.id}>
                            {item?.data?.map((it, i) => (
                                <Draggable
                                    key={it.id}
                                    draggableId={it.id}
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
                    </React.Fragment>
                ))
                }
            </DragDropContext>
        </section>
    );
};

export default page;