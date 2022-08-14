import type { TokenPolicySettingsResp } from './token-policy-settings-resp';
import type { SamlConfigSettingsResp } from './saml-config-settings-resp';
import type { LinksSettings } from './links-settings';
export declare type TenantSettingsResp = {
    'iframeDomains'?: string;
    'tokenPolicySettings'?: TokenPolicySettingsResp;
    'samlConfigSettings'?: SamlConfigSettingsResp;
    'links'?: LinksSettings;
    'defaultIdp'?: string;
    'treatUsersWithSameEmailAsSameUser'?: boolean;
    'corsDefaultOrigins'?: string;
    'corsXhrOrigins'?: string;
} | Record<string, any>;
