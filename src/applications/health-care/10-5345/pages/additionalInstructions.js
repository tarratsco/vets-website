/**
 * @module pages/additionalInstructions
 * @description Optional additional instructions for ROI office, delivery format, urgency
 */
import {
  textareaUI,
  textareaSchema,
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  yesNoUI,
  yesNoSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const additionalInstructionsUiSchema = {
  'ui:title': 'Additional instructions (optional)',
  'ui:description':
    'Use this section to provide optional instructions to the Release of Information office. All fields on this page are optional.',
  additionalInstructions: {
    instructions: textareaUI({
      title: 'Additional instructions',
      hint:
        'Provide any specific instructions for the ROI office, such as a specific treating physician, specific visit dates, or other details to narrow your request.',
      charcount: true,
    }),
    preferredDeliveryFormat: radioUI({
      title: 'Preferred delivery format for the released records',
      hint:
        'Select your preferred method for receiving the released records. The ROI office will use this as guidance, but availability may vary.',
      labels: {
        paper: 'Paper (mailed to the address on file)',
        cd_dvd: 'CD/DVD',
        electronic_secure_email: 'Electronic delivery via secure email',
        fax: 'Fax',
      },
    }),
    isUrgent: yesNoUI({
      title: 'Is this an urgent request?',
      hint:
        'Mark as urgent only if there is a time-sensitive medical or legal need. Urgent requests may be processed faster than the standard 20–30 business days.',
      labels: {
        Y: 'Yes, this is an urgent request',
        N: 'No, this is a routine request',
      },
    }),
    urgencyReason: {
      ...textareaUI({
        title: 'Reason for urgent processing',
        hint:
          'Required if you marked this request as urgent. Briefly explain why urgent processing is needed.',
        charcount: true,
        errorMessages: {
          required:
            'Please provide a reason for the urgent processing request.',
        },
      }),
      'ui:options': {
        expandUnder: 'isUrgent',
        expandUnderCondition: true,
      },
      'ui:required': formData =>
        formData?.additionalInstructions?.isUrgent === true,
    },
  },
};

export const additionalInstructionsSchema = {
  type: 'object',
  properties: {
    additionalInstructions: {
      type: 'object',
      properties: {
        instructions: {
          type: 'string',
          maxLength: 500,
        },
        preferredDeliveryFormat: radioSchema([
          'paper',
          'cd_dvd',
          'electronic_secure_email',
          'fax',
        ]),
        isUrgent: yesNoSchema,
        urgencyReason: {
          type: 'string',
          maxLength: 300,
        },
      },
    },
  },
};