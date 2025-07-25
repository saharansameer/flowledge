import axios from "@/app/config/axios";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui";
import { toast } from "sonner";
import { isAuthorized } from "@/lib/auth";

export function LogoutButton() {
  const navigate = useNavigate();

  const onSignOutHandler = async () => {
    try {
      if (!(await isAuthorized())) {
        throw navigate({ to: "/" });
      }
      const response = await axios.patch("/api/v1/auth/sign-out");
      const { message } = response.data;
      toast.info(message);
      navigate({ to: "/" });
    } catch {
      toast.error("Unexpected error while Signing-out");
    }
  };
  return (
    <Button variant={"outline"} onClick={onSignOutHandler}>
      Sign out
    </Button>
  );
}
