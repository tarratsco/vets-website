import {
  fullNameNoSuffixUI,
  fullNameNoSuffixSchema,
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  titleUI,
  titleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { arrayBuilderPages } from 'platform/forms-system/src/js/web-component-patterns';

export const dependentSummaryUiSchema = {
  'view:dependentTitle': titleUI('Dependent information'),
};

export const dependentSummarySchema = {
  type: 'object',
  properties: {
    'view:dependentTitle': titleSchema,
  },
};

export const dependentInformationUiSchema = {
  dependentFullName: {
    ...fullNameNoSuffixUI(title => `Dependent's ${title}`),
  },
  dependentSocialSecurityNumber: ssnUI({
    title: "Dependent's Social Security number",
    hint: 'XXX-XX-XXXX',
    errorMessages: {
      required: "Please enter this dependent's Social Security number",
    },
  }),
  dependentDateOfBirth: currentOrPastDateUI({
    title: "Dependent's date of birth",
    required: () => true,
  }),
};

export const dependentInformationSchema = {
  type: 'object',
  required: ['dependentFullName', 'dependentSocialSecurityNumber', 'dependentDateOfBirth'],
  properties: {
    dependentFullName: fullNameNoSuffixSchema,
    dependentSocialSecurityNumber: ssnSchema,
    dependentDateOfBirth: currentOrPastDateSchema,
  },
};