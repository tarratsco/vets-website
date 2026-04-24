import {
  professionalLicenseUiSchema,
  professionalLicenseSchema,
} from '../../pages/professionalLicense';
import {
  boardCertificationUiSchema,
  boardCertificationSchema,
} from '../../pages/boardCertification';
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
      uiSchema: professionalLicenseUiSchema,
      schema: professionalLicenseSchema,
    },

    boardCertifications: {
      path: 'board-certifications',
      title: 'Board certifications',
      uiSchema: boardCertificationUiSchema,
      schema: boardCertificationSchema,
    },
    deaRegistration: {
      path: 'dea-registration',
      title: 'DEA registration',
      uiSchema: deaRegistrationUiSchema,
      schema: deaRegistrationSchema,
    },
  },
};