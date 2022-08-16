/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'EventResponseObject' schema.
     */
    export type EventResponseObject = {
      /**
       * The time the action triggered the event.<br/>The format is Unix epoch time in milliseconds.
       * Format: "date-time".
       */
      'actionTime'?: string;
      /**
       * The time when the event record was created.<br/>The format is Unix epoch time in milliseconds.
       * Format: "date-time".
       */
      'creationTime'?: string;
      /**
       * JSON object that contains description and details about the requested events.
       */
      'details'?: Record<string, Record<string, any>>;
      /**
       * The ID of the entity associated with the event.
       */
      'entityId'?: string;
      /**
       * The type of entity associated with the event.
       */
      'entityType'?: string;
      /**
       * The service that reported the event.
       */
      'eventOrigin'?: string;
      /**
       * The type of the event that was triggered
       */
      'eventType'?: 'AccountDirectoryTenant_Creation' | 'AccountDirectoryTenant_Deletion' | 'AccountDirectory_CancelSuspension' | 'AccountDirectory_Creation' | 'AccountDirectory_Deletion' | 'AccountDirectory_Suspension' | 'AccountDirectory_Update' | 'AccountDirectory_Update_Type' | 'AppRegistration_Creation' | 'AppRegistration_Deletion' | 'AppRegistration_Update' | 'ChangeCustomerOrderProcess_Completion' | 'ChangeGeoAccessOrderProcess_Completion' | 'EntityEntitlements_Move' | 'EntityEntitlements_Update' | 'EnvironmentInstance_Creation' | 'EnvironmentInstance_Deletion' | 'EnvironmentInstances_Deletion' | 'FollowupOrderProcess_Completion' | 'GlobalAccountCommercialModel_Update' | 'GlobalAccountEntitlements_Update' | 'GlobalAccountTenant_CancelSuspension' | 'GlobalAccountTenant_Creation' | 'GlobalAccountTenant_Deletion' | 'GlobalAccountTenant_Suspension' | 'GlobalAccountTermination_Completion' | 'GlobalAccount_CancelExpiration' | 'GlobalAccount_CancelSuspension' | 'GlobalAccount_Creation' | 'GlobalAccount_Deletion' | 'GlobalAccount_Expiration' | 'GlobalAccount_MigratedToFeatureSetB' | 'GlobalAccount_Suspension' | 'GlobalAccount_Update' | 'InitialOrderProcess_Completion' | 'Notification' | 'ReuseServiceRegistration_Creation' | 'ReuseServiceRegistration_Deletion' | 'ReuseServiceRegistration_Update' | 'SubaccountAppSubscriptionParameters_Update' | 'SubaccountAppSubscription_Creation' | 'SubaccountAppSubscription_Deletion' | 'SubaccountAppSubscription_Update' | 'SubaccountEntitlements_Update' | 'SubaccountReuseServiceSubscription_Creation' | 'SubaccountReuseServiceSubscription_Deletion' | 'SubaccountReuseServiceSubscription_Update' | 'SubaccountTenant_CancelSuspension' | 'SubaccountTenant_Creation' | 'SubaccountTenant_Deletion' | 'SubaccountTenant_Suspension' | 'SubaccountTenant_TerminationInfo' | 'SubaccountTenant_Update' | 'Subaccount_CancelSuspension' | 'Subaccount_Creation' | 'Subaccount_Deletion' | 'Subaccount_Move' | 'Subaccount_MoveToOtherGlobalAccount' | 'Subaccount_Suspension' | 'Subaccount_Update' | 'SupplementaryProductOrderProcess_Completion' | 'SupplementaryProductTerminationProcess_Completion' | 'TerminationDeleteOrderProcess_Completion' | 'TerminationNoticeOrderProcess_Completion' | 'TerminationOrderProcess_Completion' | 'TerminationSuspendOrderProcess_Completion' | 'TerminationUnsuspendFollowupOrderProcess_Completion' | 'TerminationUnsuspendOrderProcess_Completion';
      /**
       * The unique ID of the global account associated with the event.
       */
      'globalAccountGUID'?: string;
      /**
       * The ID of the event.
       * Format: "int64".
       */
      'id'?: number;
    } | Record<string, any>;
