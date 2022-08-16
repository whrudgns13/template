/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'BusinessEventTypeResponseObject' schema.
     */
    export type BusinessEventTypeResponseObject = {
      /**
       * Category to which the event type belongs.
       * * <b>LOCAL:</b> The event is associated with the local region within a multi-region universe.
       * * <b>CENTRAL:</b> The event is associated with the central region within a multi-region universe.
       */
      'category'?: 'CENTRAL' | 'LOCAL';
      /**
       * The description of the event type.
       */
      'description'?: string;
      /**
       * List of all the search parameters for the event type.
       * @example "https://<HOST>?searchParamKey1=searchParamValue1"
       */
      'searchParams'?: string[];
      /**
       * The type of the event that was triggered.<br/>There are two groups of event types: Local Events and Central Events group.<br/>Only event types that belong to one of the groups are returned as the result of a single API call.<br/>The event types group you get depends on the scope you used to access the API.<br>The examples of some of the events for each of the groups:<br/><br/>**Central Events group:** GlobalAccount_Update, AccountDirectory_Creation, AccountDirectory_Update, AccountDirectory_Update_Type, AccountDirectory_Deletion, Subaccount_Creation, Subaccount_Deletion, Subaccount_Update, Subaccount_Move, AccountDirectoryTenant_Creation, AccountDirectoryTenant_Deletion, GlobalAccountEntitlements_Update, EntityEntitlements_Update, EntityEntitlements_Move<br/><br/>**Local Events group:** SubaccountAppSubscription_Creation, SubaccountAppSubscription_Deletion, SubaccountAppSubscription_Update, AppRegistration_Creation, AppRegistration_Deletion, AppRegistration_Update, SubaccountTenant_Creation, SubaccountTenant_Update, SubaccountTenant_Deletion, EnvironmentInstance_Creation, EnvironmentInstance_Deletion, EnvironmentInstances_Deletion
       */
      'type'?: string;
    } | Record<string, any>;
