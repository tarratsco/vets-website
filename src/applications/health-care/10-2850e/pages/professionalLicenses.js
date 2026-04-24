import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { states } from 'platform/forms/address';

const stateLabels = states.USA.reduce((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {});

stateLabels['other'] = 'Other jurisdiction';

const licenseItemUiSchema = {
  licenseType: textUI({
    title: 'Type of professional license',
    hint:
      'Enter the type of license (e.g., Registered Nurse, Nurse Practitioner, CRNA).',
    errorMessages: {
      required: 'Please enter the license type.',
    },
  }),
  issuingState: selectUI({
    title: 'State or jurisdiction that issued this license',
    labels: stateLabels,
    errorMessages: {
      required: 'Please select the issuing state or jurisdiction.',
    },
  }),
  licenseNumber: textUI({
    title: 'License number',
    hint: 'Enter the number exactly as it appears on your license certificate.',
    errorMessages: {
      required: 'Please enter your license number.',
    },
  }),
  issueDate: currentOrPastDateUI({
    title: 'Date this license was issued',
    errorMessages: {
      required: 'Please enter the issue date.',
      futureDate: 'Issue date must be in the past.',
    },
  }),
  expirationDate: currentOrPastDateUI({
    title: 'License expiration date',
    hint: 'If your license does not expire, enter the most recent renewal date.',
  }),
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
    errorMessages: {
      required: 'Please select the current status of this license.',
    },
  }),
  restrictionExplanation: textareaUI({
    title: 'Explain the restriction or non-active status of this license',
    hint:
      'Describe the nature of any restriction, condition, or adverse action. Include dates and current resolution status.',
    charcount: true,
    'ui:options': {
      hideIf: (formData, index) => {
        const licenses = formData?.professionalLicenses;
        if (!licenses || !licenses[index]) return true;
        return licenses[index].licenseStatus === 'active';
      },
    },
  }),
};

const licenseItemSchema = {
  type: 'object',
  required: ['licenseType', 'issuingState', 'licenseNumber', 'issueDate', 'licenseStatus'],
  properties: {
    licenseType: { type: 'string', maxLength: 200 },
    issuingState: selectSchema(Object.keys(stateLabels)),
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
};

export const professionalLicensesUiSchema = {
  'ui:title': 'Professional licenses',
  'ui:description':
    'List all professional licenses you have ever held in any state or jurisdiction. Omissions may be identified through primary source verification.',
  professionalLicenses: {
    'ui:options': {
      itemName: 'license',
      viewField: LicenseViewField,
      keepInPageOnReview: true,
    },
    items: licenseItemUiSchema,
  },
};

function LicenseViewField({ formData }) {
  return (
    <div>
      <strong>{formData.licenseType}</strong> &mdash; {formData.issuingState}{' '}
      #{formData.licenseNumber}
    </div>
  );
}

export const professionalLicensesSchema = {
  type: 'object',
  required: ['professionalLicenses'],
  properties: {
    professionalLicenses: {
      type: 'array',
      minItems: 1,
      items: licenseItemSchema,
    },
  },
};