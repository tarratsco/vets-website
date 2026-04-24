import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const DEA_SCHEDULE_LABELS = {
  II: 'Schedule II',
  III: 'Schedule III',
  IV: 'Schedule IV',
  V: 'Schedule V',
};
const DEA_SCHEDULE_KEYS = Object.keys(DEA_SCHEDULE_LABELS);

export const deaRegistrationUiSchema = {
  deaRegistration: {
    'ui:title': 'DEA registration',
    deaApplicable: radioUI({
      title:
        'Do you hold a DEA registration, or is a DEA registration required for the position for which you are applying?',
      hint:
        'A DEA registration is required if you will prescribe, administer, or dispense controlled substances in your clinical role. If you are unsure, check with the VA facility where you are applying.',
      labels: {
        'yes-current': 'Yes, I currently hold an active DEA registration',
        'yes-required':
          'DEA registration is required for this position but I have not yet applied',
        'no-not-applicable':
          'No, DEA registration is not applicable to my clinical role',
      },
      errorMessages: {
        required: 'Please indicate your DEA registration status.',
      },
    }),
    deaNumber: {
      ...textUI({
        title: 'DEA registration number',
        hint:
          'Enter your DEA number as it appears on your DEA registration certificate. Example: AB1234567',
        errorMessages: {
          required: 'Please enter your DEA registration number.',
          pattern:
            'Please enter a valid DEA number (two letters followed by 7 digits, e.g., AB1234567).',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
        expandUnder: 'deaApplicable',
      },
    },
    authorizedSchedules: {
      ...checkboxGroupUI({
        title: 'Which schedules are authorized under your DEA registration?',
        hint: 'Check all schedules listed on your current DEA certificate.',
        required: false,
        labels: DEA_SCHEDULE_LABELS,
        errorMessages: {
          required: 'Please select at least one authorized schedule.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
        expandUnder: 'deaApplicable',
      },
    },
    deaIssueDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration issue date',
        errorMessages: {
          required: 'Please enter the DEA registration issue date.',
          futureDate: 'Issue date cannot be in the future.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
        expandUnder: 'deaApplicable',
      },
    },
    deaExpirationDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration expiration date',
        errorMessages: {
          required: 'Please enter the DEA registration expiration date.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
        expandUnder: 'deaApplicable',
      },
    },
    deaState: {
      ...textUI({
        title: 'State(s) in which your DEA registration is valid',
        hint:
          'Enter the state abbreviation(s) listed on your DEA registration certificate.',
        errorMessages: {
          required: 'Please enter the state of your DEA registration.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
        expandUnder: 'deaApplicable',
      },
    },
  },
};

export const deaRegistrationSchema = {
  type: 'object',
  properties: {
    deaRegistration: {
      type: 'object',
      properties: {
        deaApplicable: radioSchema(['yes-current', 'yes-required', 'no-not-applicable']),
        deaNumber: {
          type: 'string',
          pattern: '^[A-Z]{2}\\d{7}$',
        },
        authorizedSchedules: checkboxGroupSchema(DEA_SCHEDULE_KEYS),
        deaIssueDate: currentOrPastDateSchema,
        deaExpirationDate: currentOrPastDateSchema,
        deaState: { type: 'string', maxLength: 100 },
      },
    },
  },
};