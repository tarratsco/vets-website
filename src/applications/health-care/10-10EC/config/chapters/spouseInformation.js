import {
  fullNameNoSuffixUI,
  fullNameNoSuffixSchema,
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { MARRIED_STATUSES } from './maritalStatus';

const isDivorcedSeparatedWidowed = formData =>
  formData.maritalStatus === 'divorced_separated_widowed_this_year';

export const spouseInformationUiSchema = {
  spouseFullName: {
    ...fullNameNoSuffixUI(title => `Spouse's ${title}`),
  },
  spouseSocialSecurityNumber: ssnUI({
    title: "Spouse's Social Security number",
    hint: 'XXX-XX-XXXX',
    errorMessages: {
      required: "Please enter your spouse's 9-digit Social Security number",
    },
  }),
  spouseDateOfBirth: currentOrPastDateUI({
    title: "Spouse's date of birth",
    required: () => true,
  }),
  dateOfMarriage: currentOrPastDateUI({
    title: 'Date of marriage',
    hint: 'Enter the date you were married',
    required: formData => MARRIED_STATUSES.includes(formData.maritalStatus),
  }),
  dateOfLegalSeparationOrDivorce: currentOrPastDateUI({
    title: 'Date of legal separation or divorce',
    hint: 'Enter the date of your legal separation or divorce if applicable',
    required: () => false,
    hideIf: formData => !isDivorcedSeparatedWidowed(formData),
  }),
  dateOfSpouseDeath: currentOrPastDateUI({
    title: "Date of your spouse's death",
    hint: 'Enter the date of your spouse\'s death if applicable',
    required: () => false,
    hideIf: formData => !isDivorcedSeparatedWidowed(formData),
  }),
};

export const spouseInformationSchema = {
  type: 'object',
  properties: {
    spouseFullName: fullNameNoSuffixSchema,
    spouseSocialSecurityNumber: ssnSchema,
    spouseDateOfBirth: currentOrPastDateSchema,
    dateOfMarriage: currentOrPastDateSchema,
    dateOfLegalSeparationOrDivorce: currentOrPastDateSchema,
    dateOfSpouseDeath: currentOrPastDateSchema,
  },
};