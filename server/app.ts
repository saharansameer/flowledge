import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CLIENT_URL } from "@/env";

import { SIZE_LIMIT } from "@/utils/constants";
import { undefinedRoutesHandler } from "@/middlewares/error.middleware";

import { serve } from "inngest/express";
import { inngest } from "@/inngest/client";
import { onSignup } from "@/inngest/functions/on-signup";

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

// Routes Declaration
app.use("/api/v1/auth", authRoutes);

// Inngest Route
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onSignup],
  })
);

// Handle Undefined Routes
app.use(undefinedRoutesHandler);

export default app;
