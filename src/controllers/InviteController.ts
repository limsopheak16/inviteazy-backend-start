import { NextFunction, Request, Response } from "express";
import { Invite, InviteService } from "../interfaces/Inviteinterface";

export class InviteController{
    private inviteService: InviteService;
    
      constructor(inviteService: InviteService) {
        this.inviteService = inviteService;
      }

      async getAllAcceptByenventID(req: Request, res: Response, next: NextFunction) {
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
    // async getInviteById(req: Request, res: Response, next: NextFunction) {
    //     try {
    //       const { id } = req.params;
    //       const result = await this.inviteService.getInviteById(id);
    //       res.json({ message: "Get invite by Id", data: result });
    //     } catch (error) {
    //       next(error);
    //     }
    //   }
    async createInvite(req: Request, res: Response, next: NextFunction) {
        try {
          const { event_id, user_id, qr_code }: Omit<Invite, "id"> = req.body;
          const newInvite = await this.inviteService.createInvite({
            event_id,
            user_id,
            status: "pending",
            qr_code,
          });
          res
            .status(201)
            .json({ message: "A new invite was created.", data: newInvite });
        } catch (err) {
          console.log(err);
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
