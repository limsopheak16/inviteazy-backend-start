import {
    Invite,
    InviteRepository,
    InviteService,
} from '../interfaces/Inviteinterface'

import { IUser, IUserRepository, IUserService } from "../interfaces/userInterface";

export class inviteService implements InviteService {
    constructor(
        private inviteRepository: InviteRepository,
        private userRepository: IUserRepository
    ) {}
    async findAllcheckinByenventID(eventID: string): Promise<{ check_in_count: number } | null> {
        return this.inviteRepository.findAllcheckinByenventID(eventID);
    }

    async findAllmoneyByenventID(eventID: string): Promise<{ total_gift_amount: number | null } | null> {
        const result = await this.inviteRepository.findAllmoneyByenventID(eventID);
        return result ? { ...result } : null;
    }

    async getAllAcceptByenventID(eventId: string): Promise<Invite[] | null> {
        return this.inviteRepository.findAllAcceptByenventID(eventId);
    }
    async getAllcheckinByenventID(eventId: string): Promise<{ check_in_count: number } | null> {
        return this.inviteRepository.findAllcheckinByenventID(eventId);
    }
    async getAllmoneyByenventID(eventId: string): Promise<{total_gift_amount: number | null } | null> {
        const result = await this.inviteRepository.findAllmoneyByenventID(eventId);
        return result ? {...result } : null;
    }
    async findAllAcceptByenventID(eventId: string): Promise<Invite[] | null> {
        return this.inviteRepository.findAllAcceptByenventID(eventId);
    }

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

    async findById(id: string): Promise<Invite | null> {
        return this.inviteRepository.findById(id);
    }

    async updateCheckinStatus(id: string): Promise<Invite | null> {
        return this.inviteRepository.updateCheckinStatus(id);
    }

    async updateCheckOutStatus(invite: Omit<Invite, 'id'>, id: string): Promise<Invite | null> {
        return this.inviteRepository.updateCheckOutStatus(invite, id);
    }
}
