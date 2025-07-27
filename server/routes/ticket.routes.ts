import { Router } from "express";
import { asyncHandler } from "@/utils/api/async-handler";
import { errorHandler } from "@/middlewares/error.middleware";
import { checkAuth } from "@/middlewares/auth.middleware";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
} from "@/controllers/ticket.controller";

const router = Router();

// Auth
router.use(checkAuth);

// POST - create ticket
router.route("/create").post(asyncHandler(createTicket));

// GET - get all tickets (by user)
router.route("/all").get(asyncHandler(getTickets));

// GET - get ticket by id
// PATCH - update ticket status
router
  .route("/:ticketId")
  .get(asyncHandler(getTicketById))
  .patch(asyncHandler(updateTicketStatus));

// Error Handler
router.use(errorHandler);

export default router;
