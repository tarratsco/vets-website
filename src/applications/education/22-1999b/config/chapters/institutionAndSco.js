import {
  textUI,
  textSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const institutionInformationUiSchema = {
  institutionAndScoInformation: {
    'ui:title': 'Institution information',
    facilityCode: textUI({
      title: 'VA Facility Code',
      hint: 'Your 8-character facility code is assigned by VA and identifies your school location. Example: 31000123.',
      autocomplete: 'off',
      errorMessages: {
        required: 'Please enter your 8-digit VA Facility Code.',
        pattern:
          "We couldn't find that VA Facility Code. Please enter a valid 8-digit code.",
      },
    }),
    institutionName: textUI({
      title: 'Institution name',
      hint: 'This is the name of your school as registered with VA. If this name is incorrect, contact your VA Education Liaison Representative.',
      errorMessages: {
        required: 'Please enter the institution name.',
      },
    }),
    institutionAddress: {
      'ui:title': 'Institution address',
      street: textUI({
        title: 'Street address',
        autocomplete: 'street-address',
      }),
      city: textUI({
        title: 'City',
        autocomplete: 'address-level2',
      }),
      state: textUI({
        title: 'State',
        hint: 'Enter the 2-letter state abbreviation. Example: VA',
        autocomplete: 'address-level1',
      }),
      zip: textUI({
        title: 'ZIP code',
        hint: 'Enter your 5-digit ZIP code. Example: 20190',
        autocomplete: 'postal-code',
      }),
    },
  },
};

export const institutionInformationSchema = {
  type: 'object',
  required: ['institutionAndScoInformation'],
  properties: {
    institutionAndScoInformation: {
      type: 'object',
      required: ['facilityCode', 'institutionName'],
      properties: {
        facilityCode: {
          type: 'string',
          pattern: '^\\d{8}$',
          minLength: 8,
          maxLength: 8,
        },
        institutionName: {
          type: 'string',
          maxLength: 100,
        },
        institutionAddress: {
          type: 'object',
          properties: {
            street: { type: 'string', maxLength: 100 },
            city: { type: 'string', maxLength: 60 },
            state: { type: 'string', pattern: '^[A-Z]{2}$', maxLength: 2 },
            zip: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
      },
    },
  },
};

export const scoContactInformationUiSchema = {
  institutionAndScoInformation: {
    'ui:title': 'School Certifying Official contact information',
    scoFirstName: textUI({
      title: 'First name',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    scoLastName: textUI({
      title: 'Last name',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    scoTitle: textUI({
      title: 'Title or role (optional)',
      hint: 'Example: Associate Registrar, School Certifying Official',
    }),
    scoPhone: phoneUI({
      title: 'Phone number',
      hint: 'Enter a 10-digit U.S. phone number. Example: 555-867-5309',
      errorMessages: {
        required: 'Please enter a valid 10-digit U.S. phone number.',
        pattern: 'Please enter a valid 10-digit U.S. phone number.',
      },
    }),
    scoEmail: emailUI({
      title: 'Email address',
      hint: 'Enter the email address where VA should send your submission confirmation.',
      errorMessages: {
        required: 'Please enter a valid email address.',
        format: 'Please enter a valid email address in the format name@example.com.',
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