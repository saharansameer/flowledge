import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CLIENT_URL, INNGEST_SIGNING_KEY } from "@/env";

import { SIZE_LIMIT } from "@/utils/constants";
import { undefinedRoutesHandler } from "@/middlewares/error.middleware";

import { serve } from "inngest/express";
import { inngest } from "@/inngest/client";
import { inngestFunctions } from "@/inngest/functions";

const app = express();

app.use(
  cors({
    origin: [CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json({ limit: SIZE_LIMIT }));
app.use(cookieParser());

// Routes Import
import authRoutes from "@/routes/auth.routes";
import ticketRoutes from "@/routes/ticket.routes";
import accountRoutes from "@/routes/account.routes";

// Routes Declaration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ticket", ticketRoutes);
app.use("/api/v1/account", accountRoutes);

// Inngest Route
app.use(
  "/api/v1/inngest",
  serve({
    client: inngest,
    functions: inngestFunctions,
    signingKey: INNGEST_SIGNING_KEY,
  })
);

// Handle Undefined Routes
app.use(undefinedRoutesHandler);

export { app };
