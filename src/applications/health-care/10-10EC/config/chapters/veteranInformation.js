import {
  textUI,
  textSchema,
  ssnUI,
  ssnSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranInformationUiSchema = {
  veteranFullName: {
    first: textUI({
      title: 'First name',
      required: () => true,
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name',
      },
    }),
    middle: textUI({
      title: 'Middle initial',
      required: () => false,
      autocomplete: 'additional-name',
    }),
    last: textUI({
      title: 'Last name',
      required: () => true,
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name',
      },
    }),
  },
  veteranSsn: ssnUI(),
};

export const veteranInformationSchema = {
  type: 'object',
  required: ['veteranFullName', 'veteranSsn'],
  properties: {
    veteranFullName: {
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: {
          ...textSchema,
          minLength: 1,
          maxLength: 35,
        },
        middle: {
          type: 'string',
          maxLength: 1,
        },
        last: {
          ...textSchema,
          minLength: 1,
          maxLength: 35,
        },
      },
    },
    veteranSsn: ssnSchema,
  },
};