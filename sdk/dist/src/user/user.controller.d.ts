import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("../../PlatformAPI").ScimUsers>;
    getCurrentUser(req: any, res: any): Promise<any>;
    createUser(req: any, res: any): Promise<any>;
    deleteUser(req: any, res: any): Promise<any>;
    updateUser(req: any, res: any): Promise<any>;
}
