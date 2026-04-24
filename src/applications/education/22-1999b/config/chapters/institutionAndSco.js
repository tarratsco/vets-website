import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Chapter 1, Page 1: Institution Information ───────────────────────────────

export const institutionInformationUiSchema = {
  institutionAndScoInformation: {
    'ui:title': 'Institution information',
    facilityCode: textUI({
      title: 'VA Facility Code',
      hint:
        'Your 8-character facility code is assigned by VA and identifies your school location. Example: 31000123. If you have multiple facility codes (branch campuses), enter the code for the location where this student is enrolled.',
      inputType: 'text',
      autocomplete: 'off',
      errorMessages: {
        required: 'Please enter your 8-digit VA Facility Code.',
        pattern:
          "We couldn't find a valid VA Facility Code. Please enter exactly 8 numeric digits.",
      },
    }),
    institutionName: textUI({
      title: 'Institution name',
      hint:
        'This is the name of your school as registered with VA. If this name is incorrect, contact your VA Education Liaison Representative to update your school\'s record.',
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
        title: 'State (2-letter abbreviation)',
        hint: 'Example: VA',
        autocomplete: 'address-level1',
        errorMessages: {
          pattern: 'Please enter a valid 2-letter state abbreviation.',
        },
      }),
      zip: textUI({
        title: 'ZIP code',
        hint: 'Enter a 5-digit ZIP code. Example: 20190',
        autocomplete: 'postal-code',
        errorMessages: {
          pattern: 'Please enter a valid 5-digit ZIP code.',
        },
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
            state: {
              type: 'string',
              pattern: '^[A-Z]{2}$',
              minLength: 2,
              maxLength: 2,
            },
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

// ─── Chapter 1, Page 2: SCO Contact Information ───────────────────────────────

export const scoContactInformationUiSchema = {
  institutionAndScoInformation: {
    'ui:title': 'School Certifying Official contact information',
    scoFirstName: textUI({
      title: 'Your first name',
      hint:
        'Pre-filled from your account. Update if another SCO is completing this form.',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    scoLastName: textUI({
      title: 'Your last name',
      hint: 'Pre-filled from your account.',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    scoTitle: textUI({
      title: 'Your title or role',
      hint: 'Example: Associate Registrar, School Certifying Official',
    }),
    scoPhone: textUI({
      title: 'Your phone number',
      hint:
        'Enter a 10-digit U.S. phone number. Include area code. Example: 5558675309. VA may use this number to contact you about this submission.',
      inputType: 'tel',
      autocomplete: 'tel',
      errorMessages: {
        required: 'Please enter a valid 10-digit U.S. phone number.',
        pattern: 'Please enter a valid 10-digit U.S. phone number.',
      },
    }),
    scoEmail: textUI({
      title: 'Your email address',
      hint:
        'Enter the email address where VA should send your submission confirmation and any follow-up communications about this form.',
      inputType: 'email',
      autocomplete: 'email',
      errorMessages: {
        required: 'Please enter a valid email address.',
        pattern:
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
        scoPhone: {
          type: 'string',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        scoEmail: {
          type: 'string',
          format: 'email',
          maxLength: 255,
        },
      },
    },
  },
};