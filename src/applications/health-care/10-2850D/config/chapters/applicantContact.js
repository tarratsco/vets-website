import {
  textUI,
  textSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const applicantContactUiSchema = {
  applicantInformation: {
    'ui:title': 'Contact information',
    primaryPhone: phoneUI({
      title: 'Primary phone number',
      hint: 'Enter a 10-digit phone number including area code (e.g., 2025551234).',
      errorMessages: {
        required: 'Enter a 10-digit phone number including area code.',
        pattern: 'Enter a 10-digit phone number including area code.',
      },
    }),
    alternatePhone: phoneUI({
      title: 'Alternate phone number (optional)',
      hint: 'Enter a 10-digit phone number including area code, if applicable.',
    }),
    primaryEmail: emailUI({
      title: 'Primary email address',
      hint: "We'll use this email to send your submission confirmation.",
      errorMessages: {
        required: 'Enter a valid email address in the format name@example.com.',
        format: 'Enter a valid email address in the format name@example.com.',
      },
    }),
    alternateEmail: emailUI({
      title: 'Alternate email address (optional)',
    }),
  },
};

export const applicantContactSchema = {
  type: 'object',
  properties: {
    applicantInformation: {
      type: 'object',
      required: ['primaryPhone', 'primaryEmail'],
      properties: {
        primaryPhone: {
          type: 'string',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        alternatePhone: {
          type: 'string',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        primaryEmail: {
          type: 'string',
          format: 'email',
          maxLength: 254,
        },
        alternateEmail: {
          type: 'string',
          format: 'email',
          maxLength: 254,
        },
      },
    },
  },
};