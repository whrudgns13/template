export declare class GroupService {
    private destination;
    getRoles(): Promise<import("../../PlatformAPI").ScimGroups>;
    addUserRole(req: any, res: any): Promise<any>;
    deleteUserRole(req: any, res: any): Promise<any>;
    deleteRole(req: any, res: any): Promise<any>;
}
