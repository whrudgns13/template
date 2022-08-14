import type { SamlKey } from './saml-key';
export declare type SamlConfigSettingsResp = {
    'disableInResponseToCheck'?: boolean;
    'entityID'?: string;
    'activeKeyId'?: string;
    'keys'?: SamlKey;
} | Record<string, any>;
