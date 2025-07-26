import { useState } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar";
import { Link } from "@tanstack/react-router";
import { SignoutButton } from "./SignoutButton";
import { Button } from "@/components/ui";
import useAuthStore from "@/app/store/auth-store";
import { ThemeToggle } from "./ThemeToggle";

function NavItems({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  const { authenticated } = useAuthStore();
  return (
    <div className="justify-end space-x-4" onClick={onClick}>
      {authenticated ? (
        <>
          <Link to={"/dashboard"}>
            <Button variant={null} className="nav-button">
              Dashboard
            </Button>
          </Link>
          {mobile && <br />}
          <SignoutButton />
        </>
      ) : (
        <>
          <Link to={"/home"}>
            <Button variant={null} className="nav-button">
              Home
            </Button>
          </Link>
          <Link to={"/sign-in"}>
            <Button variant={null} className="nav-button">
              Sign in
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full border-b border-b-[#d5d5d5] dark:border-border">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center">
            <NavbarLogo />
            <ThemeToggle />
          </div>

          <NavItems />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center">
              <NavbarLogo />
              <ThemeToggle />
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <NavItems
              mobile={true}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
