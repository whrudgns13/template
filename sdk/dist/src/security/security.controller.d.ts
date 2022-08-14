import { SecurityService } from './security.service';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    getSecuritySetting(): Promise<import("../../SecuritySettingsAPI").TenantSettingsResp[]>;
    updateSecuritySetting(req: any, res: any): Promise<any>;
}
