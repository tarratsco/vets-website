import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

export const sponsorInformationUiSchema = {
  sponsor: {
    'ui:title': 'Sponsor Information (Section II)',
    lastName: textUI({
      title: "Sponsor's last name",
      hint:
        'The sponsor is the qualifying Veteran parent whose service makes the patient eligible for this program.',
      autocomplete: 'family-name',
      errorMessages: {
        required: "Please enter the sponsor's last name.",
      },
    }),
    firstName: textUI({
      title: "Sponsor's first name",
      autocomplete: 'given-name',
      errorMessages: {
        required: "Please enter the sponsor's first name.",
      },
    }),
    middleInitial: textUI({
      title: "Sponsor's middle initial",
    }),
    ssn: {
      'ui:title': "Sponsor's Social Security number",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          "Format: 999-99-9999. The sponsor's SSN is required to verify program eligibility.",
        inputmode: 'numeric',
        dataDogHidden: true,
      },
      'ui:errorMessages': {
        required: "Please enter the sponsor's Social Security number.",
        pattern:
          'Please enter a 9-digit Social Security number in the format 999-99-9999.',
      },
    },
  },
};

export const sponsorInformationSchema = {
  type: 'object',
  required: ['sponsor'],
  properties: {
    sponsor: {
      type: 'object',
      required: ['firstName', 'lastName', 'ssn'],
      properties: {
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        middleInitial: {
          type: 'string',
          pattern: '^[A-Za-z]$',
          maxLength: 1,
        },
        ssn: {
          type: 'string',
          pattern: '^\\d{3}-\\d{2}-\\d{4}$',
          minLength: 11,
          maxLength: 11,
        },
      },
    },
  },
};