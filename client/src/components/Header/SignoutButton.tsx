import axios from "@/app/config/axios";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui";
import { toast } from "sonner";
import useAuthStore from "@/app/store/auth-store";

export function SignoutButton() {
  const navigate = useNavigate();
  const router = useRouter();
  const { authenticated } = useAuthStore();

  const onSignOutHandler = async () => {
    if (!authenticated) {
      return;
    }

    const { success, message } = await axios
      .patch("/api/v1/auth/sign-out")
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!success) {
      await axios.get("/api/v1/auth/clear-cookie");
      localStorage.removeItem("auth");
      await router.invalidate();
      window.location.reload()
      return;
    }

    toast.info(message);
    localStorage.removeItem("auth");
    await router.invalidate();
    navigate({ to: "/" });
    window.location.reload();
  };
  return (
    <Button variant={null} onClick={onSignOutHandler} className="nav-button">
      Sign out
    </Button>
  );
}
