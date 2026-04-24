import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const appointmentTypeOptions = [
  'full-time-permanent',
  'part-time-permanent',
  'temporary-full-time',
  'fee-basis',
  'without-compensation',
];

export const appointmentDetailsUiSchema = {
  appointmentDetails: {
    'ui:title': 'Appointment Details',
    facilityName: textUI({
      title: 'VA Medical Center or facility where you are applying',
      hint:
        'Enter the name of the specific VA facility where you are applying. If you are applying to multiple facilities, you will need to submit a separate application for each.',
      errorMessages: { required: 'Please enter the facility name.' },
    }),
    facilityId: textUI({
      title: 'VA facility station ID (if known)',
      hint: 'The station ID is a 3-digit number assigned to each VA facility.',
    }),
    positionTitle: textUI({
      title: 'Position or job title for this application',
      errorMessages: { required: 'Please enter the position title.' },
    }),
    department: textUI({
      title: 'Department or service line (if known)',
    }),
    appointmentType: radioUI({
      title: 'Type of appointment you are seeking',
      labels: {
        'full-time-permanent': 'Full-time permanent',
        'part-time-permanent': 'Part-time permanent',
        'temporary-full-time': 'Temporary full-time',
        'fee-basis': 'Fee-basis / intermittent',
        'without-compensation': 'Without compensation (WOC)',
      },
      errorMessages: { required: 'Please select the appointment type.' },
    }),
    requestedStartDate: currentOrPastDateUI({
      title: 'Requested start date (if known)',
      hint: 'Enter your preferred start date if you have one.',
    }),
    priorVaFacility: {
      ...textUI({
        title: 'Name of the VA facility where you most recently held clinical privileges',
        hint: 'Required only if you are applying as a transfer applicant.',
      }),
      'ui:options': {
        hideIf: formData => formData?.applicationType !== 'transfer',
      },
    },
  },
};

export const appointmentDetailsSchema = {
  type: 'object',
  required: ['appointmentDetails'],
  properties: {
    appointmentDetails: {
      type: 'object',
      required: ['facilityName', 'positionTitle', 'appointmentType'],
      properties: {
        facilityId: { type: 'string', maxLength: 20 },
        facilityName: { type: 'string', maxLength: 200 },
        positionTitle: { type: 'string', minLength: 1, maxLength: 200 },
        department: { type: 'string', maxLength: 200 },
        appointmentType: radioSchema(appointmentTypeOptions),
        requestedStartDate: currentOrPastDateSchema,
        priorVaFacility: { type: 'string', maxLength: 200 },
      },
    },
  },
};