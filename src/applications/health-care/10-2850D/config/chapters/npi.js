import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const npiUiSchema = {
  licensesAndCredentials: {
    'ui:title': 'National Provider Identifier',
    npi: textUI({
      title: 'National Provider Identifier (NPI) (optional)',
      hint:
        'Your NPI is a 10-digit identification number issued by the Centers for Medicare & Medicaid Services (CMS). If you have an NPI, enter it here. Not all trainees are required to have an NPI.',
      inputType: 'text',
      errorMessages: {
        pattern: 'NPI must be exactly 10 digits.',
      },
    }),
  },
};

export const npiSchema = {
  type: 'object',
  properties: {
    licensesAndCredentials: {
      type: 'object',
      properties: {
        npi: {
          type: 'string',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
      },
    },
  },
};