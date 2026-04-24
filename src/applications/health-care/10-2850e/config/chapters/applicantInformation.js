import {
  applicantTypeUiSchema,
  applicantTypeSchema,
} from '../../pages/applicantType';
import {
  personalInformationUiSchema,
  personalInformationSchema,
} from '../../pages/personalInformation';
import {
  contactInformationUiSchema,
  contactInformationSchema,
} from '../../pages/contactInformation';
import {
  citizenshipStatusUiSchema,
  citizenshipStatusSchema,
} from '../../pages/citizenshipStatus';
import {
  veteranStatusUiSchema,
  veteranStatusSchema,
} from '../../pages/veteranStatus';

export default {
  title: 'Applicant Information',
  pages: {
    applicantType: {
      path: 'applicant-type',
      title: 'Application type',
      uiSchema: applicantTypeUiSchema,
      schema: applicantTypeSchema,
    },

    personalInformation: {
      path: 'personal-information',
      title: 'Personal information',
      uiSchema: personalInformationUiSchema,
      schema: personalInformationSchema,
    },

    contactInformation: {
      path: 'contact-information',
      title: 'Contact information',
      uiSchema: contactInformationUiSchema,
      schema: contactInformationSchema,
    },

    citizenshipStatus: {
      path: 'citizenship-status',
      title: 'Citizenship status',
      uiSchema: citizenshipStatusUiSchema,
      schema: citizenshipStatusSchema,
    },

    veteranStatus: {
      path: 'veteran-status',
      title: 'Veteran status',
      uiSchema: veteranStatusUiSchema,
      schema: veteranStatusSchema,
    },
  },
};