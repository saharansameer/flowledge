import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertSchema, type ExpertSchemaInputs } from "@/zod/schema/authSchema";
import { Input, Button } from "@/components/ui";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoaderSpin, ErrorMessage, PasswordInput } from "@/components";

import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "@/app/config/axios";
import { CircleQuestionMark } from "lucide-react";

export function ExpertSignupForm() {
  const navigate = useNavigate();

  // Signin Logic
  const form = useForm<ExpertSchemaInputs>({
    resolver: zodResolver(expertSchema),
    defaultValues: { email: "", password: "", designation: "", skills: "" },
    mode: "onSubmit",
  });

  const onSigninHandler: SubmitHandler<ExpertSchemaInputs> = async (
    formData
  ) => {
    const toastId = toast.loading("Please wait...");

    const { email, password, designation, skills } = formData;

    const { success, message } = await axios
      .post("/api/v1/auth/sign-up/expert", {
        email,
        password,
        designation,
        skills,
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!success) {
      toast.error(message, { id: toastId });
      form.setError("root", { type: "validate", message });
      return;
    }

    toast.success(message, { id: toastId });
    navigate({ to: "/sign-in" });
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

        <FormField
          name="designation"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Software Developer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="skills"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <label>Skills</label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMark strokeWidth={3} className="w-3 h-3"/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Skills should be separated by a comma (,)</p>
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. JavaScript, Python" />
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
          {form.formState.isSubmitting ? <LoaderSpin /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}
