import useAuthStore from "@/app/store/auth-store";
import axios from "@/app/config/axios";
import { redirect } from "@tanstack/react-router";

export async function checkAuth() {
  if (!isAuthorized()) {
    const renewed = await renewToken();
    if (!renewed) {
      throw redirect({ to: "/sign-in" });
    }
  }

  return;
}

export function isAuthorized() {
  const { tokenExpiry } = useAuthStore.getState();
  const now = Date.now();

  if (tokenExpiry < now) {
    return false;
  }

  return true;
}

export async function renewToken() {
  const { setTokenExpiry, setAuthenticated, setUserRole, authenticated } =
    useAuthStore.getState();
  const now = Date.now();

  if (!authenticated) {
    return false;
  }

  const { success, data } = await axios
    .patch("/api/v1/auth/renew-token")
    .then((res) => res.data)
    .catch((err) => err.response.data);
  if (!success) {
    localStorage.removeItem("auth");
    await axios.get("/api/v1/auth/clear-cookie");
    return false;
  }

  setTokenExpiry(now + 15 * 60 * 1000);
  setAuthenticated(true);
  setUserRole(data);
  return true;
}

export function redirectToDashboard() {
  if (isAuthorized()) {
    throw redirect({ to: "/dashboard" });
  }
  return;
}
