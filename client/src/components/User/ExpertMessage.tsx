import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expertMessageSchema,
  type ExpertMessageSchemaInputs,
} from "@/zod/schema/ticketSchema";
import { Button } from "@/components/ui";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoaderSpin } from "@/components";
import axios from "@/app/config/axios";
import { getErrorResponse } from "@/lib/utils";
import { toast } from "sonner";
import { queryClient } from "@/app/query/client";
import { CharCount } from "@/components/Ticket/CharCount";

export function ExpertMessageForm({ ticketId }: { ticketId: string }) {
  const form = useForm<ExpertMessageSchemaInputs>({
    resolver: zodResolver(expertMessageSchema),
    defaultValues: { expertMessage: "" },
    mode: "onSubmit",
  });

  const onSubmitHandler: SubmitHandler<ExpertMessageSchemaInputs> = async (
    formData
  ) => {
    const { expertMessage } = formData;

    const { success, message } = await axios
      .patch(`/api/v1/ticket/${ticketId}`, { message: expertMessage })
      .then((res) => res.data)
      .catch((err) => getErrorResponse(err));

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success("Message Sent");
    await queryClient.invalidateQueries({ queryKey: ["ticket", ticketId, "EXPERT"] });
    form.reset();
    window.location.reload();
  };

  const messageValue = form.watch("expertMessage") || "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-5">
        <FormField
          name="expertMessage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expert Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write your solution here..."
                />
              </FormControl>
              <FormMessage />
              <CharCount length={messageValue.length} maxChars={5000} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={"default"}
          disabled={form.formState.isSubmitting}
          className="cursor-pointer w-full max-w-sm sm:max-w-3xs"
        >
          {form.formState.isSubmitting ? <LoaderSpin /> : "Send"}
        </Button>
      </form>
    </Form>
  );
}
