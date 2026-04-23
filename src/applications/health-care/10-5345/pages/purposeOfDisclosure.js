/**
 * @module pages/purposeOfDisclosure
 * @description Purpose(s) for the release — required HIPAA element (45 CFR 164.508(c)(1)(iv))
 */
import {
  checkboxGroupUI,
  checkboxGroupSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const PURPOSE_OPTIONS = {
  personalReview: 'Personal review of my records',
  continuityOfCare: 'Continuity of care with a private healthcare provider',
  legalProceedings: 'Legal proceedings or litigation',
  insurance: 'Insurance — life or disability insurance application or claim',
  socialSecurityDisability: 'Social Security disability claim',
  vaDisabilityClaimSupport:
    'VA disability compensation or pension claim support',
  employmentSecurityClearance:
    'Employment or security clearance purposes',
  other: 'Other purpose not listed above',
};

export const purposeOfDisclosureUiSchema = {
  'ui:title': 'Purpose of disclosure',
  'ui:description':
    'Select all purposes that apply. Under HIPAA (45 CFR 164.508(c)(1)(iv)), a valid authorization must state the purpose of the disclosure.',
  purposeOfDisclosure: {
    ...checkboxGroupUI({
      title: 'Why are you requesting these records?',
      labels: PURPOSE_OPTIONS,
      errorMessages: {
        required: 'Please select at least one purpose for this disclosure.',
      },
    }),
    additionalDescription: textareaUI({
      title: 'Additional description (optional)',
      hint:
        'If you selected "Other" or want to provide more detail about the purpose, describe it here.',
      charcount: true,
    }),
  },
};

export const purposeOfDisclosureSchema = {
  type: 'object',
  properties: {
    purposeOfDisclosure: {
      type: 'object',
      properties: {
        personalReview: { type: 'boolean' },
        continuityOfCare: { type: 'boolean' },
        legalProceedings: { type: 'boolean' },
        insurance: { type: 'boolean' },
        socialSecurityDisability: { type: 'boolean' },
        vaDisabilityClaimSupport: { type: 'boolean' },
        employmentSecurityClearance: { type: 'boolean' },
        other: { type: 'boolean' },
        additionalDescription: {
          type: 'string',
          maxLength: 1000,
        },
      },
    },
  },
};