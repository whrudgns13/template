import { GroupService } from './group.service';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getRoleColleactions(): Promise<import("../../PlatformAPI").ScimGroups>;
    addUserRoleColleaction(req: any, res: any): Promise<any>;
    deleteUserRoleColleaction(req: any, res: any): Promise<any>;
}
