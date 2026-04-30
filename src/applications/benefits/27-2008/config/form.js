import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import { burialFlagTransform } from './transform';

import {
  applicantTypeUiSchema,
  applicantTypeSchema,
} from './chapters/applicantType';

import {
  veteranNameUiSchema,
  veteranNameSchema,
} from './chapters/veteranName';

import {
  veteranIdentificationUiSchema,
  veteranIdentificationSchema,
} from './chapters/veteranIdentification';

import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './chapters/serviceInformation';

import {
  veteranDatesUiSchema,
  veteranDatesSchema,
} from './chapters/veteranDates';

import {
  burialPlaceUiSchema,
  burialPlaceSchema,
} from './chapters/burialPlace';

import {
  documentationCheckUiSchema,
  documentationCheckSchema,
} from './chapters/documentationCheck';

import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './chapters/dischargeCharacter';

import {
  reserveGuardCheckUiSchema,
  reserveGuardCheckSchema,
} from './chapters/reserveGuardCheck';

import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './chapters/flagRecipientInfo';

import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './chapters/flagRecipientAddress';

import {
  applicantInfoUiSchema,
  applicantInfoSchema,
} from './chapters/applicantInfo';

import {
  documentUploadUiSchema,
  documentUploadSchema,
} from './chapters/documentUpload';

import {
  remarksUiSchema,
  remarksSchema,
} from './chapters/remarks';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/burial_flag_applications`,
  transformForSubmit: burialFlagTransform,
  trackingPrefix: 'burial-flag-27-2008-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  formId: '27-2008',
  saveInProgress: {
    messages: {
      inProgress: 'Your burial flag application is in progress.',
      expired:
        'Your saved burial flag application has expired. Please start over.',
      saved: 'Your burial flag application has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for a burial flag.',
    noAuth:
      'Please sign in again to continue your burial flag application.',
  },
  title: 'Apply for a burial flag',
  subTitle: 'VA Form 27-2008',
  defaultDefinitions: {},
  chapters: {
    applicantTypeChapter: {
      title: 'Who is submitting',
      pages: {
        applicantType: {
          path: 'applicant-type',
          title: 'Who is submitting this application',
          uiSchema: applicantTypeUiSchema,
          schema: applicantTypeSchema,
        },
      },
    },
    veteranInformationChapter: {
      title: "Veteran's information",
      pages: {
        veteranName: {
          path: 'veteran-information/name',
          title: "Veteran's name",
          uiSchema: veteranNameUiSchema,
          schema: veteranNameSchema,
        },
        veteranIdentification: {
          path: 'veteran-information/identification',
          title: "Veteran's identification",
          uiSchema: veteranIdentificationUiSchema,
          schema: veteranIdentificationSchema,
        },
        veteranDates: {
          path: 'veteran-information/dates',
          title: 'Dates of birth, death, and burial',
          uiSchema: veteranDatesUiSchema,
          schema: veteranDatesSchema,
        },
        burialPlace: {
          path: 'veteran-information/burial-place',
          title: 'Place of burial',
          uiSchema: burialPlaceUiSchema,
          schema: burialPlaceSchema,
        },
      },
    },
    serviceInformationChapter: {
      title: 'Military service',
      pages: {
        serviceInformation: {
          path: 'veteran-information/service',
          title: "Veteran's service information",
          uiSchema: serviceInformationUiSchema,
          schema: serviceInformationSchema,
        },
      },
    },
    eligibilityChapter: {
      title: 'Eligibility',
      pages: {
        documentationCheck: {
          path: 'eligibility/documentation-check',
          title: 'Documentation check',
          uiSchema: documentationCheckUiSchema,
          schema: documentationCheckSchema,
        },
        dischargeCharacter: {
          path: 'eligibility/discharge-character',
          title: 'Discharge character',
          uiSchema: dischargeCharacterUiSchema,
          schema: dischargeCharacterSchema,
        },
        reserveGuardCheck: {
          path: 'eligibility/reserve-guard-check',
          title: 'Selected Reserve eligibility',
          depends: formData =>
            Array.isArray(formData?.serviceInformation?.branchOfService) &&
            formData.serviceInformation.branchOfService.includes(
              'selectedReserve',
            ),
          uiSchema: reserveGuardCheckUiSchema,
          schema: reserveGuardCheckSchema,
        },
      },
    },
    flagRecipientChapter: {
      title: 'Flag recipient',
      pages: {
        flagRecipientInfo: {
          path: 'flag-recipient/recipient-info',
          title: 'Flag recipient information',
          uiSchema: flagRecipientInfoUiSchema,
          schema: flagRecipientInfoSchema,
        },
        flagRecipientAddress: {
          path: 'flag-recipient/recipient-address',
          title: 'Flag recipient address',
          uiSchema: flagRecipientAddressUiSchema,
          schema: flagRecipientAddressSchema,
        },
      },
    },
    applicantChapter: {
      title: 'Your information',
      pages: {
        applicantInfo: {
          path: 'applicant/applicant-info',
          title: 'Your information',
          uiSchema: applicantInfoUiSchema,
          schema: applicantInfoSchema,
        },
      },
    },
    documentsChapter: {
      title: 'Supporting documents',
      pages: {
        documentUpload: {
          path: 'documents/upload',
          title: 'Upload discharge documentation',
          uiSchema: documentUploadUiSchema,
          schema: documentUploadSchema,
        },
      },
    },
    remarksChapter: {
      title: 'Remarks',
      pages: {
        remarks: {
          path: 'remarks',
          title: 'Remarks',
          uiSchema: remarksUiSchema,
          schema: remarksSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };