import e, { NextFunction, Request, Response } from "express";
import { Checkin, CheckinService } from "../interfaces/checkinInterface";
import { Invite, InviteService } from "../interfaces/Inviteinterface";

export class CheckinController {
  private checkinService: CheckinService;
  private inviteService: InviteService;

  constructor(checkinService: CheckinService, inviteService: InviteService) {
    this.checkinService = checkinService;
    this.inviteService = inviteService;
  }

  async getAllCheckinsByEventID(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_id } = req.params; // Extract event_id from route parameters
      console.log("event_id:", event_id);
      const result = await this.checkinService.findAllCheckinsByEventID(event_id);
      res.json({ message: "Get all checkins.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }

  async createCheckin(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    try {

      const { invite_id,event_id } = req.body;
      if (!invite_id||!event_id) {
        throw new Error("The 'invite_id' and 'event_id' fields are required.");
      }

      // Check if the invite exists
      const invite: Invite | null = await this.inviteService.findById(
        invite_id
      );
      if (!invite) {
        throw new Error("Invite not found.");
      }

      if(`${invite.event_id}` !== `${event_id}`){
        throw new Error("Event ID does not match the invite.");
      }else{
        const updateInviteStatus = await this.inviteService.updateCheckinStatus(
          invite_id,
        );
        if (!updateInviteStatus) {
          throw new Error("Failed to update invite status.");
        }
      }

      const result = await this.checkinService.createCheckin({
        event_id,
        invite_id,
        // userId: req.userId,
      });
      res.json({ message: "Create checkin.", data: result });
    } catch (error) {
      next(error);
    }
  }
}