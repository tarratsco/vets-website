import {
  textUI,
  textSchema,
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const DIVORCED_STATUS = 'divorced_separated_widowed_this_year';

export const spouseInformationUiSchema = {
  spouseFullName: {
    first: textUI({
      title: "Spouse's first name",
      required: () => true,
      errorMessages: {
        required: "Please enter your spouse's first name",
      },
    }),
    middle: textUI({
      title: "Spouse's middle initial",
      required: () => false,
    }),
    last: textUI({
      title: "Spouse's last name",
      required: () => true,
      errorMessages: {
        required: "Please enter your spouse's last name",
      },
    }),
  },
  spouseSsn: ssnUI({
    title: "Spouse's Social Security number",
    required: () => true,
    errorMessages: {
      required: "Please enter your spouse's 9-digit Social Security number",
    },
  }),
  spouseDateOfBirth: currentOrPastDateUI({
    title: "Spouse's date of birth",
    required: () => true,
    errorMessages: {
      required: "Please enter your spouse's date of birth",
    },
  }),
  dateOfMarriage: currentOrPastDateUI({
    title: 'Date of marriage',
    required: () => true,
    hint: 'Enter the date you were married',
    errorMessages: {
      required: 'Please enter your date of marriage',
    },
  }),
  dateOfLegalSeparationOrDivorce: {
    ...currentOrPastDateUI({
      title: 'Date of legal separation or divorce',
      required: () => false,
      hint:
        'Enter the date of your legal separation or divorce if applicable',
    }),
    'ui:options': {
      expandUnder: 'maritalStatus',
      expandUnderCondition: DIVORCED_STATUS,
      hideIf: formData => formData.maritalStatus !== DIVORCED_STATUS,
    },
  },
  dateOfSpouseDeath: {
    ...currentOrPastDateUI({
      title: "Date of your spouse's death",
      required: () => false,
      hint: "Enter the date of your spouse's death if applicable",
    }),
    'ui:options': {
      expandUnder: 'maritalStatus',
      expandUnderCondition: DIVORCED_STATUS,
      hideIf: formData => formData.maritalStatus !== DIVORCED_STATUS,
    },
  },
};

export const spouseInformationSchema = {
  type: 'object',
  required: ['spouseFullName', 'spouseSsn', 'spouseDateOfBirth', 'dateOfMarriage'],
  properties: {
    spouseFullName: {
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: { ...textSchema, minLength: 1, maxLength: 35 },
        middle: { type: 'string', maxLength: 1 },
        last: { ...textSchema, minLength: 1, maxLength: 35 },
      },
    },
    spouseSsn: ssnSchema,
    spouseDateOfBirth: currentOrPastDateSchema,
    dateOfMarriage: currentOrPastDateSchema,
    dateOfLegalSeparationOrDivorce: currentOrPastDateSchema,
    dateOfSpouseDeath: currentOrPastDateSchema,
  },
};