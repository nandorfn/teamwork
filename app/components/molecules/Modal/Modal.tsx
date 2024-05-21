import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { TModal } from "@molecules/types";

const Modal = ({ 
  title,
  childrenTrigger,
  childrenFooter,
  childrenContent,
  setOpen,
  open
}: TModal) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {childrenTrigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {childrenContent}
        <DialogFooter>
          {childrenFooter}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;