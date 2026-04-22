/**
 * Chapter 3 — Veteran Borrower Information (Screen 4)
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  ssnUI,
  ssnSchema,
  yesNoUI,
  yesNoSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranBorrowerInformationUiSchema = {
  veteranBorrowerInformation: {
    'ui:title': 'Veteran borrower information',
    veteranFullName: {
      'ui:title': "Veteran's name",
      first: textUI({
        title: "Veteran's first name",
        autocomplete: 'given-name',
        errorMessages: { required: "Enter the Veteran's first name." },
      }),
      middle: textUI({
        title: "Veteran's middle initial",
        autocomplete: 'additional-name',
      }),
      last: textUI({
        title: "Veteran's last name",
        autocomplete: 'family-name',
        errorMessages: { required: "Enter the Veteran's last name." },
      }),
    },
    veteranDOB: currentOrPastDateUI({
      title: "Veteran's date of birth",
      hint:
        "Enter the Veteran's date of birth as it appears on their Certificate of Eligibility.",
      dataDogHidden: true,
      errorMessages: {
        required: "Enter the Veteran's date of birth.",
        pattern: "Enter a valid date of birth.",
      },
    }),
    veteranSSN: {
      ...ssnUI(),
      'ui:title': "Veteran's Social Security Number",
      'ui:options': {
        ...ssnUI()['ui:options'],
        dataDogHidden: true,
      },
    },
    coeNumber: textUI({
      title: "Certificate of Eligibility (COE) number (if known)",
      hint:
        "If you have the Veteran's COE number, enter it here. This is optional.",
    }),
    survivingSpouse: yesNoUI({
      title:
        'Is this borrower an eligible surviving spouse (not the Veteran)?',
      hint:
        'Select Yes if the borrower is a surviving spouse of a Veteran who meets VA eligibility requirements.',
      labels: {
        Y: 'Yes — this is an eligible surviving spouse',
        N: 'No — this is the Veteran',
      },
      errorMessages: {
        required: 'Please indicate whether the borrower is a surviving spouse.',
      },
    }),
  },
};

export const veteranBorrowerInformationSchema = {
  type: 'object',
  properties: {
    veteranBorrowerInformation: {
      type: 'object',
      required: ['veteranFullName', 'veteranSSN', 'veteranDOB'],
      properties: {
        veteranFullName: {
          type: 'object',
          required: ['first', 'last'],
          properties: {
            first: { type: 'string', maxLength: 30, pattern: '^[A-Za-z\\-]+$' },
            middle: {
              type: 'string',
              maxLength: 1,
              pattern: '^[A-Za-z]$',
            },
            last: {
              type: 'string',
              maxLength: 40,
              pattern: "^[A-Za-z\\-\\']+$",
            },
          },
        },
        veteranDOB: currentOrPastDateSchema,
        veteranSSN: ssnSchema,
        coeNumber: {
          type: 'string',
          maxLength: 20,
        },
        survivingSpouse: yesNoSchema,
      },
    },
  },
};