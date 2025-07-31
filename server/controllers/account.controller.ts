import { Controller } from "@/types";

import db from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

import { ApiResponse, ApiError } from "@/utils/api/api-response";
import { HTTP_STATUS } from "@/utils/constants";
import { checkRole, formatSkills, getDateNow } from "@/utils/common";

export const getAccountDetails: Controller = async (req, res) => {
  try {
    // Extract user and re-check role
    const user = req.user!;
    checkRole(user.role, ["EXPERT"]);

    // Get user account details
    const account = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: { designation: true, skills: true },
    });

    if (!account) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: "User does not exist",
      });
    }

    // Final response
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,
        message: "Account details fetched",
        data: account,
      })
    );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message ||
        "An unknown error occurred while fetching account details",
    });
  }
};

export const updateAccountDetails: Controller = async (req, res) => {
  try {
    // Extract user and re-check role
    const user = req.user!;
    checkRole(user.role, ["EXPERT"]);

    // Extract data from body
    const { designation, skills } = req.body;

    if (!designation || !skills) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Designation and Skills both are required",
      });
    }

    // Format skills string into array
    const skillsArray = formatSkills(skills);

    // Update Account Details
    const [updated] = await db
      .update(users)
      .set({ designation, skills: skillsArray, updatedAt: getDateNow() })
      .where(and(eq(users.id, user.id), eq(users.role, "EXPERT")))
      .returning({ designation: users.designation, skills: users.skills });

    if (!updated) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Failed to update expert details",
      });
    }

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse({ success: true, message: "Details Updated" }));
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message ||
        "An unknown error occurred while updating account details",
    });
  }
};
