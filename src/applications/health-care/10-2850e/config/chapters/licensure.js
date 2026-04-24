import {
  professionalLicensesUiSchema,
  professionalLicensesSchema,
} from '../../pages/professionalLicenses';
import {
  boardCertificationsUiSchema,
  boardCertificationsSchema,
} from '../../pages/boardCertifications';
import {
  deaRegistrationUiSchema,
  deaRegistrationSchema,
} from '../../pages/deaRegistration';

export default {
  title: 'Licensure',
  pages: {
    professionalLicenses: {
      path: 'professional-licenses',
      title: 'Professional licenses',
      uiSchema: professionalLicensesUiSchema,
      schema: professionalLicensesSchema,
    },

    boardCertifications: {
      path: 'board-certifications',
      title: 'Board certifications',
      uiSchema: boardCertificationsUiSchema,
      schema: boardCertificationsSchema,
    },

    deaRegistration: {
      path: 'dea-registration',
      title: 'DEA registration',
      uiSchema: deaRegistrationUiSchema,
      schema: deaRegistrationSchema,
    },
  },
};