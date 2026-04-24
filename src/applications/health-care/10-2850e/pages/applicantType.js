import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const applicantTypeUiSchema = {
  applicationType: radioUI({
    title: 'What type of application are you submitting?',
    hint:
      'Select the option that best describes why you are submitting this application. If you are unsure, contact the VA Medical Center HR office where you are applying.',
    labels: {
      initial: 'Initial appointment (first-time VA clinical appointment)',
      reappointment:
        'Reappointment / Recredentialing (renewing existing VA credentials)',
      transfer:
        'Transfer credentialing (transferring to a different VA facility)',
      temporary: 'Temporary or fee-basis appointment',
    },
    errorMessages: {
      required: 'Please select an application type.',
    },
  }),
  occupationalCategory: textUI({
    title: 'What is your primary professional occupation?',
    hint:
      'Enter the occupation that most closely describes the clinical role for which you are applying (for example, Registered Nurse, Nurse Practitioner, CRNA, Physician, etc.).',
    errorMessages: {
      required: 'Please enter your occupational category.',
    },
  }),
};

export const applicantTypeSchema = {
  type: 'object',
  required: ['applicationType', 'occupationalCategory'],
  properties: {
    applicationType: radioSchema([
      'initial',
      'reappointment',
      'transfer',
      'temporary',
    ]),
    occupationalCategory: {
      type: 'string',
      maxLength: 200,
    },
  },
};