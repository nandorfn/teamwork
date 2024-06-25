import { Button } from "@components/ui/button";
import Modal from "../Modal/Modal";
import PenIcon from "@assets/svg-tsx/PenIcon";
import { StartSprintForm } from "@components/orgasims";
import { DialogClose } from "@radix-ui/react-dialog";
import { SprintMapValue } from "@server/types";

export type TModalSprintForm = {
  status: string;
  refFormStart: React.RefObject<HTMLFormElement>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  data: SprintMapValue;
  disabled: boolean;
}

const ModalSprintForm = ({
  status,
  refFormStart,
  setDisabled,
  data,
  disabled,
}: TModalSprintForm) => {
  if (status === "start") {
    return (
      <Modal
            title="Start Sprint"
            childrenTrigger={
              <Button
                className="font-semibold"
                variant={"secondary"}
                size={"xs"}
              >
                {"Start Sprint"}
              </Button>
            }
            childrenContent={
              <StartSprintForm
                refForm={refFormStart}
                data={data}
                setDisabled={setDisabled}
              />
            }
            childrenFooter={
              <DialogClose asChild>
                <Button
                  disabled={disabled}
                  onClick={() => refFormStart?.current?.requestSubmit()}
                  variant={"default"}>
                  Start
                </Button>
              </DialogClose>
            }
          />
    );
  }
  return (
    <>
      <Modal
        title="Edit Sprint"
        childrenTrigger={
          <Button variant={"secondary"} className="bg-none hover:bg-none" size={"iconXs"}>
            <PenIcon width="16" height="16" fill="dark:fill-secondary-foreground fill-black" />
          </Button>
        }
        childrenContent={
          <StartSprintForm
            refForm={refFormStart}
            data={data}
            setDisabled={setDisabled}
          />
        }
        childrenFooter={
          <DialogClose asChild>
            <Button
              disabled={disabled}
              onClick={() => refFormStart?.current?.requestSubmit()}
              variant={"default"}>
              Edit
            </Button>
          </DialogClose>
        }
      />
    </>
  );
};

export default ModalSprintForm;