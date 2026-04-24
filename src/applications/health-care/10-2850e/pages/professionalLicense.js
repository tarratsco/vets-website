import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
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
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'AS', 'GU', 'MP', 'PR', 'VI', 'Other',
];

export const professionalLicenseUiSchema = {
  professionalLicenses: {
    'ui:title': 'Professional licenses',
    'ui:description':
      'List all professional licenses you have ever held, including all states and jurisdictions. Omissions may be identified through primary source verification.',
    'ui:options': {
      itemName: 'License',
      viewField: ({ formData }) =>
        `${formData?.licenseType || 'License'} — ${formData?.issuingState || ''} #${formData?.licenseNumber || ''}`,
    },
    items: {
      licenseType: textUI({
        title: 'Type of professional license',
        hint: 'For example: Registered Nurse (RN), APRN, CRNA, Physician (MD/DO)',
        errorMessages: { required: 'Please enter the license type.' },
      }),
      issuingState: selectUI({
        title: 'State or jurisdiction that issued this license',
        errorMessages: { required: 'Please select the issuing state.' },
      }),
      licenseNumber: textUI({
        title: 'License number',
        hint: 'Enter the number exactly as it appears on your license.',
        errorMessages: { required: 'Please enter your license number.' },
      }),
      issueDate: currentOrPastDateUI({
        title: 'Date this license was issued',
        errorMessages: {
          required: 'Please enter the issue date.',
          futureDate: 'Issue date cannot be in the future.',
        },
      }),
      expirationDate: {
        ...currentOrPastDateUI({
          title: 'License expiration date',
          hint: 'If your license does not expire, enter the date of your most recent renewal.',
        }),
        'ui:required': formData => {
          const licenses = formData?.professionalLicenses || [];
          return licenses.some(l => l?.licenseStatus === 'active');
        },
      },
      licenseStatus: radioUI({
        title: 'Current status of this license',
        labels: {
          active: 'Active and unrestricted',
          'active-restricted': 'Active with restrictions or conditions',
          inactive: 'Inactive / lapsed',
          expired: 'Expired',
          surrendered: 'Surrendered or relinquished',
          revoked: 'Revoked',
          suspended: 'Suspended',
        },
        errorMessages: { required: 'Please select the license status.' },
      }),
      restrictionExplanation: {
        ...textareaUI({
          title: 'Explain the restriction or non-active status of this license',
          hint: 'Describe the nature of any restriction, condition, or adverse action. Include dates and current resolution status.',
          charcount: true,
          errorMessages: {
            required: 'Please explain the restriction or non-active status.',
          },
        }),
        'ui:options': {
          hideIf: (formData, index) => {
            const status =
              formData?.professionalLicenses?.[index]?.licenseStatus;
            return status === 'active' || !status;
          },
          expandUnder: 'licenseStatus',
        },
      },
    },
  },
};

export const professionalLicenseSchema = {
  type: 'object',
  required: ['professionalLicenses'],
  properties: {
    professionalLicenses: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['licenseType', 'issuingState', 'licenseNumber', 'issueDate', 'licenseStatus'],
        properties: {
          licenseType: { type: 'string', maxLength: 200 },
          issuingState: selectSchema(US_STATES),
          licenseNumber: { type: 'string', maxLength: 50, minLength: 1 },
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
          restrictionExplanation: { type: 'string', maxLength: 2000 },
        },
      },
    },
  },
};