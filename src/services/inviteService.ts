import {
    Invite,
    InviteRepository,
    InviteService,
} from '../interfaces/Inviteinterface'

export class inviteService implements InviteService{
    constructor(
        private inviteRepository: InviteRepository
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
    // async updateInvite(id: string, invite: Partial<Invite>): Promise<Invite | null> {
    //     return this.inviteRepository.update(id, invite);
    // }
    // async deleteInvite(id: string): Promise<void> {
    //     return this.inviteRepository.delete(id);
    // }
}