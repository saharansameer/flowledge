import { Router } from "express";
import { asyncHandler } from "@/utils/api/async-handler";
import { errorHandler } from "@/middlewares/error.middleware";
import { checkAuth } from "@/middlewares/auth.middleware";
import {
  signup,
  signin,
  signout,
  renewTokens,
  clearCookie,
} from "@/controllers/auth.controller";

const router = Router();

// POST - signup
router.route("/sign-up").post(asyncHandler(signup));

// POST - signin
router.route("/sign-in").post(asyncHandler(signin));

// PATCH - signout
router.route("/sign-out").patch(checkAuth, asyncHandler(signout));

// PATCH - renew token
router.route("/renew-token").patch(asyncHandler(renewTokens));

// GET - clear cookie
router.route("/clear-cookie").get(asyncHandler(clearCookie));

// Error Handler
router.use(errorHandler);

export default router;
