import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const PILOT_FACILITIES = [
  '636 — Jesse Brown VA Medical Center',
  '537 — Edward Hines, Jr. VA Hospital',
  '695 — Milwaukee VA Medical Center',
  '695BY — Clement J. Zablocki VA Medical Center',
  '042 — VA Boston Healthcare System',
  '523 — VA NY Harbor Healthcare System',
  '526 — James J. Peters VA Medical Center',
  '460 — Audie L. Murphy Memorial VA Medical Center',
  '671 — South Texas Veterans Health Care System',
  'Other (contact HR office)',
];

export const appointmentDetailsUiSchema = {
  appointmentDetails: {
    'ui:title': 'Appointment details',
    facilityId: selectUI({
      title: 'VA Medical Center or facility where you are applying',
      hint: 'Select the specific VA facility where you are applying. If you are applying to multiple facilities, you will need to submit a separate application for each.',
      errorMessages: {
        required: 'Please select the VA facility where you are applying.',
      },
    }),
    facilityName: textUI({
      title: 'Facility name (if not listed above)',
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
        required: 'Please select the appointment type.',
      },
    }),
    requestedStartDate: {
      ...currentOrPastDateUI({
        title: 'Requested start date',
      }),
      'ui:required': () => false,
    },
    priorVaFacility: {
      ...textUI({
        title: 'Name of the VA facility where you most recently held clinical privileges',
        hint: 'Required only for transfer applicants.',
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
        facilityId: selectSchema(PILOT_FACILITIES),
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