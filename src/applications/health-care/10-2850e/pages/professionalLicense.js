import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const stateOptions = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC', 'PR', 'GU', 'VI', 'AS', 'MP', 'Other',
];

const licenseStatusValues = [
  'active',
  'active-restricted',
  'inactive',
  'expired',
  'surrendered',
  'revoked',
  'suspended',
];

export const professionalLicenseUiSchema = {
  professionalLicenses: {
    'ui:title': 'Professional Licenses',
    'ui:description':
      'List all professional licenses you have ever held in any state or jurisdiction. You must include all licenses, even if expired, surrendered, or revoked.',
    'ui:options': {
      itemName: 'License',
      viewField: ({ formData }) =>
        `${formData.licenseType || 'License'} — ${formData.issuingState || ''} #${formData.licenseNumber || ''}`,
    },
    items: {
      licenseType: textUI({
        title: 'Type of professional license',
        hint:
          'For example: Registered Nurse (RN), Certified Registered Nurse Anesthetist (CRNA), Nurse Practitioner (NP)',
        errorMessages: { required: 'Please enter the license type.' },
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
          required: 'Please enter the license issue date.',
          futureDate: 'Issue date cannot be in the future.',
        },
      }),
      expirationDate: {
        ...currentOrPastDateUI({
          title: 'License expiration date',
          hint:
            'If your license does not expire, enter the date of your most recent renewal.',
        }),
      },
      licenseStatus: radioUI({
        title: 'Current status of this license',
        labels: {
          active: 'Active and unrestricted',
          'active-restricted': 'Active with restrictions or conditions',
          inactive: 'Inactive / lapsed (renewal not completed)',
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
          hint:
            'Describe the nature of any restriction, condition, or adverse action. Include dates, the issuing authority\'s explanation, and the current resolution status if applicable.',
          charcount: true,
        }),
        'ui:options': {
          hideIf: (formData, index) => {
            const licenses = formData?.professionalLicenses;
            if (!licenses || !licenses[index]) return true;
            return licenses[index].licenseStatus === 'active';
          },
          expandUnder: 'licenseStatus',
          expandUnderCondition: value => value && value !== 'active',
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
          issuingState: selectSchema(stateOptions),
          licenseNumber: { type: 'string', minLength: 1, maxLength: 50 },
          issueDate: currentOrPastDateSchema,
          expirationDate: currentOrPastDateSchema,
          licenseStatus: radioSchema(licenseStatusValues),
          restrictionExplanation: { type: 'string', maxLength: 2000 },
        },
      },
    },
  },
};