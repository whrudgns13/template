import { GroupService } from './group.service';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getRoles(): Promise<import("../../PlatformAPI").ScimGroups>;
    updateUserRole(req: any, res: any): Promise<any>;
    deleteUserRole(req: any, res: any): Promise<any>;
}
