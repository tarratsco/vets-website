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

export const appointmentDetailsUiSchema = {
  appointmentDetails: {
    'ui:title': 'Appointment details',
    facilityId: textUI({
      title: 'VA Medical Center facility ID',
      hint:
        'Enter the VA facility station ID where you are applying (e.g., 636 for Jesse Brown VAMC). Contact the facility HR office if you do not know the station ID.',
      errorMessages: {
        required: 'Please enter the facility station ID.',
      },
    }),
    facilityName: textUI({
      title: 'VA Medical Center name',
      hint: 'Enter the full name of the VA Medical Center where you are applying.',
    }),
    positionTitle: textUI({
      title: 'Position or job title for this application',
      errorMessages: {
        required: 'Please enter the position title.',
      },
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
      errorMessages: {
        required: 'Please select an appointment type.',
      },
    }),
    requestedStartDate: currentOrPastDateUI({
      title: 'Requested start date',
      hint: 'Enter the date you would like to begin, if known.',
    }),
    priorVaFacility: textUI({
      title: 'Name of the VA facility where you most recently held clinical privileges',
      hint: 'Required only for transfer applicants.',
      'ui:options': {
        hideIf: formData => formData?.applicationType !== 'transfer',
      },
    }),
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
        positionTitle: { type: 'string', maxLength: 200, minLength: 1 },
        department: { type: 'string', maxLength: 200 },
        appointmentType: radioSchema([
          'full-time-permanent',
          'part-time-permanent',
          'temporary-full-time',
          'fee-basis',
          'without-compensation',
        ]),
        requestedStartDate: currentOrPastDateSchema,
        priorVaFacility: { type: 'string', maxLength: 200 },
      },
    },
  },
};