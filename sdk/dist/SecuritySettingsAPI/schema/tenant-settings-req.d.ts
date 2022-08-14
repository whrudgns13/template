import type { TokenPolicySettingsReq } from './token-policy-settings-req';
import type { SamlConfigSettingsReq } from './saml-config-settings-req';
import type { LinksSettings } from './links-settings';
export declare type TenantSettingsReq = {
    'iframeDomains'?: string;
    'tokenPolicySettings'?: TokenPolicySettingsReq;
    'samlConfigSettings'?: SamlConfigSettingsReq;
    'links'?: LinksSettings;
    'defaultIdp'?: string;
    'treatUsersWithSameEmailAsSameUser'?: boolean;
    'corsDefaultOrigins'?: string;
    'corsXhrOrigins'?: string;
} | Record<string, any>;
