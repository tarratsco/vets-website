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

const DEA_APPLICABLE_LABELS = {
  'yes-current': 'Yes, I currently hold an active DEA registration',
  'yes-required':
    'DEA registration is required for this position but I have not yet applied',
  'no-not-applicable':
    'No, DEA registration is not applicable to my clinical role',
};

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
        'Do you hold a DEA registration, or is a DEA registration required for the position for which you are applying?',
      hint:
        'A DEA registration is required if you will prescribe, administer, or dispense controlled substances in your clinical role.',
      labels: DEA_APPLICABLE_LABELS,
      errorMessages: {
        required: 'Please select a DEA registration option.',
      },
    }),
    deaNumber: textUI({
      title: 'DEA registration number',
      hint: 'Enter your DEA number as it appears on your certificate. Example: AB1234567',
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
      errorMessages: {
        required: 'Please enter your DEA registration number.',
        pattern:
          'Please enter a valid DEA number (2 letters followed by 7 digits).',
      },
    }),
    authorizedSchedules: {
      ...checkboxGroupUI({
        title:
          'Which schedules are authorized under your DEA registration?',
        hint: 'Check all schedules listed on your current DEA certificate.',
        required: false,
        labels: SCHEDULE_LABELS,
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaIssueDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration issue date',
        errorMessages: {
          required: 'Please enter your DEA issue date.',
          futureDate: 'DEA issue date cannot be in the future.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaExpirationDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration expiration date',
        errorMessages: {
          required: 'Please enter your DEA expiration date.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaState: {
      ...textUI({
        title: 'State in which your DEA registration is valid',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
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
        deaApplicable: radioSchema(Object.keys(DEA_APPLICABLE_LABELS)),
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