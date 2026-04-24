import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const APPOINTMENT_TYPE_LABELS = {
  'full-time-permanent': 'Full-time permanent',
  'part-time-permanent': 'Part-time permanent',
  'temporary-full-time': 'Temporary full-time',
  'fee-basis': 'Fee-basis / intermittent',
  'without-compensation': 'Without compensation (WOC)',
};

export const appointmentDetailsUiSchema = {
  appointmentDetails: {
    'ui:title': 'Appointment details',
    facilityId: textUI({
      title: 'VA facility station ID where you are applying',
      hint:
        'Enter the VA facility station ID or select from the list. Contact the VAMC HR office if you are unsure of the station ID.',
      errorMessages: {
        required: 'Please enter the VA facility station ID.',
      },
    }),
    facilityName: textUI({
      title: 'VA Medical Center or facility name',
      hint: 'For example: Jesse Brown VA Medical Center',
    }),
    positionTitle: textUI({
      title: 'Position or job title for this application',
      hint:
        'For example: Certified Registered Nurse Anesthetist, Staff Nurse Practitioner',
      errorMessages: { required: 'Please enter the position title.' },
    }),
    department: textUI({
      title: 'Department or service line (if known)',
      hint: 'For example: Anesthesiology Service, Primary Care',
    }),
    appointmentType: radioUI({
      title: 'Type of appointment you are seeking',
      labels: APPOINTMENT_TYPE_LABELS,
      errorMessages: { required: 'Please select an appointment type.' },
    }),
    requestedStartDate: currentOrPastDateUI({
      title: 'Requested start date (if known)',
      hint: 'This is your preferred start date, not a guaranteed date.',
    }),
    priorVaFacility: {
      ...textUI({
        title: 'Name of the VA facility where you most recently held clinical privileges',
        hint: 'Required only if you are applying for a transfer.',
        errorMessages: {
          required: 'Please enter your prior VA facility name.',
        },
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
      required: ['facilityId', 'positionTitle', 'appointmentType'],
      properties: {
        facilityId: { type: 'string', maxLength: 20 },
        facilityName: { type: 'string', maxLength: 200 },
        positionTitle: { type: 'string', maxLength: 200 },
        department: { type: 'string', maxLength: 200 },
        appointmentType: radioSchema(Object.keys(APPOINTMENT_TYPE_LABELS)),
        requestedStartDate: currentOrPastDateSchema,
        priorVaFacility: { type: 'string', maxLength: 200 },
      },
    },
  },
};