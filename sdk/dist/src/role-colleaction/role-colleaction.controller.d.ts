import { RoleColleactionService } from './role-colleaction.service';
export declare class RoleColleactionController {
    private readonly roleColleactionService;
    constructor(roleColleactionService: RoleColleactionService);
    createRole(req: any, res: any): Promise<any>;
}
