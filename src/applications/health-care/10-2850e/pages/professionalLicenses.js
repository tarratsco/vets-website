import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'Other',
];

const LICENSE_STATUS_LABELS = {
  active: 'Active and unrestricted',
  'active-restricted': 'Active with restrictions or conditions',
  inactive: 'Inactive / lapsed',
  expired: 'Expired',
  surrendered: 'Surrendered or relinquished',
  revoked: 'Revoked',
  suspended: 'Suspended',
};

export const professionalLicensesUiSchema = {
  professionalLicenses: {
    'ui:title': 'Professional licenses',
    'ui:description':
      'List all professional licenses you have ever held in any state or jurisdiction. Include active, inactive, expired, and surrendered licenses. Omissions may be identified through the National Practitioner Data Bank and primary source verification.',
    'ui:options': {
      itemName: 'License',
      viewField: ({ formData }) =>
        `${formData.licenseType || 'License'} — ${formData.issuingState || ''} #${formData.licenseNumber || ''}`,
    },
    items: {
      licenseType: textUI({
        title: 'Type of professional license',
        hint:
          'For example: Registered Nurse (RN), Nurse Practitioner (NP), Certified Registered Nurse Anesthetist (CRNA)',
        errorMessages: { required: 'Please enter your license type.' },
      }),
      issuingState: selectUI({
        title: 'State or jurisdiction that issued this license',
        errorMessages: { required: 'Please select the issuing state.' },
      }),
      licenseNumber: textUI({
        title: 'License number',
        hint: 'Enter the number exactly as it appears on your license certificate.',
        errorMessages: { required: 'Please enter your license number.' },
      }),
      issueDate: currentOrPastDateUI({
        title: 'Date this license was issued',
        hint: 'For example: March 14 2018',
        errorMessages: {
          required: 'Please enter the issue date.',
          futureDate: 'Issue date cannot be in the future.',
        },
      }),
      expirationDate: currentOrPastDateUI({
        title: 'License expiration date',
        hint: 'If your license does not expire, enter the date of your most recent renewal.',
        errorMessages: {
          required: 'Please enter the expiration date.',
        },
      }),
      licenseStatus: radioUI({
        title: 'Current status of this license',
        labels: LICENSE_STATUS_LABELS,
        errorMessages: { required: 'Please select the license status.' },
      }),
      restrictionExplanation: {
        ...textareaUI({
          title: 'Explain the restriction or non-active status of this license',
          hint:
            'Describe the nature of any restriction, condition, or adverse action. Include dates, the issuing authority\'s explanation, and the current resolution status if applicable.',
          charcount: true,
          errorMessages: {
            required: 'Please provide an explanation of the non-active status.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            !formData || formData.licenseStatus === 'active',
          expandUnder: 'licenseStatus',
        },
      },
    },
  },
};

export const professionalLicensesSchema = {
  type: 'object',
  required: ['professionalLicenses'],
  properties: {
    professionalLicenses: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: [
          'licenseType',
          'issuingState',
          'licenseNumber',
          'issueDate',
          'licenseStatus',
        ],
        properties: {
          licenseType: { type: 'string', maxLength: 200 },
          issuingState: selectSchema(US_STATES),
          licenseNumber: { type: 'string', minLength: 1, maxLength: 50 },
          issueDate: currentOrPastDateSchema,
          expirationDate: currentOrPastDateSchema,
          licenseStatus: radioSchema([
            'active',
            'active-restricted',
            'inactive',
            'expired',
            'surrendered',
            'revoked',
            'suspended',
          ]),
          restrictionExplanation: {
            type: 'string',
            maxLength: 2000,
          },
        },
      },
    },
  },
};