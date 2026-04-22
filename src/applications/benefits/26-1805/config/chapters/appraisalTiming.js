/**
 * Chapter 6, Screen 14 — Appraisal Timing
 * VA Form 26-1805
 */
import {
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const appraisalTimingUiSchema = {
  accessAndTiming: {
    'ui:title': 'Appraisal timing',
    appraisalTiming: {
      'ui:title': 'Appraisal scheduling requirements',
      timingUrgency: radioUI({
        title: 'Is this appraisal request standard or expedited?',
        hint:
          'Standard appraisals are completed within 10 business days. Expedited requests require justification and are subject to VA approval. Rural markets with thin appraiser panels may take longer.',
        labels: {
          standard: 'Standard (10 business days)',
          expedited:
            'Expedited — I have a compelling reason for faster completion',
        },
        errorMessages: {
          required: 'Please select standard or expedited timing.',
        },
      }),
      expeditedJustification: {
        ...textareaUI({
          title: 'Justification for expedited appraisal',
          hint:
            'Explain why expedited appraisal scheduling is needed (e.g., contract closing deadline, rate lock expiration). Maximum 300 characters.',
          charcount: true,
          errorMessages: {
            required:
              'Enter a justification for the expedited appraisal request.',
          },
        }),
        'ui:options': {
          expandUnder: 'timingUrgency',
          expandUnderCondition: 'expedited',
          charcount: true,
        },
      },
      earliestAccessDate: currentOrPastDateUI({
        title: 'Earliest date the property is available for the appraisal inspection',
        hint:
          'Enter the earliest date the appraiser can access the property. Cannot be in the past.',
        errorMessages: {
          required: 'Enter the earliest available access date.',
          pattern: 'Enter a valid date.',
        },
      }),
    },
  },
};

export const appraisalTimingSchema = {
  type: 'object',
  properties: {
    accessAndTiming: {
      type: 'object',
      required: ['appraisalTiming'],
      properties: {
        appraisalTiming: {
          type: 'object',
          required: ['timingUrgency', 'earliestAccessDate'],
          properties: {
            timingUrgency: radioSchema(['standard', 'expedited']),
            expeditedJustification: {
              type: 'string',
              maxLength: 300,
            },
            earliestAccessDate: currentOrPastDateSchema,
          },
        },
      },
    },
  },
};