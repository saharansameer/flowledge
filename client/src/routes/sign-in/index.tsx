import { AuthForm } from "@/components/User/AuthForm";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { redirectToDashboard } from "@/lib/auth";

function Signin() {
  return (
    <div className="w-full min-h-screen sm:h-[90vh] flex flex-col justify-center items-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentilas below to sign in
          </p>
        </CardHeader>
        <CardContent>
          <AuthForm mode="sign-in" />
        </CardContent>

        <CardFooter>
          <div className="w-full flex text-sm gap-x-2 mt-4 justify-center">
            <p>Don&apos;t have an account?</p>
            <Link to={"/sign-up"} className="hover:underline text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in/")({
  beforeLoad: () => redirectToDashboard(),
  component: Signin,
});
