'use client'
import { IssueContainerCard, TodoCard } from "@components/molecules";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const page = () => {
    const [schema, setSchema] = useState([
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
    ]);

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        // reorder using index of source and destination.
        const schemaCopy = schema.slice();
        const [removed] = schemaCopy.splice(result.source.index, 1);
        // put the removed one into destination.
        schemaCopy.splice(result.destination.index, 0, removed);

        setSchema(schemaCopy);
    }

    return (
        <section className="flex flex-row gap-5">
            <DragDropContext onDragEnd={onDragEnd}>
                <IssueContainerCard title="Todos" droppabledId="todos">
                    {schema.map((it, i) => (
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
            </DragDropContext>
        </section>
    );
};

export default page;