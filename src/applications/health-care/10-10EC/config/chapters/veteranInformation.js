import {
  fullNameNoSuffixUI,
  fullNameNoSuffixSchema,
  ssnUI,
  ssnSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranInformationUiSchema = {
  veteranFullName: {
    ...fullNameNoSuffixUI(title => `Veteran's ${title}`),
  },
  veteranSocialSecurityNumber: ssnUI(),
};

export const veteranInformationSchema = {
  type: 'object',
  required: ['veteranFullName', 'veteranSocialSecurityNumber'],
  properties: {
    veteranFullName: fullNameNoSuffixSchema,
    veteranSocialSecurityNumber: ssnSchema,
  },
};