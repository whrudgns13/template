/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'BusinessEventResponseObject' schema.
     */
    export type BusinessEventResponseObject = {
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
       * The type of the event that was triggered.<br/>There are two groups of event types: Local Events and Central Events group.<br/>Only event types that belong to one of the groups are returned as the result of a single API call.<br/>The event types group you get depends on the scope you used to access the API.<br>The examples of some of the events for each of the groups:<br/><br/>**Central Events group:** GlobalAccount_Update, AccountDirectory_Creation, AccountDirectory_Update, AccountDirectory_Update_Type, AccountDirectory_Deletion, Subaccount_Creation, Subaccount_Deletion, Subaccount_Update, Subaccount_Move, AccountDirectoryTenant_Creation, AccountDirectoryTenant_Deletion, GlobalAccountEntitlements_Update, EntityEntitlements_Update, EntityEntitlements_Move<br/><br/>**Local Events group:** SubaccountAppSubscription_Creation, SubaccountAppSubscription_Deletion, SubaccountAppSubscription_Update, AppRegistration_Creation, AppRegistration_Deletion, AppRegistration_Update, SubaccountTenant_Creation, SubaccountTenant_Update, SubaccountTenant_Deletion, EnvironmentInstance_Creation, EnvironmentInstance_Deletion, EnvironmentInstances_Deletion
       */
      'eventType'?: string;
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
