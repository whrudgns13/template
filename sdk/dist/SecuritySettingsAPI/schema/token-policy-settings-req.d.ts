export declare type TokenPolicySettingsReq = {
    'changeMode'?: 'ADD' | 'UPDATE' | 'DELETE';
    'keyId'?: string;
    'accessTokenValidity'?: number;
    'refreshTokenValidity'?: number;
    'refreshTokenUnique'?: boolean;
} | Record<string, any>;
