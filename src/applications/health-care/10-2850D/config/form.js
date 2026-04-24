import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  applicantNameUiSchema,
  applicantNameSchema,
} from './chapters/applicantName';
import {
  applicantAddressUiSchema,
  applicantAddressSchema,
} from './chapters/applicantAddress';
import {
  applicantContactUiSchema,
  applicantContactSchema,
} from './chapters/applicantContact';
import {
  applicantIdentifiersUiSchema,
  applicantIdentifiersSchema,
} from './chapters/applicantIdentifiers';
import {
  vaTrainingUiSchema,
  vaTrainingSchema,
} from './chapters/vaTraining';
import {
  militaryStatusUiSchema,
  militaryStatusSchema,
} from './chapters/militaryStatus';
import {
  citizenshipStatusUiSchema,
  citizenshipStatusSchema,
} from './chapters/citizenshipStatus';
import {
  visaImmigrantUiSchema,
  visaImmigrantSchema,
} from './chapters/visaImmigrant';
import {
  visaExchangeVisitorUiSchema,
  visaExchangeVisitorSchema,
} from './chapters/visaExchangeVisitor';
import {
  visaOtherNonimmigrantUiSchema,
  visaOtherNonimmigrantSchema,
} from './chapters/visaOtherNonimmigrant';
import {
  ds2019UiSchema,
  ds2019Schema,
} from './chapters/ds2019';
import {
  currentLicensesUiSchema,
  currentLicensesSchema,
} from './chapters/currentLicenses';
import {
  priorLicensesUiSchema,
  priorLicensesSchema,
} from './chapters/priorLicenses';
import {
  npiUiSchema,
  npiSchema,
} from './chapters/npi';
import {
  adverseHistoryUiSchema,
  adverseHistorySchema,
} from './chapters/adverseHistory';
import {
  adverseLicenseExplanationUiSchema,
  adverseLicenseExplanationSchema,
} from './chapters/adverseLicenseExplanation';
import {
  educationHistoryUiSchema,
  educationHistorySchema,
} from './chapters/educationHistory';
import {
  internationalMedicalSchoolUiSchema,
  internationalMedicalSchoolSchema,
} from './chapters/internationalMedicalSchool';
import {
  trainingHistoryUiSchema,
  trainingHistorySchema,
} from './chapters/trainingHistory';
import {
  fraudQuestionUiSchema,
  fraudQuestionSchema,
} from './chapters/fraudQuestion';
import {
  malpracticeQuestionUiSchema,
  malpracticeQuestionSchema,
} from './chapters/malpracticeQuestion';
import {
  adverseAdditionalExplanationUiSchema,
  adverseAdditionalExplanationSchema,
} from './chapters/adverseAdditionalExplanation';
import {
  remarksUiSchema,
  remarksSchema,
} from './chapters/remarks';
import {
  certificationUiSchema,
  certificationSchema,
} from './chapters/certification';
import {
  authorizationUiSchema,
  authorizationSchema,
} from './chapters/authorization';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/form10_2850d`,
  trackingPrefix: '10-2850D-health-professions-trainee-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  formId: '10-2850D',
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your Health Professions Trainee Data Collection Form (10-2850D) is in progress.',
      expired:
        'Your saved Health Professions Trainee Data Collection Form (10-2850D) has expired. Please start a new application.',
      saved:
        'Your Health Professions Trainee Data Collection Form (10-2850D) has been saved.',
    },
  },
  version: 0,
  prefillEnabled: false,
  savedFormMessages: {
    notFound: 'Please start over to submit your Health Professions Trainee Data Collection Form.',
    noAuth: 'Please sign in again to continue your Health Professions Trainee Data Collection Form.',
  },
  title: 'Health Professions Trainee Data Collection Form',
  subTitle: 'VA Form 10-2850D',
  defaultDefinitions: {},
  chapters: {
    applicantInformationChapter: {
      title: 'Applicant information',
      pages: {
        applicantName: {
          path: 'applicant-information/name',
          title: 'Name',
          uiSchema: applicantNameUiSchema,
          schema: applicantNameSchema,
        },
        applicantAddress: {
          path: 'applicant-information/address',
          title: 'Present address',
          uiSchema: applicantAddressUiSchema,
          schema: applicantAddressSchema,
        },
        applicantContact: {
          path: 'applicant-information/contact',
          title: 'Contact information',
          uiSchema: applicantContactUiSchema,
          schema: applicantContactSchema,
        },
        applicantIdentifiers: {
          path: 'applicant-information/identifiers',
          title: 'Social Security number and date of birth',
          uiSchema: applicantIdentifiersUiSchema,
          schema: applicantIdentifiersSchema,
        },
        vaTraining: {
          path: 'applicant-information/va-training',
          title: 'VA training information',
          uiSchema: vaTrainingUiSchema,
          schema: vaTrainingSchema,
        },
      },
    },
    militaryStatusChapter: {
      title: 'Military duty status',
      pages: {
        militaryStatus: {
          path: 'military-status',
          title: 'Military duty status',
          uiSchema: militaryStatusUiSchema,
          schema: militaryStatusSchema,
        },
      },
    },
    citizenshipChapter: {
      title: 'Citizenship',
      pages: {
        citizenshipStatus: {
          path: 'citizenship/status',
          title: 'Citizenship status',
          uiSchema: citizenshipStatusUiSchema,
          schema: citizenshipStatusSchema,
        },
        visaImmigrant: {
          path: 'citizenship/visa-immigrant',
          title: 'Immigrant visa information',
          depends: formData =>
            formData?.citizenshipStatus === 'NOT_US' &&
            formData?.visaCategory === 'IMMIGRANT',
          uiSchema: visaImmigrantUiSchema,
          schema: visaImmigrantSchema,
        },
        visaExchangeVisitor: {
          path: 'citizenship/visa-exchange-visitor',
          title: 'Exchange visitor visa information',
          depends: formData =>
            formData?.citizenshipStatus === 'NOT_US' &&
            formData?.visaCategory === 'EXCHANGE_VISITOR',
          uiSchema: visaExchangeVisitorUiSchema,
          schema: visaExchangeVisitorSchema,
        },
        visaOtherNonimmigrant: {
          path: 'citizenship/visa-other-nonimmigrant',
          title: 'Other non-immigrant visa information',
          depends: formData =>
            formData?.citizenshipStatus === 'NOT_US' &&
            formData?.visaCategory === 'OTHER_NONIMMIGRANT',
          uiSchema: visaOtherNonimmigrantUiSchema,
          schema: visaOtherNonimmigrantSchema,
        },
        ds2019: {
          path: 'citizenship/ds2019',
          title: 'DS-2019',
          depends: formData => formData?.citizenshipStatus === 'NOT_US',
          uiSchema: ds2019UiSchema,
          schema: ds2019Schema,
        },
      },
    },
    licensesChapter: {
      title: 'Licenses and credentials',
      pages: {
        currentLicenses: {
          path: 'licenses/current',
          title: 'Current licenses',
          uiSchema: currentLicensesUiSchema,
          schema: currentLicensesSchema,
        },
        priorLicenses: {
          path: 'licenses/prior',
          title: 'Prior licenses',
          uiSchema: priorLicensesUiSchema,
          schema: priorLicensesSchema,
        },
        npi: {
          path: 'licenses/npi',
          title: 'National Provider Identifier',
          uiSchema: npiUiSchema,
          schema: npiSchema,
        },
        adverseHistory: {
          path: 'licenses/adverse-history',
          title: 'Adverse licensure history',
          uiSchema: adverseHistoryUiSchema,
          schema: adverseHistorySchema,
        },
        adverseLicenseExplanation: {
          path: 'licenses/adverse-explanation',
          title: 'Adverse licensure explanation',
          depends: formData =>
            formData?.licenseActionHistory === 'Y' ||
            formData?.clinicalPrivilegeActionHistory === 'Y',
          uiSchema: adverseLicenseExplanationUiSchema,
          schema: adverseLicenseExplanationSchema,
        },
      },
    },
    educationChapter: {
      title: 'Education',
      pages: {
        educationHistory: {
          path: 'education/history',
          title: 'Education history',
          uiSchema: educationHistoryUiSchema,
          schema: educationHistorySchema,
        },
        internationalMedicalSchool: {
          path: 'education/international-medical-school',
          title: 'International medical school',
          uiSchema: internationalMedicalSchoolUiSchema,
          schema: internationalMedicalSchoolSchema,
        },
      },
    },
    trainingHistoryChapter: {
      title: 'Training history',
      pages: {
        trainingHistory: {
          path: 'training/history',
          title: 'Internship, residency, and fellowship history',
          uiSchema: trainingHistoryUiSchema,
          schema: trainingHistorySchema,
        },
      },
    },
    additionalQuestionsChapter: {
      title: 'Additional questions',
      pages: {
        fraudQuestion: {
          path: 'additional-questions/fraud',
          title: 'Medicare and Medicaid fraud history',
          uiSchema: fraudQuestionUiSchema,
          schema: fraudQuestionSchema,
        },
        malpracticeQuestion: {
          path: 'additional-questions/malpractice',
          title: 'Malpractice history',
          uiSchema: malpracticeQuestionUiSchema,
          schema: malpracticeQuestionSchema,
        },
        adverseAdditionalExplanation: {
          path: 'additional-questions/adverse-explanation',
          title: 'Fraud and malpractice explanation',
          depends: formData =>
            formData?.medicaidFraudHistory === 'Y' ||
            formData?.malpracticeHistory === 'Y',
          uiSchema: adverseAdditionalExplanationUiSchema,
          schema: adverseAdditionalExplanationSchema,
        },
        remarks: {
          path: 'remarks',
          title: 'Additional remarks',
          uiSchema: remarksUiSchema,
          schema: remarksSchema,
        },
      },
    },
    certificationChapter: {
      title: 'Certification and authorization',
      pages: {
        certification: {
          path: 'certification',
          title: 'Trainee certification',
          uiSchema: certificationUiSchema,
          schema: certificationSchema,
        },
        authorization: {
          path: 'authorization',
          title: 'Authorization for release of information',
          uiSchema: authorizationUiSchema,
          schema: authorizationSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };