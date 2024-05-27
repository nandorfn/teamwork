import { Button } from "@components/ui/button";
import { Modal } from "../Modal";
import { DialogClose } from "@components/ui/dialog";
import axios from "axios";
import { Loader } from "../Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@http";

const LogoutToggle: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    await axios.get(api.logout)
      .then((res) => {
        if (res.status === 200) {
          router.refresh();
        }
      }
    )
    .catch((err) => console.error(err))
    .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading &&
        <Loader />
      }
      <Modal
        title="Logout"
        childrenTrigger={
          <Button className="w-full" variant={"outline"}>Logout</Button>
        }
        childrenContent={
          <p>Are you sure you want to log out?</p>
        }
        childrenFooter={
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button className="w-20">Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={handleLogout}
              variant={"primary"}
              className="w-20">
              Yes
            </Button>
          </div>
        }
      />
    </>
  );
};

export default LogoutToggle;