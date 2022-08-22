export declare type OAuth2Configuration = {
    'allowedproviders'?: string[];
    'autoapprove'?: boolean;
    'grant-types'?: string[];
    'redirect-uris'?: string[];
    'refresh-token-validity'?: number;
    'system-attributes'?: string[];
    'token-validity'?: number;
} | Record<string, any>;
