/**
 * Chapter 5, Screen 12 — Prior VA Appraisal
 * VA Form 26-1805
 */
import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const priorVaAppraisalUiSchema = {
  propertyInformation: {
    'ui:title': 'Prior VA appraisal',
    priorVaAppraisal: {
      'ui:title': 'Prior VA appraisal history',
      hasPriorVaAppraisal: radioUI({
        title: 'Has this property been previously appraised by VA?',
        hint:
          'If yes, provide the prior VA case number to prevent duplicate case creation.',
        labels: {
          yes: 'Yes — this property has a prior VA appraisal',
          no: 'No — this is the first VA appraisal for this property',
        },
        errorMessages: {
          required:
            'Please indicate whether this property has a prior VA appraisal.',
        },
      }),
      priorVaCaseNumber: {
        ...textUI({
          title: 'Prior VA case number',
          hint:
            'Enter the prior VA case number as it appears on the prior Notice of Value (NOV).',
          errorMessages: {
            required: 'Enter the prior VA case number.',
          },
        }),
        'ui:options': {
          expandUnder: 'hasPriorVaAppraisal',
          expandUnderCondition: 'yes',
        },
      },
      priorAppraisalDate: {
        ...currentOrPastDateUI({
          title: 'Approximate date of prior VA appraisal',
          hint:
            'Enter the approximate date of the prior VA appraisal if known.',
          errorMessages: {
            pattern: 'Enter a valid prior appraisal date.',
          },
        }),
        'ui:options': {
          expandUnder: 'hasPriorVaAppraisal',
          expandUnderCondition: 'yes',
        },
      },
    },
  },
};

export const priorVaAppraisalSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      required: ['priorVaAppraisal'],
      properties: {
        priorVaAppraisal: {
          type: 'object',
          required: ['hasPriorVaAppraisal'],
          properties: {
            hasPriorVaAppraisal: radioSchema(['yes', 'no']),
            priorVaCaseNumber: { type: 'string', maxLength: 20 },
            priorAppraisalDate: currentOrPastDateSchema,
          },
        },
      },
    },
  },
};