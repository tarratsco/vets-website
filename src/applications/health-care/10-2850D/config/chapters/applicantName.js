import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const applicantNameUiSchema = {
  applicantInformation: {
    'ui:title': 'Name',
    lastName: textUI({
      title: 'Last name',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Enter your last name.',
      },
    }),
    firstName: textUI({
      title: 'First name',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Enter your first name.',
      },
    }),
    middleName: textUI({
      title: 'Middle name (optional)',
      hint: 'If you do not have a middle name, leave this field blank.',
      autocomplete: 'additional-name',
    }),
    otherNamesUsed: textUI({
      title: 'Other names used (optional)',
      hint:
        'Include maiden names, former legal names, aliases, or names used in professional licenses.',
    }),
  },
};

export const applicantNameSchema = {
  type: 'object',
  properties: {
    applicantInformation: {
      type: 'object',
      required: ['lastName', 'firstName'],
      properties: {
        lastName: { type: 'string', minLength: 1, maxLength: 100 },
        firstName: { type: 'string', minLength: 1, maxLength: 100 },
        middleName: { type: 'string', maxLength: 50 },
        otherNamesUsed: { type: 'string', maxLength: 200 },
      },
    },
  },
};