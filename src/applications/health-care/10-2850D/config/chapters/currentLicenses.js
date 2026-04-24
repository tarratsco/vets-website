import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

const ISSUING_STATE_OPTIONS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'DEA_FEDERAL',
];

const ISSUING_STATE_LABELS = ISSUING_STATE_OPTIONS.reduce((acc, s) => {
  acc[s] = s === 'DEA_FEDERAL' ? 'Federal/DEA' : s;
  return acc;
}, {});

const licenseItemUiSchema = {
  licenseType: textUI({
    title: 'License, certification, or registration name and type',
    hint:
      'Include all licenses, certifications, and registrations including DEA certificates. Examples: Medical License (MD), Registered Nurse (RN), Pharmacist License, DEA Registration.',
    errorMessages: {
      required: 'Enter the license, certification, or registration type.',
    },
  }),
  licenseNumber: textUI({
    title: 'License, certification, or registration number',
    errorMessages: {
      required: 'Enter the license, certification, or registration number.',
    },
  }),
  issuingState: selectUI({
    title: 'State issuing license',
    labels: ISSUING_STATE_LABELS,
    hint: "For DEA registrations, select 'Federal/DEA'.",
    errorMessages: {
      required: 'Select the issuing state.',
    },
  }),
  expirationDate: {
    'ui:title': 'Expiration date',
    'ui:webComponentField': VaMemorableDateField,
    'ui:options': {
      hint: 'Enter the expiration date shown on your license, certification, or registration document.',
    },
    'ui:errorMessages': {
      required: 'Enter the expiration date.',
      pattern: 'Enter a valid date.',
    },
  },
};

const licenseItemSchema = {
  type: 'object',
  required: ['licenseType', 'licenseNumber', 'issuingState', 'expirationDate'],
  properties: {
    licenseType: { type: 'string', minLength: 1, maxLength: 100 },
    licenseNumber: { type: 'string', minLength: 1, maxLength: 50 },
    issuingState: { type: 'string', enum: ISSUING_STATE_OPTIONS },
    expirationDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
  },
};

export const currentLicensesUiSchema = {
  licensesAndCredentials: {
    'ui:title': 'Current licenses, certifications, and registrations',
    currentLicenses: {
      'ui:options': {
        itemName: 'License, certification, or registration',
        viewField: ({ formData }) =>
          formData.licenseType || 'License entry',
        keepInPageOnReview: true,
        useDlWrap: false,
      },
      items: licenseItemUiSchema,
    },
  },
};

export const currentLicensesSchema = {
  type: 'object',
  properties: {
    licensesAndCredentials: {
      type: 'object',
      properties: {
        currentLicenses: {
          type: 'array',
          minItems: 0,
          items: licenseItemSchema,
        },
      },
    },
  },
};