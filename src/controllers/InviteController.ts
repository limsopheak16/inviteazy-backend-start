import { NextFunction, Request, Response } from "express";
import { Invite, InviteService } from "../interfaces/Inviteinterface";
import { IUser, IUserService } from "../interfaces/userInterface";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique QR codes

interface AuthRequest extends Request {
  userId?: any;
}

export class InviteController {
  private inviteService: InviteService;
  private userService: IUserService;

  constructor(inviteService: InviteService, userService: IUserService) {
    this.inviteService = inviteService;
    this.userService = userService;
  }
  async getAllInvites(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.inviteService.getAllInvites();
      res.json({ message: "Get all invites.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }
  async getAllAcceptByenventID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { event_id } = req.params; // Extract event_id from route parameters
      console.log("event_id:", event_id);
      const result = await this.inviteService.getAllAcceptByenventID(event_id);
      res.json({ message: "Get all invites.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }
 async updateInvitestatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("📥 Request Params - id:", id);
    console.log("📥 Request Body - status:", status);

    if (!status) {
      throw new Error("The 'status' field is required.");
    }

    const result = await this.inviteService.updateInvitestatus(id, status);
    console.log("✅ Update Result:", result);

    res.json({ message: "Update invite status.", data: result });
  } catch (error) {
    console.error("❌ Error in updateInvitestatus:", error);
    next(error);
  }
}

  async updateCheckinStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Extract invite ID from route parameters
      const result = await this.inviteService.updateCheckinStatus(id);
      res.json({ message: "Update invite status.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async findbyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Extract invite ID from route parameters
      const result = await this.inviteService.findById(id);
      res.json({ message: "Get invite by Id", data: result });
    } catch (error) {
      next(error);
    }
  }
  // async getInviteById(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params;
  //       const result = await this.inviteService.getInviteById(id);
  //       res.json({ message: "Get invite by Id", data: result });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  async createInvite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { event_id } = req.params;
      console.log("event_id:", event_id);
      console.log("req.userId", req.userId);
      // const { qr_code }: Omit<Invite, "id"> = req.body;
      const qr_code = uuidv4();
      const result = await this.userService.getUserById(req.userId);
      const user = await this.inviteService.findinvitebyuserID(req.userId);
      if (
        (user?.length ?? 0) > 50 &&
        result.role !== "admin" &&
        event_id == event_id
      ) {
        throw new Error("You have reached the maximum limit of 50 invites.");
      } else {
        const newInvite = await this.inviteService.createInvite({
          event_id,
          user_id: req.userId,
          status: "pending",
          qr_code,
          is_checked_in: false,
          check_in_time: null,
          contribution: 0, // Default contribution value
        });
        res
          .status(201)
          .json({
            message: "A new invite was created.",
            data: newInvite,
            user,
            result,
          });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getGuestInsight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;
  
      // Get accepted invites for this event
      const acceptedInvites = await this.inviteService.getAllAcceptByenventID(eventId);
  
      const totalAccepted = acceptedInvites ? acceptedInvites.length : 0;
      const totalCheckedIn = acceptedInvites
        ? acceptedInvites.filter((invite) => invite.is_checked_in).length
        : 0;
  
      // Calculate total amount (assuming there's a field like 'contribution' on each invite)
      const totalContribution = acceptedInvites
        ? acceptedInvites.reduce((sum, invite) => {
            return sum + (invite.contribution || 0); // Adjust this if contribution is stored elsewhere
          }, 0)
        : 0;
  
      res.json({
        message: "Guest Insight fetched successfully.",
        data: {
          totalAccepted,
          totalCheckedIn,
          totalContribution,
        },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  

  // async updateInvite(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params;
  //       const { event_id, user_id, status, qr_code }: Partial<Invite> = req.body;
  //       const updatedInvite = await this.inviteService.updateInvite(id, {
  //         event_id,
  //         user_id,
  //         status,
  //         qr_code,
  //       });
  //       res.json({ message: "Invite updated.", data: updatedInvite });
  //     } catch (err) {
  //       console.log(err);
  //       next(err);
  //     }
  //   }
  // async deleteInvite(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params;
  //       await this.inviteService.deleteInvite(id);
  //       res.json({ message: "Invite deleted." });
  //     } catch (err) {
  //       console.log(err);
  //       next(err);
  //     }
  //   }
}
