import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchemaInputs } from "@/zod/schema/authSchema";
import { Input, Button } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderSpin, ErrorMessage, PasswordInput } from "@/components";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "@/app/config/axios";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignIn = mode === "sign-in";
  const navigate = useNavigate();

  // Signin Logic
  const form = useForm<AuthSchemaInputs>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSigninHandler: SubmitHandler<AuthSchemaInputs> = async (formData) => {
    const toastId = toast.loading("Please wait...");

    try {
      const { email, password } = formData;

      const response = await axios.post(`/api/v1/auth/${mode}`, {
        email,
        password,
      });

      const { success, message } = response.data;

      if (!success) {
        toast.error(message, { id: toastId });
        return;
      }

      toast.success(message, { id: toastId });
      navigate({ to: isSignIn ? "/dashboard" : "/sign-in" });
    } catch {
      toast.error(`Someting went wrong during ${mode}`, {
        id: toastId,
      });
      form.reset();
    }
  };

  // Signin Form (UI)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSigninHandler)}
        className="flex flex-col gap-y-5"
      >
        {form.formState.errors.root && (
          <ErrorMessage
            text={form.formState.errors.root.message as string}
            className="leading-tight"
          />
        )}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={"default"}
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer"
        >
          {form.formState.isSubmitting ? (
            <LoaderSpin />
          ) : isSignIn ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
}
