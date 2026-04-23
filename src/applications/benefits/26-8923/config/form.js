import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  loanIdentificationUiSchema,
  loanIdentificationSchema,
} from './chapters/loanIdentification';

import {
  sectionIUiSchema,
  sectionISchema,
} from './chapters/sectionI';

import {
  sectionIIUiSchema,
  sectionIISchema,
} from './chapters/sectionII';

import {
  sectionIIIUiSchema,
  sectionIIISchema,
} from './chapters/sectionIII';

import {
  lenderCertificationUiSchema,
  lenderCertificationSchema,
} from './chapters/lenderCertification';

import SectionIPage from '../components/SectionIPage';
import SectionIIPage from '../components/SectionIIPage';
import SectionIIIPage from '../components/SectionIIIPage';

const TITLE = 'Interest Rate Reduction Refinancing Loan Worksheet';
const SUBTITLE = 'VA Form 26-8923';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/irrrl_worksheet_submissions`,
  trackingPrefix: 'irrrl-worksheet-26-8923-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  formId: '26-8923',
  saveInProgress: {
    messages: {
      inProgress:
        'Your IRRRL worksheet (VA Form 26-8923) is in progress. It will expire after 60 days of inactivity.',
      expired:
        'Your saved IRRRL worksheet (VA Form 26-8923) has expired. If you want to complete the worksheet, please start a new one.',
      saved: 'Your IRRRL worksheet has been saved.',
    },
  },
  version: 0,
  prefillEnabled: false,
  savedFormMessages: {
    notFound: 'Start a new IRRRL worksheet.',
    noAuth: 'Please sign in to save and resume your IRRRL worksheet.',
  },
  title: TITLE,
  subTitle: SUBTITLE,
  defaultDefinitions: {},
  chapters: {
    loanIdentificationChapter: {
      title: 'Loan identification',
      pages: {
        loanIdentification: {
          path: 'loan-identification',
          title: 'Loan identification',
          uiSchema: loanIdentificationUiSchema,
          schema: loanIdentificationSchema,
        },
      },
    },
    sectionIChapter: {
      title: 'Section I \u2014 Initial computation',
      pages: {
        initialComputation: {
          path: 'section-i-initial-computation',
          title: 'Section I \u2014 Initial computation',
          CustomPage: SectionIPage,
          CustomPageReview: null,
          uiSchema: sectionIUiSchema,
          schema: sectionISchema,
        },
      },
    },
    sectionIIChapter: {
      title: 'Section II \u2014 Preliminary loan amount',
      pages: {
        preliminaryLoanAmount: {
          path: 'section-ii-preliminary-loan-amount',
          title: 'Section II \u2014 Preliminary loan amount',
          CustomPage: SectionIIPage,
          CustomPageReview: null,
          uiSchema: sectionIIUiSchema,
          schema: sectionIISchema,
        },
      },
    },
    sectionIIIChapter: {
      title: 'Section III \u2014 Final computation',
      pages: {
        finalComputation: {
          path: 'section-iii-final-computation',
          title: 'Section III \u2014 Final computation',
          CustomPage: SectionIIIPage,
          CustomPageReview: null,
          uiSchema: sectionIIIUiSchema,
          schema: sectionIIISchema,
          depends: formData =>
            formData?.loanIdentification?.vaLoanNumber != null &&
            formData?.sectionI?.line1ExistingLoanBalance != null &&
            formData?.sectionII?.line5DiscountPercent != null,
        },
      },
    },
    lenderCertificationChapter: {
      title: 'Lender certification',
      pages: {
        certification: {
          path: 'lender-certification',
          title: 'Lender certification',
          uiSchema: lenderCertificationUiSchema,
          schema: lenderCertificationSchema,
        },
      },
    },
  },
};

export default formConfig;