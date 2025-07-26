import { getCurrentFullYear } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <div className="mx-auto md:px-4 py-2 border-t border-t-[#d5d5d5] dark:border-border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-muted-foreground">
          &copy; {getCurrentFullYear()} Flowledge. All Rights Reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          built by{" "}
          <Link
            to={"https://sameersaharan.com"}
            className="text-accent-foreground/80 hover:underline"
          >
            Sameer Saharan
          </Link>
        </p>
      </div>
    </div>
  );
}
