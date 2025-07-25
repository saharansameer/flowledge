import { Toaster, type ToasterProps } from "sonner";
import useThemeStore from "@/app/store/theme-store";

export function SonnerToaster() {
  const { theme } = useThemeStore();
  return (
    <Toaster
      richColors
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
    />
  );
}
