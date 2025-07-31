import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountSchema,
  type AccountSchemaInputs,
} from "@/zod/schema/authSchema";
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
import { LoaderSpin, ErrorMessage } from "@/components";

import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "@/app/config/axios";
import { CircleQuestionMark } from "lucide-react";
import { queryClient } from "@/app/query/client";

export function AccountForm({
  user,
}: {
  user: { designation: string; skills: string[] };
}) {
  const [isEditable, setEditable] = useState<boolean>(false);
  const navigate = useNavigate();

  // Signin Logic
  const form = useForm<AccountSchemaInputs>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      designation: user.designation,
      skills: user.skills.join(", "),
    },
    mode: "onSubmit",
  });

  const onSigninHandler: SubmitHandler<AccountSchemaInputs> = async (
    formData
  ) => {
    const toastId = toast.loading("Please wait...");

    const { designation, skills } = formData;

    const { success, message } = await axios
      .patch("/api/v1/account/update/expert", {
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
    await queryClient.invalidateQueries();
    navigate({ to: "/account" });
  };

  // Signin Form (UI)
  return (
    <div className="space-y-5">
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
            name="designation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Software Developer"
                    disabled={!isEditable}
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
                      <CircleQuestionMark strokeWidth={3} className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Skills should be separated by a comma (,)</p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. JavaScript, Python"
                    disabled={!isEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"default"}
            hidden={!isEditable}
            disabled={form.formState.isSubmitting}
            className="w-full sm:max-w-3xs cursor-pointer"
          >
            {form.formState.isSubmitting ? <LoaderSpin /> : "Save Changes"}
          </Button>
        </form>
      </Form>
      <Button
        onClick={() => {
          setEditable((prev) => !prev);
          form.reset();
        }}
        variant={isEditable ? "outline" : "default"}
        disabled={form.formState.isSubmitting}
        className="w-full sm:max-w-3xs cursor-pointer"
      >
        {isEditable ? "Cancel" : "Edit"}
      </Button>
    </div>
  );
}
