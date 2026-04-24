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

const scheduleLabels = {
  II: 'Schedule II',
  III: 'Schedule III',
  IV: 'Schedule IV',
  V: 'Schedule V',
};

export const deaRegistrationUiSchema = {
  deaRegistration: {
    'ui:title': 'DEA Registration',
    deaApplicable: radioUI({
      title:
        'Do you hold a DEA registration, or is a DEA registration required for the position for which you are applying?',
      hint:
        'A DEA registration is required if you will prescribe, administer, or dispense controlled substances in your clinical role.',
      labels: {
        'yes-current': 'Yes, I currently hold an active DEA registration',
        'yes-required':
          'DEA registration is required for this position but I have not yet applied',
        'no-not-applicable':
          'No, DEA registration is not applicable to my clinical role',
      },
      errorMessages: {
        required: 'Please select whether you hold a DEA registration.',
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
            'Please enter a valid DEA number (two uppercase letters followed by 7 digits).',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    authorizedSchedules: {
      ...checkboxGroupUI({
        title: 'Which schedules are authorized under your DEA registration?',
        hint: 'Check all schedules listed on your current DEA certificate.',
        labels: scheduleLabels,
        required: false,
        errorMessages: {
          required: 'Please select at least one authorized schedule.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaIssueDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration issue date',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaExpirationDate: {
      ...currentOrPastDateUI({
        title: 'DEA registration expiration date',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.deaRegistration?.deaApplicable !== 'yes-current',
      },
    },
    deaState: {
      ...textUI({
        title: 'State(s) in which your DEA registration is valid',
        hint: 'Enter all states where your DEA registration is valid.',
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
        deaApplicable: radioSchema(['yes-current', 'yes-required', 'no-not-applicable']),
        deaNumber: {
          type: 'string',
          pattern: '^[A-Z]{2}\\d{7}$',
        },
        authorizedSchedules: checkboxGroupSchema(Object.keys(scheduleLabels)),
        deaIssueDate: currentOrPastDateSchema,
        deaExpirationDate: currentOrPastDateSchema,
        deaState: { type: 'string', maxLength: 200 },
      },
    },
  },
};