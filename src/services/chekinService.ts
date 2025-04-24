import { Checkin,CheckinRepository,CheckinService } from "../interfaces/checkinInterface";
import { Invite, InviteRepository } from "../interfaces/Inviteinterface";

export class CheckinServiceImpl implements CheckinService {
    constructor(
        private checkinRepository: CheckinRepository,
        private inviteRepository: InviteRepository
    ) {}

    async findAllCheckinsByEventID(id: string): Promise<Checkin[] | null> {
        return this.checkinRepository.findAllCheckinsByEventID(id);
    }

    async createCheckin(checkin: Omit<Checkin, "id">): Promise<Checkin> {
        return this.checkinRepository.create(checkin);
    }

    async findCheckinByInviteID(inviteID: string): Promise<Checkin | null> {
        return this.checkinRepository.findCheckinByInviteID(inviteID);
    }

    async getAllCheckins(): Promise<Checkin[] | null> {
        return this.checkinRepository.getAllCheckins();
    }
}