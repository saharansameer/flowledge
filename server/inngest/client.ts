import { Inngest } from "inngest";
import { INNGEST_EVENT_KEY, INNGEST_SIGNING_KEY } from "@/env";

export const inngest = new Inngest({
  id: "flowledge",
  eventKey: INNGEST_EVENT_KEY,
  signingKey: INNGEST_SIGNING_KEY,
});
