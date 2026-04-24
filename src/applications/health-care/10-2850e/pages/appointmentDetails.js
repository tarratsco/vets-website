import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
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
      title: 'VA facility station ID',
      hint: 'Enter the VA facility station ID for the VA Medical Center where you are applying (for example: 636 for Jesse Brown VAMC). Contact the VAMC HR office if you do not know the station ID.',
      errorMessages: {
        required: 'Please enter the VA facility station ID.',
      },
    }),
    facilityName: textUI({
      title: 'VA Medical Center or facility name',
      hint: 'Enter the full name of the VA Medical Center or facility where you are applying.',
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
      labels: APPOINTMENT_TYPE_LABELS,
      errorMessages: { required: 'Please select an appointment type.' },
    }),
    requestedStartDate: currentOrPastDateUI({
      title: 'Requested start date',
      hint: 'Enter the date you are requesting to begin this position, if known.',
    }),
    priorVaFacility: {
      ...textUI({
        title: 'Name of the VA facility where you most recently held clinical privileges',
        'ui:options': {
          hideIf: formData => formData?.applicationType !== 'transfer',
        },
      }),
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
        positionTitle: { type: 'string', minLength: 1, maxLength: 200 },
        department: { type: 'string', maxLength: 200 },
        appointmentType: radioSchema(Object.keys(APPOINTMENT_TYPE_LABELS)),
        requestedStartDate: currentOrPastDateSchema,
        priorVaFacility: { type: 'string', maxLength: 200 },
      },
    },
  },
};