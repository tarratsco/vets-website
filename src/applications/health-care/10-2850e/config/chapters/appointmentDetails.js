import {
  appointmentDetailsUiSchema,
  appointmentDetailsSchema,
} from '../../pages/appointmentDetails';

export default {
  title: 'Appointment Details',
  pages: {
    appointmentDetails: {
      path: 'facility-information',
      title: 'Facility and appointment information',
      uiSchema: appointmentDetailsUiSchema,
      schema: appointmentDetailsSchema,
    },
  },
};