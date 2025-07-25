import { Inngest } from "inngest";
import { INNGEST_EVENT_KEY } from "@/env";

export const inngest = new Inngest({
  id: "flowledge",
  eventKey: INNGEST_EVENT_KEY,
});
