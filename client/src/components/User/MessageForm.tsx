import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  messageSchema,
  type MessageSchemaInputs,
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

export function MessageForm({ ticketId }: { ticketId: string }) {
  const form = useForm<MessageSchemaInputs>({
    resolver: zodResolver(messageSchema),
    defaultValues: { ticketMessage: "" },
    mode: "onSubmit",
  });

  const onSubmitHandler: SubmitHandler<MessageSchemaInputs> = async (
    formData
  ) => {
    const { ticketMessage } = formData;

    const { success, message } = await axios
      .post(`/api/v1/ticket/${ticketId}`, { message: ticketMessage })
      .then((res) => res.data)
      .catch((err) => getErrorResponse(err));

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success("Message Sent");
    await queryClient.invalidateQueries();
    form.reset();
  };

  const messageValue = form.watch("ticketMessage") || "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-5">
        <FormField
          name="ticketMessage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write your response here..."
                />
              </FormControl>
              <FormMessage />
              <CharCount length={messageValue.length} maxChars={2000} />
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
