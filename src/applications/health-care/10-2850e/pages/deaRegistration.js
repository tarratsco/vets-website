import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const SCHEDULE_LABELS = {
  II: 'Schedule II',
  III: 'Schedule III',
  IV: 'Schedule IV',
  V: 'Schedule V',
};
const SCHEDULE_KEYS = Object.keys(SCHEDULE_LABELS);

export const deaRegistrationUiSchema = {
  deaRegistration: {
    'ui:title': 'DEA registration',
    deaApplicable: radioUI({
      title:
        'Do you hold a DEA registration, or is a DEA registration required for the position you are applying for?',
      hint:
        'A DEA registration is required if you will prescribe, administer, or dispense controlled substances.',
      labels: {
        'yes-current': 'Yes, I currently hold an active DEA registration',
        'yes-required':
          'DEA registration is required for this position but I have not yet applied',
        'no-not-applicable':
          'No, DEA registration is not applicable to my clinical role',
      },
      errorMessages: {
        required: 'Please select a DEA registration option.',
      },
    }),
    deaNumber: {
      ...textUI({
        title: 'DEA registration number',
        hint: 'Enter your DEA number as it appears on your certificate. Example: AB1234567',
        errorMessages: {
          required: 'Please enter your DEA registration number.',
          pattern: 'Please enter a valid DEA number (two letters followed by 7 digits).',
        },
      }),
      'ui:options': {
        hideIf: formData => formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    authorizedSchedules: {
      ...checkboxGroupUI({
        title: 'Which schedules are authorized under your DEA registration?',
        hint: 'Check all schedules listed on your current DEA certificate.',
        required: false,
        labels: SCHEDULE_LABELS,
      }),
      'ui:options': {
        hideIf: formData => formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaIssueDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration issue date',
        errorMessages: {
          required: 'Please enter your DEA registration issue date.',
        },
      }),
      'ui:options': {
        hideIf: formData => formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaExpirationDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration expiration date',
      }),
      'ui:options': {
        hideIf: formData => formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaState: {
      ...textUI({
        title: 'State(s) in which your DEA registration is valid',
        errorMessages: {
          required: 'Please enter the state(s) of your DEA registration.',
        },
      }),
      'ui:options': {
        hideIf: formData => formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
  },
};

export const deaRegistrationSchema = {
  type: 'object',
  required: ['deaRegistration'],
  properties: {
    deaRegistration: {
      type: 'object',
      required: ['deaApplicable'],
      properties: {
        deaApplicable: radioSchema(['yes-current', 'yes-required', 'no-not-applicable']),
        deaNumber: {
          type: 'string',
          pattern: '^[A-Z]{2}\\d{7}$',
        },
        authorizedSchedules: checkboxGroupSchema(SCHEDULE_KEYS),
        deaIssueDate: currentOrPastDateSchema,
        deaExpirationDate: currentOrPastDateSchema,
        deaState: { type: 'string', maxLength: 100 },
      },
    },
  },
};