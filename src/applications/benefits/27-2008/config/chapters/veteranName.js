import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranNameUiSchema = {
  veteranInformation: {
    'ui:title': "Veteran's name",
    'ui:description':
      "Enter the name exactly as it appears on the Veteran's discharge documents.",
    firstName: textUI({
      title: "Veteran's first name",
      errorMessages: { required: "Please enter the Veteran's first name." },
    }),
    middleName: textUI({
      title: "Veteran's middle name (optional)",
    }),
    lastName: textUI({
      title: "Veteran's last name",
      errorMessages: { required: "Please enter the Veteran's last name." },
    }),
    maidenOrOtherName: textUI({
      title:
        'Maiden name or other name the Veteran used while on active duty (optional)',
      hint:
        "Include any name the Veteran used during military service that differs from their legal name at death. This helps VA match service records.",
    }),
  },
};

export const veteranNameSchema = {
  type: 'object',
  required: ['veteranInformation'],
  properties: {
    veteranInformation: {
      type: 'object',
      required: ['firstName', 'lastName'],
      properties: {
        firstName: { type: 'string', minLength: 1, maxLength: 30 },
        middleName: { type: 'string', maxLength: 30 },
        lastName: { type: 'string', minLength: 1, maxLength: 30 },
        maidenOrOtherName: { type: 'string', maxLength: 60 },
      },
    },
  },
};