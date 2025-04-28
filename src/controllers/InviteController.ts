import { NextFunction, Request, Response } from "express";
import { Invite, InviteService } from "../interfaces/Inviteinterface";
import { IUser, IUserService } from "../interfaces/userInterface";
import { v4 as uuidv4 } from "uuid";

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
    } catch (error) {
      next(error);
    }
  }

  async getAllAcceptByenventID(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_id } = req.params;
      const result = await this.inviteService.getAllAcceptByenventID(event_id);
      res.json({ message: "Get all accepted invites.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateInvitestatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        throw new Error("The 'status' field is required.");
      }

      const result = await this.inviteService.updateInvitestatus(id, status);
      res.json({ message: "Invite status updated.", data: result });
      console.log('HHHHHHHHH',result)
    } catch (error) {
      next(error);
    }
  }

  async updateCheckinStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const existingInvite = await this.inviteService.findById(id);

      if (!existingInvite) {
        throw new Error("Invite not found");
      }

      if (existingInvite.is_checked_in === true) {
        throw new Error("Invite is already checked in.");
      }

      const result = await this.inviteService.updateCheckinStatus(id);
      res.json({ message: "Invite check-in updated.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateCheckOutStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { gift } = req.body;

      if (!gift) {
        throw new Error("The 'gift' field is required.");
      }

      const existingInvite = await this.inviteService.findById(id);

      if (!existingInvite) {
        throw new Error("Invite not found");
      }

      if (existingInvite.is_checked_out) {
        throw new Error("Invite is already checked out.");
      }

      if (!existingInvite.is_checked_in) {
        throw new Error("Invite is not checked in.");
      }

      const inviteData: Omit<Invite, "id"> = {
        event_id: existingInvite.event_id,
        user_id: existingInvite.user_id,
        status: existingInvite.status,
        qr_code: existingInvite.qr_code,
        is_checked_in: existingInvite.is_checked_in,
        check_in_time: existingInvite.check_in_time,
        is_checked_out: true,
        check_out_time: new Date(),
        gift: gift,
      };

      const result = await this.inviteService.updateCheckOutStatus(inviteData, id);
      res.json({ message: "Invite check-out updated.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async findbyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.inviteService.findById(id);
      res.json({ message: "Get invite by ID.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async createInvite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { event_id } = req.params;
      const qr_code = uuidv4();

      const result = await this.userService.getUserById(req.userId);
      const userInvites = await this.inviteService.findinvitebyuserID(req.userId);

      if ((userInvites?.length ?? 0) >= 50 && result.role !== "admin") {
        throw new Error("You have reached the maximum limit of 50 invites.");
      }

      const newInvite = await this.inviteService.createInvite({
        event_id,
        user_id: req.userId,
        status: "pending",
        qr_code,
        is_checked_in: false,
        check_in_time: null,
        is_checked_out: false,
        check_out_time: null,
        gift: null,
      });

      res.status(201).json({
        message: "A new invite was created.",
        data: newInvite,
        user: userInvites,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getGuestInsight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;
      const acceptedInvites = await this.inviteService.getAllAcceptByenventID(eventId);
      const totalCheckedIn = await this.inviteService.findAllcheckinByenventID(eventId);
      const totalContribution = await this.inviteService.findAllmoneyByenventID(eventId);
  
      const totalAccepted = acceptedInvites ? acceptedInvites.length : 0;
      // const totalCheckedIn = acceptedInvites ? acceptedInvites.filter((invite) => invite.is_checked_in).length : 0;
      // const totalContribution = acceptedInvites
      //   ? acceptedInvites.reduce((sum, invite) => sum + (Number(invite.gift) || 0), 0)
      //   : 0;
  
      res.json({
        message: "Guest Insight fetched successfully.",
        data: {
          totalAccepted,
          totalCheckedIn,
          totalContribution,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  
}
