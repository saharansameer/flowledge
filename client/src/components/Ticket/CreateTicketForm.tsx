import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ticketSchema,
  type TicketSchemaInputs,
} from "@/zod/schema/ticketSchema";
import { Input, Button } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderSpin } from "@/components";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "@/app/config/axios";
import { CharCount } from "./CharCount";
import { queryClient } from "@/app/query/client";
import { getErrorResponse } from "@/lib/utils";

export function CreateTicketForm() {
  const navigate = useNavigate();

  const form = useForm<TicketSchemaInputs>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { title: "", description: "" },
    mode: "onSubmit",
  });

  const onSubmitHandler: SubmitHandler<TicketSchemaInputs> = async (
    formData
  ) => {
    const toastId = toast.loading("Creating...");

    const { title, description } = formData;

    const { success, message } = await axios
      .post("/api/v1/ticket/create", { title, description })
      .then((res) => res.data)
      .catch((err) => getErrorResponse(err));

    if (!success) {
      toast.error(message, { id: toastId });
      return;
    }

    toast.success(message, { id: toastId });
    await queryClient.invalidateQueries({ queryKey: ["user-dashboard"] });
    navigate({ to: "/dashboard" });
  };

  const titleValue = form.watch("title") || "";
  const descriptionValue = form.watch("description") || "";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-5 max-w-2xl"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter a title for your ticket" />
              </FormControl>
              <FormMessage />
              <CharCount length={titleValue.length} maxChars={100} />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your issue briefly..."
                />
              </FormControl>
              <FormMessage />
              <CharCount length={descriptionValue.length} maxChars={900} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={"default"}
          disabled={form.formState.isSubmitting}
          className="cursor-pointer w-full max-w-sm sm:max-w-3xs"
        >
          {form.formState.isSubmitting ? <LoaderSpin /> : "Create"}
        </Button>
      </form>
    </Form>
  );
}
