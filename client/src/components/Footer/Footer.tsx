import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <div className="mx-auto md:px-1 py-4 border-t border-t-[#d5d5d5] dark:border-border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 Flowledge. All Rights Reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          built by{" "}
          <Link
            target="_blank"
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
