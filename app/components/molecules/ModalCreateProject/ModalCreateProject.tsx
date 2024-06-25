import { useState } from "react";
import Modal from "../Modal/Modal";
import { useTheme } from "next-themes";
import { Icon } from "@components/atoms";
import { Button } from "@components/ui/button";
import { CreateProjectForm } from "@components/orgasims";
import { plusDark, plusIcon } from "@assets/svg";

const ModalCreateProject: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Create Project"
      childrenTrigger={
        <Button variant={"ghost"} size={"xs"} className="w-fit p-1 h-5">
          <Icon
            src={
              theme === "light"
                ? plusDark
                : plusIcon
            }
            alt=""
            width={16}
            height={16}
          />
        </Button>
      }
      childrenContent={
        <CreateProjectForm setOpen={setOpen} />
      }
    >
    </Modal>
  );
};

export default ModalCreateProject;