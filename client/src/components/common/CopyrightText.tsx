import { getCurrentFullYear } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function CopyrightText() {
  return (
    <div className="text-xs text-muted-foreground font-instrument">
      <p>&copy; {getCurrentFullYear()} GhostPOV All Rights Reserved</p>
      <p className="text-xs">
        built by{" "}
        <Link to={"https://sameersaharan.com"} className="p-link">
          Sameer Saharan
        </Link>
      </p>
    </div>
  );
}
