import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  APPLICANT_RELATIONSHIP_LABELS,
  APPLICANT_RELATIONSHIP_KEYS,
  US_STATE_KEYS,
  US_STATE_OPTIONS,
} from '../../constants';

const stateLabels = US_STATE_OPTIONS.reduce((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {});

export const applicantInfoUiSchema = {
  applicant: {
    'ui:title': 'Your information',
    'ui:description':
      'Enter your name as the person submitting this application. This may be different from the person entitled to receive the flag if you are a funeral director, VSO representative, or authorized submitter.',
    firstName: textUI({
      title: 'Your first name',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    middleName: textUI({
      title: 'Your middle name (optional)',
    }),
    lastName: textUI({
      title: 'Your last name',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    addressLine1: textUI({
      title: 'Your street address or rural route, or P.O. Box',
      autocomplete: 'street-address',
      errorMessages: {
        required: 'Please enter your street address.',
      },
    }),
    addressLine2: textUI({
      title: 'Apartment, suite, unit (optional)',
    }),
    city: textUI({
      title: 'Your city',
      autocomplete: 'address-level2',
      errorMessages: {
        required: 'Please enter your city.',
      },
    }),
    state: selectUI({
      title: 'Your state or territory',
      labels: stateLabels,
      errorMessages: {
        required: 'Please select your state or territory.',
      },
    }),
    zip: textUI({
      title: 'Your ZIP code',
      inputType: 'text',
      autocomplete: 'postal-code',
      errorMessages: {
        required: 'Please enter your ZIP code.',
        pattern: 'Please enter a valid ZIP code (5 digits).',
      },
    }),
    relationshipToVeteran: selectUI({
      title: 'Your relationship to the deceased Veteran',
      hint:
        'Select your relationship as the person submitting this application, not the person receiving the flag (if they are different).',
      labels: APPLICANT_RELATIONSHIP_LABELS,
      errorMessages: {
        required:
          'Please select your relationship to the deceased Veteran.',
      },
    }),
    relationshipToVeteranOther: textUI({
      title: 'Describe your relationship (optional)',
      'ui:options': {
        expandUnder: 'relationshipToVeteran',
        expandUnderCondition: 'otherAuthorizedRepresentative',
      },
    }),
  },
};

export const applicantInfoSchema = {
  type: 'object',
  required: ['applicant'],
  properties: {
    applicant: {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'addressLine1',
        'city',
        'state',
        'zip',
        'relationshipToVeteran',
      ],
      properties: {
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        middleName: {
          type: 'string',
          maxLength: 30,
        },
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        addressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        addressLine2: {
          type: 'string',
          maxLength: 100,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        state: selectSchema(US_STATE_KEYS),
        zip: {
          type: 'string',
          pattern: '^[0-9]{5}(-[0-9]{4})?$',
          minLength: 5,
          maxLength: 10,
        },
        relationshipToVeteran: selectSchema(APPLICANT_RELATIONSHIP_KEYS),
        relationshipToVeteranOther: {
          type: 'string',
          maxLength: 100,
        },
      },
    },
  },
};