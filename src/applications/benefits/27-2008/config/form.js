import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import { currentOrPastDateSchema } from 'platform/forms-system/src/js/web-component-patterns';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import burialFlagTransform from './transform';

import {
  applicantTypeUiSchema,
  applicantTypeSchema,
} from './chapters/applicantTypeChapter';
import {
  veteranNameUiSchema,
  veteranNameSchema,
} from './chapters/veteranNameChapter';
import {
  veteranIdentificationUiSchema,
  veteranIdentificationSchema,
} from './chapters/veteranIdentificationChapter';
import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './chapters/serviceInformationChapter';
import {
  veteranDatesUiSchema,
  veteranDatesSchema,
} from './chapters/veteranDatesChapter';
import {
  burialPlaceUiSchema,
  burialPlaceSchema,
} from './chapters/burialPlaceChapter';
import {
  eligibilityDocumentationUiSchema,
  eligibilityDocumentationSchema,
} from './chapters/eligibilityDocumentationChapter';
import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './chapters/dischargeCharacterChapter';
import {
  reserveGuardUiSchema,
  reserveGuardSchema,
} from './chapters/reserveGuardChapter';
import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './chapters/flagRecipientInfoChapter';
import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './chapters/flagRecipientAddressChapter';
import {
  applicantInfoUiSchema,
  applicantInfoSchema,
} from './chapters/applicantInfoChapter';
import {
  documentsUiSchema,
  documentsSchema,
} from './chapters/documentsChapter';
import {
  remarksUiSchema,
  remarksSchema,
} from './chapters/remarksChapter';

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
      inProgress:
        'Your burial flag application (27-2008) is in progress.',
      expired:
        'Your saved burial flag application (27-2008) has expired. If you want to submit your application, please start a new application.',
      saved: 'Your burial flag application has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound:
      'Please start over to apply for a burial flag.',
    noAuth:
      'Please sign in again to continue your burial flag application.',
  },
  title: 'Apply for a United States burial flag',
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
          title: 'Military service information',
          uiSchema: serviceInformationUiSchema,
          schema: serviceInformationSchema,
        },
      },
    },
    eligibilityChapter: {
      title: 'Eligibility',
      pages: {
        eligibilityDocumentation: {
          path: 'eligibility/documentation-check',
          title: 'Eligibility documentation',
          uiSchema: eligibilityDocumentationUiSchema,
          schema: eligibilityDocumentationSchema,
        },
        dischargeCharacter: {
          path: 'eligibility/discharge-character',
          title: 'Discharge character',
          uiSchema: dischargeCharacterUiSchema,
          schema: dischargeCharacterSchema,
        },
        reserveGuardEligibility: {
          path: 'eligibility/reserve-guard-check',
          title: 'Selected Reserve service criteria',
          depends: formData =>
            Array.isArray(
              formData?.serviceInformation?.branchOfService,
            ) &&
            formData.serviceInformation.branchOfService.includes(
              'selectedReserve',
            ),
          uiSchema: reserveGuardUiSchema,
          schema: reserveGuardSchema,
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
          uiSchema: documentsUiSchema,
          schema: documentsSchema,
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