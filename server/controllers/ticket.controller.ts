import { ApiResponse, ApiError } from "@/utils/api/api-response";
import { HTTP_STATUS } from "@/utils/constants";
import { Controller } from "@/types";
import { trimAndClean } from "@/utils/common";

import { inngest } from "@/inngest/client";

import db from "@/db";
import { tickets, chats } from "@/db/schema";
import { NewTicket, Ticket, TicketWithMessages } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { getDateNow } from "@/utils/common";

export const createTicket: Controller = async (req, res) => {
  try {
    // Extract title and description from body
    const { title, description } = req.body;
    const trimmedTitle = trimAndClean(title || " ");

    if (!trimmedTitle || !description) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Title and Description both are required",
      });
    }

    // Ticket Values
    const ticketValues: NewTicket = {
      title,
      description,
      creator: req.user?.id as string,
    };

    // Create Ticket
    const [newTicket] = await db
      .insert(tickets)
      .values(ticketValues)
      .returning();

    // Fire Inngest Event
    await inngest.send({
      name: "ticket/create",
      data: {
        ticketId: newTicket.id,
      },
    });

    // Final Response
    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse({
        success: true,
        message: "Ticket Created Successfully",
      })
    );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message || "An unknown error occurred while creating ticket",
    });
  }
};

export const getTickets: Controller = async (req, res) => {
  try {
    const user = req.user!;
    let ticketsData: Ticket[] = [];

    // Fetch Tickets based on user role
    if (user.role === "USER") {
      ticketsData = await db
        .select()
        .from(tickets)
        .where(eq(tickets.creator, user.id))
        .orderBy(desc(tickets.createdAt));
    } else {
      ticketsData = await db
        .select()
        .from(tickets)
        .where(eq(tickets.assignee, user.id))
        .orderBy(desc(tickets.createdAt));
    }

    // Final Response
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,
        message: "Tickets Fetched Successfully",
        data: ticketsData,
      })
    );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message || "An unknown error occurred while fetching tickets",
    });
  }
};

export const getTicketById: Controller = async (req, res) => {
  try {
    const user = req.user!;

    // Extract tickedId from request params
    const ticketId = req.params.ticketId;

    if (!ticketId) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "ticketId is not defined",
      });
    }

    // Declare ticket variable
    let ticket: TicketWithMessages | undefined;

    // Fetch Ticket based on user role
    if (user.role !== "USER") {
      ticket = await db.query.tickets.findFirst({
        where: and(eq(tickets.id, ticketId), eq(tickets.assignee, user.id)),
        with: { messages: true },
      });
    } else {
      ticket = await db.query.tickets.findFirst({
        where: and(eq(tickets.id, ticketId), eq(tickets.creator, user.id)),
        with: { messages: true },
      });
    }

    if (!ticket) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: "Ticket no longer exist",
      });
    }

    // Final Response
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,
        message: "Ticket Fetched Successfully",
        data: ticket,
      })
    );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message ||
        "An unknown error occurred while fetching ticket (by id)",
    });
  }
};

export const updateTicketStatus: Controller = async (req, res) => {
  try {
    const user = req.user!;

    // Extract tickedId from request params
    const ticketId = req.params.ticketId;

    if (!ticketId) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "ticketId is not defined",
      });
    }

    let statusUpdated = false;

    // Update ticket status according to role
    if (user.role === "USER") {
      await db
        .update(tickets)
        .set({ status: "CLOSED", updatedAt: getDateNow() })
        .where(and(eq(tickets.id, ticketId), eq(tickets.creator, user.id)))
        .returning();
      statusUpdated = true;
    } else {
      await db
        .update(tickets)
        .set({ status: "RESOLVED", updatedAt: getDateNow() })
        .where(and(eq(tickets.id, ticketId), eq(tickets.assignee, user.id)))
        .returning();

      statusUpdated = true;
    }

    if (!statusUpdated) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Failed to update ticket status",
      });
    }

    // Fire Inngest Event
    await inngest.send({ name: "ticket/resolve", data: { ticketId } });

    // Final Response
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,
        message: "Ticket Status Updated",
      })
    );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message ||
        "An unknown error occurred while updating ticket status",
    });
  }
};

export const addTicketMessage: Controller = async (req, res) => {
  try {
    const user = req.user!;

    // Extract ticketId and message
    const ticketId = req.params.ticketId;
    const { message } = req.body;

    if (!ticketId || !message) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "tickedId and message both are required",
      });
    }

    const messageValues = {
      message,
      ticketId,
      senderRole: user.role,
    };

    // Update ticket with message according to role

    const [newMessage] = await db
      .insert(chats)
      .values(messageValues)
      .returning();

    if (!newMessage) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Failed to add ticket message",
      });
    }

    // Final Response
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,
        message: "Message Added",
      })
    );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message ||
        "An unknown error occurred while adding expert message",
    });
  }
};
