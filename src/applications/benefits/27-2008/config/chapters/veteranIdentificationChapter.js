import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranIdentificationUiSchema = {
  veteranInformation: {
    'ui:title': "Veteran's identification numbers",
    vaFileNumber: textUI({
      title: 'VA file number (optional)',
      hint:
        'The VA file number is an 8- or 9-digit number found on previous VA correspondence. It is different from the Veteran\'s Social Security Number.',
      inputType: 'text',
      errorMessages: {
        pattern: 'Please enter a valid VA file number (7\u20139 digits).',
      },
    }),
    socialSecurityNumber: textUI({
      title: "Veteran's Social Security Number (optional)",
      hint:
        "Providing the SSN helps VA locate the Veteran's records more quickly. Per the Privacy Act notice on this form, providing the SSN is voluntary and refusal will not by itself result in denial of benefits.",
      inputType: 'text',
      autocomplete: 'off',
      errorMessages: {
        pattern: 'Please enter a valid 9-digit Social Security Number.',
      },
    }),
    militaryServiceNumber: textUI({
      title: 'Military service number or serial number (optional)',
      hint:
        'Used for Veterans who served before Social Security Numbers were used as military identifiers (generally before July 1, 1969). Found on older discharge documents.',
    }),
  },
};

export const veteranIdentificationSchema = {
  type: 'object',
  properties: {
    veteranInformation: {
      type: 'object',
      properties: {
        vaFileNumber: {
          type: 'string',
          pattern: '^[0-9]{7,9}$',
        },
        socialSecurityNumber: {
          type: 'string',
          pattern: '^[0-9]{9}$',
          minLength: 9,
          maxLength: 9,
        },
        militaryServiceNumber: {
          type: 'string',
          maxLength: 20,
        },
      },
    },
  },
};