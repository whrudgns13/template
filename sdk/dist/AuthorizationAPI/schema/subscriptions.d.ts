import type { SubscriptionDetails } from './subscription-details';
import type { CloneSubscriptionDetails } from './clone-subscription-details';
export declare type Subscriptions = {
    'cloneCount'?: number;
    'subscriptions'?: SubscriptionDetails[];
    'subscriptionCountForTenant'?: number;
    'cloneSubscriptions'?: CloneSubscriptionDetails[];
    'referenceCount'?: number;
    'cloneSubscriptionCount'?: number;
    'subscriptionCount'?: number;
} | Record<string, any>;
