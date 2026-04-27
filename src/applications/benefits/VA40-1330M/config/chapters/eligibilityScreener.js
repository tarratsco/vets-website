import React from 'react';
import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Service Status Page ────────────────────────────────────────────────────

export const serviceStatusUiSchema = {
  serviceStatusAtDeath: radioUI({
    title: 'What was this service member\'s status at the time of death?',
    hint:
      'Your answer determines which form to use. If the service member was discharged from service before death, use VA Form 40-1330 instead.',
    labels: {
      activeDuty: 'Active duty (Army, Navy, Air Force, Marine Corps, Space Force, or Coast Guard)',
      guardOrReserve: 'National Guard or Reserve member',
    },
    errorMessages: {
      required: 'Please select the service member\'s status at the time of death.',
    },
  }),
};

export const serviceStatusSchema = {
  type: 'object',
  required: ['serviceStatusAtDeath'],
  properties: {
    serviceStatusAtDeath: radioSchema(['activeDuty', 'guardOrReserve']),
  },
};

// ─── Guard/Reserve Qualifier Page ───────────────────────────────────────────

export const guardReserveQualifierUiSchema = {
  guardReserveQualifyingCircumstance: radioUI({
    title: 'How did this National Guard or Reserve member qualify for this benefit?',
    hint:
      'Select the statement that best describes the service member\'s situation. If you\'re unsure, contact NCA or a Veterans Service Organization for help.',
    labels: {
      diedOnActiveDutyForTraining:
        'Died in the line of duty while on active duty for training',
      diedOnInactiveDutyForTraining:
        'Died in the line of duty while on inactive duty for training',
      entitledToRetiredPay: 'Was entitled to retired pay at the time of death',
    },
    errorMessages: {
      required: 'Please select the qualifying circumstance.',
    },
  }),
};

export const guardReserveQualifierSchema = {
  type: 'object',
  required: ['guardReserveQualifyingCircumstance'],
  properties: {
    guardReserveQualifyingCircumstance: radioSchema([
      'diedOnActiveDutyForTraining',
      'diedOnInactiveDutyForTraining',
      'entitledToRetiredPay',
    ]),
  },
};

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const eligibilityScreenerPages = {
  serviceStatus: {
    path: 'eligibility-screener',
    title: 'Service status at time of death',
    uiSchema: serviceStatusUiSchema,
    schema: serviceStatusSchema,
  },
  guardReserveQualifier: {
    path: 'eligibility-screener/guard-reserve-qualifier',
    title: 'Guard/Reserve qualifying circumstance',
    depends: formData => formData.serviceStatusAtDeath === 'guardOrReserve',
    uiSchema: guardReserveQualifierUiSchema,
    schema: guardReserveQualifierSchema,
  },
};

// Legacy named exports for backward compatibility in tests
export const eligibilityScreenerUiSchema = serviceStatusUiSchema;
export const eligibilityScreenerSchema = serviceStatusSchema;