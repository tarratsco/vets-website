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

const LICENSE_STATUS_LABELS = {
  active: 'Active and unrestricted',
  'active-restricted': 'Active with restrictions or conditions',
  inactive: 'Inactive / lapsed',
  expired: 'Expired',
  surrendered: 'Surrendered or relinquished',
  revoked: 'Revoked',
  suspended: 'Suspended',
};

const STATE_OPTIONS = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  OTHER: 'Other jurisdiction',
};

export const professionalLicensesUiSchema = {
  professionalLicenses: {
    'ui:title': 'Professional licenses',
    'ui:description':
      'List all professional licenses you have ever held in any state or jurisdiction. Omissions may be identified through the National Practitioner Data Bank (NPDB) or primary source verification.',
    'ui:options': {
      itemName: 'License',
      viewField: item =>
        `${item.licenseType || 'License'} — ${item.issuingState || ''} #${item.licenseNumber || ''}`,
      keepInPageOnReview: true,
    },
    items: {
      licenseType: textUI({
        title: 'Type of professional license',
        hint: 'For example: Registered Nurse (RN), Nurse Practitioner (NP), CRNA, Physician (MD/DO)',
        errorMessages: { required: 'Please enter the license type.' },
      }),
      issuingState: selectUI({
        title: 'State or jurisdiction that issued this license',
        labels: STATE_OPTIONS,
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
      expirationDate: currentOrPastDateUI({
        title: 'License expiration date',
        hint: 'If your license does not expire, enter the date of your most recent renewal.',
      }),
      licenseStatus: radioUI({
        title: 'Current status of this license',
        labels: LICENSE_STATUS_LABELS,
        errorMessages: { required: 'Please select the license status.' },
      }),
      restrictionExplanation: textareaUI({
        title: 'Explain the restriction or non-active status of this license',
        hint: 'Describe the nature of any restriction, condition, or adverse action. Include dates, the issuing authority\'s explanation, and the current resolution status if applicable.',
        'ui:options': {
          hideIf: (formData, index) => {
            const licenses = formData?.professionalLicenses;
            if (!licenses || !licenses[index]) return true;
            return licenses[index].licenseStatus === 'active';
          },
        },
        errorMessages: { required: 'Please explain the restriction or non-active status.' },
      }),
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
          issuingState: selectSchema(Object.keys(STATE_OPTIONS)),
          licenseNumber: { type: 'string', minLength: 1, maxLength: 50 },
          issueDate: currentOrPastDateSchema,
          expirationDate: currentOrPastDateSchema,
          licenseStatus: radioSchema(Object.keys(LICENSE_STATUS_LABELS)),
          restrictionExplanation: { type: 'string', maxLength: 2000 },
        },
      },
    },
  },
};