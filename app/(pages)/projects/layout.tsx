import { ProjectsPage } from "@components/pages";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProjectsPage>{children}</ProjectsPage>
  );
}