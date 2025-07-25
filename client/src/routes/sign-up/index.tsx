import { AuthForm } from "@/components/User/AuthForm";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { redirectToDashboard } from "@/lib/auth";

function Signup() {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Enter details for new account
          </p>
        </CardHeader>
        <CardContent>
          <AuthForm mode="sign-up" />
        </CardContent>

        <CardFooter>
          <div className="w-full flex text-sm gap-x-2 mt-4 justify-center">
            <p>Already have an account?</p>
            <Link to={"/sign-in"} className="hover:underline text-primary">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up/")({
  beforeLoad: () => redirectToDashboard(),
  component: Signup,
});
