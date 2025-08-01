import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthForm } from "@/components/User/AuthForm";
import { ExpertSignupForm } from "@/components/User/ExpertSignupForm";
import { Link } from "@tanstack/react-router";

function Signup() {
  return (
    <div className="w-full min-h-screen sm:h-[90vh] flex flex-col justify-center items-center py-10">
      <Tabs defaultValue="sign-up" className="w-full max-w-md">
        <TabsList className="w-full">
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
          <TabsTrigger value="expert-sign-up">Sign up as Expert</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
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
        </TabsContent>
        <TabsContent value="expert-sign-up">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h1 className="text-3xl font-bold">Continue as an Expert</h1>
              <p className="text-muted-foreground text-sm">
                Enter details for new expert account
              </p>
            </CardHeader>
            <CardContent>
              <ExpertSignupForm />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { redirectToDashboard } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up/")({
  beforeLoad: () => redirectToDashboard(),
  component: Signup,
});
