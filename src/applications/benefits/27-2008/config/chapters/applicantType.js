import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const applicantTypeUiSchema = {
  applicantType: radioUI({
    title: 'Who is submitting this application?',
    hint:
      'Select the option that best describes your role. Funeral directors and authorized representatives may submit without a VA.gov account.',
    labels: {
      nextOfKin:
        'I am the next-of-kin (surviving spouse, child, parent, sibling, or other relative)',
      funeralDirector:
        'I am a funeral director or funeral home representative',
      vsoRepresentative:
        'I am a Veterans Service Organization (VSO) representative or other authorized representative',
      closeFriend:
        'I am a close friend of the Veteran with no living next-of-kin available',
    },
    errorMessages: {
      required: 'Please select who is submitting this application.',
    },
  }),
};

export const applicantTypeSchema = {
  type: 'object',
  required: ['applicantType'],
  properties: {
    applicantType: radioSchema([
      'nextOfKin',
      'funeralDirector',
      'vsoRepresentative',
      'closeFriend',
    ]),
  },
};