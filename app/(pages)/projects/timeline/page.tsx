import { IssueContainerCard, TodoCard } from "@components/molecules";

const page: React.FC = () => {
    return (
        <IssueContainerCard title="Timeline">
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
        </IssueContainerCard>
    );
};

export default page;