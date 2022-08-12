export declare type ScimGroupMemberPatch = {
    'origin'?: string;
    'type'?: 'USER';
    'value'?: string;
    'operation'?: 'delete' | 'create';
} | Record<string, any>;
