import { Router } from "express";
import { asyncHandler } from "@/utils/api/async-handler";
import { errorHandler } from "@/middlewares/error.middleware";
import { checkAuth } from "@/middlewares/auth.middleware";
import {
  getAccountDetails,
  updateAccountDetails,
} from "@/controllers/account.controller";

const router = Router();

router.use(checkAuth);

// GET - fetch expert account details
router.route("/expert").get(asyncHandler(getAccountDetails));

// PATCH - udpate expert account details
router.route("/update/expert").patch(asyncHandler(updateAccountDetails));

router.use(errorHandler);

export default router;
