import {
  textUI,
  textSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const scoContactInformationUiSchema = {
  institutionAndScoInformation: {
    scoFirstName: textUI({
      title: 'Your first name',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    scoLastName: textUI({
      title: 'Your last name',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    scoTitle: textUI({
      title: 'Your title or role',
      hint: 'Example: Associate Registrar, School Certifying Official',
    }),
    scoPhone: phoneUI({
      title: 'Your phone number',
      hint:
        'Enter a 10-digit U.S. phone number. Include area code. Example: 555-867-5309.',
      errorMessages: {
        required: 'Please enter a valid 10-digit U.S. phone number.',
        pattern: 'Please enter a valid 10-digit U.S. phone number.',
      },
    }),
    scoEmail: emailUI({
      title: 'Your email address',
      hint:
        'Enter the email address where VA should send your submission confirmation.',
      errorMessages: {
        required: 'Please enter a valid email address.',
        format:
          'Please enter a valid email address in the format name@example.com.',
      },
    }),
  },
};

export const scoContactInformationSchema = {
  type: 'object',
  required: ['institutionAndScoInformation'],
  properties: {
    institutionAndScoInformation: {
      type: 'object',
      required: ['scoFirstName', 'scoLastName', 'scoPhone', 'scoEmail'],
      properties: {
        scoFirstName: { type: 'string', maxLength: 50 },
        scoLastName: { type: 'string', maxLength: 60 },
        scoTitle: { type: 'string', maxLength: 80 },
        scoPhone: phoneSchema,
        scoEmail: emailSchema,
      },
    },
  },
};