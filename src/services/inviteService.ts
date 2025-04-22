import {
    Invite,
    InviteRepository,
    InviteService,
} from '../interfaces/Inviteinterface'

import { IUser,IUserRepository, IUserService } from "../interfaces/userInterface";

export class inviteService implements InviteService{
    constructor(
        private inviteRepository: InviteRepository,
        private userRepository: IUserRepository
    ) {}
    async getAllAcceptByenventID(eventId: string): Promise<Invite[] | null> {
        return this.inviteRepository.findAllAcceptByenventID(eventId);
    }
    // async getInviteById(id: string): Promise<Invite | null> {
    //     return this.inviteRepository.findById(id);
    // }
    async createInvite(invite: Omit<Invite, 'id'>): Promise<Invite> {
        return this.inviteRepository.create(invite);
    }
    async findinvitebyuserID(userID: any): Promise<Invite[] | null> {
        return this.inviteRepository.findinvitebyuserID(userID);
    }
    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
          throw Object.assign(new Error("User not found"), { status: 404 });
        }
        return user;
      }
    async getAllInvites(): Promise<Invite[] | null> {
        return this.inviteRepository.getAllInvites();
    }
    async updateInvitestatus(id: string, status: string): Promise<Invite | null> {
        return this.inviteRepository.updateInvitestatus(id, status);
    }
    // async updateInvite(id: string, invite: Partial<Invite>): Promise<Invite | null> {
    //     return this.inviteRepository.update(id, invite);
    // }
    // async deleteInvite(id: string): Promise<void> {
    //     return this.inviteRepository.delete(id);
    // }
}