import useAuthStore from "@/app/store/auth-store";
import axios from "@/app/config/axios";
import { redirect } from "@tanstack/react-router";

export async function checkAuth() {
  const { tokenExpiry, setTokenExpiry, setAuthenticated, setUserRole } =
    useAuthStore.getState();
  const now = Date.now();
  try {
    if (tokenExpiry < now) {
      const response = await axios.patch("/api/v1/auth/renew-token");
      if (!response.data.success) {
        localStorage.removeItem("auth");
        await axios.get("/api/v1/auth/clear-cookie");
        throw redirect({ to: "/sign-in" });
      }

      setTokenExpiry(now + 15 * 60 * 1000);
      setAuthenticated(true);
      setUserRole(response.data.data);
    }

    return;
  } catch {
    throw redirect({ to: "/" });
  }
}

export async function isAuthorized() {
  const { tokenExpiry, setTokenExpiry, setAuthenticated, setUserRole } =
    useAuthStore.getState();
  const now = Date.now();

  try {
    if (tokenExpiry < now) {
      const response = await axios.patch("/api/v1/auth/renew-token");
      if (!response.data.success) {
        localStorage.removeItem("auth");
        await axios.get("/api/v1/auth/clear-cookie");
        return false;
      }

      setTokenExpiry(now + 15 * 60 * 1000);
      setAuthenticated(true);
      setUserRole(response.data.data);

      return true;
    }

    return true;
  } catch {
    return false;
  }
}

export async function redirectToDashboard() {
  if (await isAuthorized()) {
    throw redirect({ to: "/dashboard" });
  }
  return;
}
