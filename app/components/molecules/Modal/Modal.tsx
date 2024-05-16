import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { TModal } from "@molecules/types";

const Modal = ({ 
  title,
  childrenTrigger,
  childrenFooter,
  childrenContent,
}: TModal) => {
  return (
    <Dialog>
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