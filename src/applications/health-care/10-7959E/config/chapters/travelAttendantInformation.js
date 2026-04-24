import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const travelAttendantInformationUiSchema = {
  'travel.attendant': {
    traveled: radioUI({
      title: 'Did an attendant travel with the patient?',
      hint:
        'An attendant is a person who accompanied the patient to the medical appointment. Attendant travel and miscellaneous expenses may be included in your claim.',
      labels: {
        yes: 'Yes',
        no: 'No',
      },
      required: () => true,
      errorMessages: {
        required:
          'Please indicate whether an attendant traveled with the patient.',
      },
    }),
    lastName: {
      ...textUI({
        title: "Attendant's last name",
        errorMessages: {
          required: "Please enter the attendant's last name.",
        },
      }),
      'ui:options': {
        expandUnder: 'travel.attendant.traveled',
        expandUnderCondition: 'yes',
      },
    },
    firstName: {
      ...textUI({
        title: "Attendant's first name",
        errorMessages: {
          required: "Please enter the attendant's first name.",
        },
      }),
      'ui:options': {
        expandUnder: 'travel.attendant.traveled',
        expandUnderCondition: 'yes',
      },
    },
    middleInitial: {
      ...textUI({
        title: "Attendant's middle initial",
      }),
      'ui:options': {
        expandUnder: 'travel.attendant.traveled',
        expandUnderCondition: 'yes',
      },
    },
    relationshipToPatient: {
      ...textUI({
        title: "Attendant's relationship to patient",
        hint: 'For example: parent, sibling, caregiver, spouse.',
        errorMessages: {
          required: "Please enter the attendant's relationship to the patient.",
        },
      }),
      'ui:options': {
        expandUnder: 'travel.attendant.traveled',
        expandUnderCondition: 'yes',
      },
    },
  },
};

export const travelAttendantInformationSchema = {
  type: 'object',
  properties: {
    'travel.attendant': {
      type: 'object',
      required: ['traveled'],
      properties: {
        traveled: radioSchema(['yes', 'no']),
        lastName: { type: 'string', minLength: 1, maxLength: 30 },
        firstName: { type: 'string', minLength: 1, maxLength: 30 },
        middleInitial: { type: 'string', pattern: '^[A-Za-z]$', maxLength: 1 },
        relationshipToPatient: { type: 'string', minLength: 1, maxLength: 30 },
      },
    },
  },
};