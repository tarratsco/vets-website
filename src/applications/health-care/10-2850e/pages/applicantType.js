import {
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const applicantTypeUiSchema = {
  applicationType: radioUI({
    title: 'What type of application are you submitting?',
    hint:
      'Select the option that best describes why you are submitting this application.',
    labels: {
      initial: 'Initial appointment (first-time VA clinical appointment)',
      reappointment: 'Reappointment / Recredentialing',
      transfer: 'Transfer credentialing (transferring to a different VA facility)',
      temporary: 'Temporary or fee-basis appointment',
    },
    errorMessages: {
      required: 'Please select an application type.',
    },
  }),
  occupationalCategory: selectUI({
    title: 'What is your primary professional occupation?',
    hint: 'Select the occupation that most closely describes your clinical role.',
    errorMessages: {
      required: 'Please select an occupational category.',
    },
  }),
};

export const applicantTypeSchema = {
  type: 'object',
  required: ['applicationType', 'occupationalCategory'],
  properties: {
    applicationType: radioSchema(['initial', 'reappointment', 'transfer', 'temporary']),
    occupationalCategory: {
      ...selectSchema([
        'Registered Nurse (RN)',
        'Advanced Practice Registered Nurse (APRN)',
        'Certified Registered Nurse Anesthetist (CRNA)',
        'Nurse Practitioner (NP)',
        'Clinical Nurse Specialist (CNS)',
        'Physician (MD/DO)',
        'Dentist',
        'Optometrist',
        'Podiatrist',
        'Pharmacist',
        'Physical Therapist',
        'Occupational Therapist',
        'Speech-Language Pathologist',
        'Psychologist',
        'Social Worker',
        'Other',
      ]),
    },
  },
};