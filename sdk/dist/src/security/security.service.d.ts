export declare class SecurityService {
    private destination;
    getSecuritySetting(): Promise<import("../../SecuritySettingsAPI").TenantSettingsResp[]>;
    updateSecuritySetting(req: any, res: any): Promise<any>;
}
