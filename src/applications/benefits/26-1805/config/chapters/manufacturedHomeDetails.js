/**
 * Chapter 5, Screen 9 — Manufactured Home Details
 * Conditional: shown only when propertyType === 'manufactured_home'
 * VA Form 26-1805
 */
import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const manufacturedHomeDetailsUiSchema = {
  propertyInformation: {
    'ui:title': 'Manufactured home details',
    manufacturedHomeDetails: {
      'ui:title': 'Manufactured home information',
      foundationType: radioUI({
        title: 'What type of foundation does the manufactured home have?',
        hint:
          'A manufactured home must be on a permanent foundation to meet VA Minimum Property Requirements (MPR). Non-permanent foundations do not meet MPR and cannot proceed.',
        labels: {
          permanent_affixed: 'Permanent affixed foundation (meets VA MPR)',
          non_permanent:
            'Non-permanent foundation (does not meet VA MPR — cannot proceed)',
        },
        errorMessages: {
          required: 'Please select the foundation type.',
        },
      }),
      hin: textUI({
        title: 'HUD Housing Identification Number (HIN) (optional)',
        hint:
          'The HIN is a serial number assigned by HUD to identify the manufactured home. It is typically found on a label affixed to the rear of the home.',
      }),
      acknowledgements: checkboxGroupUI({
        title: 'Manufactured home acknowledgements',
        required: true,
        labels: {
          specialized_appraiser_acknowledged:
            'I understand that VA will assign a specialized appraiser experienced with manufactured homes.',
          permanent_foundation_confirmed:
            'I confirm that the manufactured home is on a permanent affixed foundation meeting VA MPR.',
        },
        errorMessages: {
          required:
            'Please acknowledge the manufactured home requirements before proceeding.',
        },
      }),
    },
  },
};

export const manufacturedHomeDetailsSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      properties: {
        manufacturedHomeDetails: {
          type: 'object',
          required: ['foundationType'],
          properties: {
            foundationType: radioSchema([
              'permanent_affixed',
              'non_permanent',
            ]),
            hin: { type: 'string', maxLength: 20 },
            acknowledgements: checkboxGroupSchema([
              'specialized_appraiser_acknowledged',
              'permanent_foundation_confirmed',
            ]),
          },
        },
      },
    },
  },
};