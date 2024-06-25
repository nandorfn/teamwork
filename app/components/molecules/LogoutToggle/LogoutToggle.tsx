import axios from "axios";
import { api } from "@http";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { DialogClose } from "@components/ui/dialog";

import { Modal } from "../Modal";
import { Loader } from "../Loader";

const LogoutToggle: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    await axios.get(api.logout)
      .then((res) => {
        if (res.status === 200) {
          router.refresh();
        } else {
          throw new Error("Failed to log out");
        }
      })
      .catch((err) => {
        console.error(err);
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