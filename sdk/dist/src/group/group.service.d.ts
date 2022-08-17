export declare class GroupService {
    private destination;
    getRoles(): Promise<import("../../PlatformAPI").ScimGroups>;
    updateUserRole(req: any, res: any): Promise<any>;
    deleteUserRole(req: any, res: any): Promise<any>;
}
