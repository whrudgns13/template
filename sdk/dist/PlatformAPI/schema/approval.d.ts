export declare type Approval = {
    'clientId'?: string;
    'expiresAt'?: string;
    'lastUpdatedAt'?: string;
    'scope'?: string;
    'status'?: 'APPROVED' | 'DENIED';
    'userId'?: string;
} | Record<string, any>;
