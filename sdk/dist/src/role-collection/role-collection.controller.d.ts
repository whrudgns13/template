import { RoleCollectionService } from './role-collection.service';
export declare class RoleCollectionController {
    private readonly roleColleactionService;
    constructor(roleColleactionService: RoleCollectionService);
    getRoleCollections(req: any, res: any): Promise<any>;
    changeRoleCollectionDescription(req: any, res: any): Promise<any>;
    createRoleCollection(req: any, res: any): Promise<any>;
    deleteRoleCollectionByName(req: any, res: any): Promise<any>;
    addRolesToRoleCollection(req: any, res: any): Promise<any>;
    deleteRoleFromRoleCollection(req: any, res: any): Promise<any>;
}
