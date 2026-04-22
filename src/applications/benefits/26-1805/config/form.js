import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import { VA_FORM_IDS } from 'platform/forms/constants';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import GetFormHelp from '../components/GetFormHelp';
import prefillTransformer from '../helpers/prefillTransformer';
import submitTransformer from './submitTransformer';

import {
  irrrlScreeningUiSchema,
  irrrlScreeningSchema,
} from './chapters/irrrlScreening';

import {
  lenderInformationUiSchema,
  lenderInformationSchema,
} from './chapters/lenderInformation';

import {
  veteranBorrowerInformationUiSchema,
  veteranBorrowerInformationSchema,
} from './chapters/veteranBorrowerInformation';

import {
  loanTransactionTypeUiSchema,
  loanTransactionTypeSchema,
} from './chapters/loanTransactionType';

import {
  propertyAddressUiSchema,
  propertyAddressSchema,
} from './chapters/propertyAddress';

import {
  propertyTypeUiSchema,
  propertyTypeSchema,
} from './chapters/propertyType';

import {
  condoProjectCheckUiSchema,
  condoProjectCheckSchema,
} from './chapters/condoProjectCheck';

import {
  manufacturedHomeDetailsUiSchema,
  manufacturedHomeDetailsSchema,
} from './chapters/manufacturedHomeDetails';

import {
  newConstructionDetailsUiSchema,
  newConstructionDetailsSchema,
} from './chapters/newConstructionDetails';

import {
  propertyDetailsUiSchema,
  propertyDetailsSchema,
} from './chapters/propertyDetails';

import {
  priorVaAppraisalUiSchema,
  priorVaAppraisalSchema,
} from './chapters/priorVaAppraisal';

import {
  propertyAccessContactUiSchema,
  propertyAccessContactSchema,
} from './chapters/propertyAccessContact';

import {
  appraisalTimingUiSchema,
  appraisalTimingSchema,
} from './chapters/appraisalTiming';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/lgy/appraisal_requests`,
  transformForSubmit: submitTransformer,
  trackingPrefix: 'form-26-1805-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  getHelp: GetFormHelp,
  formId: VA_FORM_IDS.FORM_26_1805 || '26-1805',
  saveInProgress: {
    messages: {
      inProgress:
        'Your VA appraisal request (26-1805) is in progress.',
      expired:
        'Your saved VA appraisal request (26-1805) has expired. Please start over.',
      saved: 'Your appraisal request has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  prefillTransformer,
  savedFormMessages: {
    notFound:
      'Please start over to submit your VA appraisal request.',
    noAuth:
      'Please sign in again to continue your VA appraisal request.',
  },
  title: 'Request a VA Appraisal',
  subTitle: 'VA Form 26-1805',
  defaultDefinitions: {},
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  chapters: {
    irrrlScreeningChapter: {
      title: 'Loan type screening',
      pages: {
        irrrlScreening: {
          path: 'irrrl-screening',
          title: 'Loan type',
          uiSchema: irrrlScreeningUiSchema,
          schema: irrrlScreeningSchema,
        },
      },
    },
    lenderInformationChapter: {
      title: 'Lender information',
      pages: {
        lenderInformation: {
          path: 'lender-information',
          title: 'Lender information',
          uiSchema: lenderInformationUiSchema,
          schema: lenderInformationSchema,
        },
      },
    },
    veteranBorrowerInformationChapter: {
      title: 'Veteran borrower information',
      pages: {
        veteranBorrowerInformation: {
          path: 'veteran-borrower-information',
          title: 'Veteran borrower information',
          uiSchema: veteranBorrowerInformationUiSchema,
          schema: veteranBorrowerInformationSchema,
        },
      },
    },
    loanTransactionTypeChapter: {
      title: 'Loan transaction',
      pages: {
        loanTransactionType: {
          path: 'loan-transaction-type',
          title: 'Loan transaction type',
          uiSchema: loanTransactionTypeUiSchema,
          schema: loanTransactionTypeSchema,
        },
      },
    },
    propertyInformationChapter: {
      title: 'Property information',
      pages: {
        propertyAddress: {
          path: 'property-address',
          title: 'Property address',
          uiSchema: propertyAddressUiSchema,
          schema: propertyAddressSchema,
        },
        propertyType: {
          path: 'property-type',
          title: 'Property type',
          uiSchema: propertyTypeUiSchema,
          schema: propertyTypeSchema,
        },
        condoProjectCheck: {
          path: 'condo-project-check',
          title: 'Condo project details',
          depends: formData =>
            formData?.propertyInformation?.propertyType === 'condo',
          uiSchema: condoProjectCheckUiSchema,
          schema: condoProjectCheckSchema,
        },
        manufacturedHomeDetails: {
          path: 'manufactured-home-details',
          title: 'Manufactured home details',
          depends: formData =>
            formData?.propertyInformation?.propertyType ===
            'manufactured_home',
          uiSchema: manufacturedHomeDetailsUiSchema,
          schema: manufacturedHomeDetailsSchema,
        },
        newConstructionDetails: {
          path: 'new-construction-details',
          title: 'New construction details',
          depends: formData =>
            formData?.propertyInformation?.constructionType ===
            'proposed_new_construction',
          uiSchema: newConstructionDetailsUiSchema,
          schema: newConstructionDetailsSchema,
        },
        propertyDetails: {
          path: 'property-details',
          title: 'Property details',
          uiSchema: propertyDetailsUiSchema,
          schema: propertyDetailsSchema,
        },
        priorVaAppraisal: {
          path: 'prior-va-appraisal',
          title: 'Prior VA appraisal',
          uiSchema: priorVaAppraisalUiSchema,
          schema: priorVaAppraisalSchema,
        },
      },
    },
    accessAndTimingChapter: {
      title: 'Property access and timing',
      pages: {
        propertyAccessContact: {
          path: 'property-access-contact',
          title: 'Property access contact',
          uiSchema: propertyAccessContactUiSchema,
          schema: propertyAccessContactSchema,
        },
        appraisalTiming: {
          path: 'appraisal-timing',
          title: 'Appraisal timing',
          uiSchema: appraisalTimingUiSchema,
          schema: appraisalTimingSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };