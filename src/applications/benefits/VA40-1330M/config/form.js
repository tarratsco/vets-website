import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  eligibilityScreenerPages,
  eligibilityScreenerSchema,
  eligibilityScreenerUiSchema,
} from './chapters/eligibilityScreener';

import {
  applicantInformationPages,
} from './chapters/applicantInformation';

import {
  deceasedInformationPages,
} from './chapters/deceasedInformation';

import {
  burialInformationPages,
} from './chapters/burialInformation';

import {
  markerSelectionPages,
} from './chapters/markerSelection';

import {
  supportingDocumentsPages,
} from './chapters/supportingDocuments';

import {
  certificationAndSubmitPages,
} from './chapters/certificationAndSubmit';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/burial_forms/headstone_marker`,
  trackingPrefix: 'va40-1330m-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  formId: 'VA40-1330M',
  saveInProgress: {
    messages: {
      inProgress:
        'Your headstone or marker request (VA Form 40-1330M) is in progress.',
      expired:
        'Your saved headstone or marker request (VA Form 40-1330M) has expired. Please start a new request.',
      saved: 'Your headstone or marker request has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to submit your headstone or marker request.',
    noAuth:
      'Please sign in again to continue your headstone or marker request.',
  },
  title: 'Request a Government Headstone or Marker',
  subTitle: 'VA Form 40-1330M',
  defaultDefinitions: {},
  chapters: {
    eligibilityScreenerChapter: {
      title: 'Eligibility',
      pages: eligibilityScreenerPages,
    },
    applicantInformationChapter: {
      title: 'About the applicant',
      pages: applicantInformationPages,
    },
    deceasedInformationChapter: {
      title: 'About the deceased service member',
      pages: deceasedInformationPages,
    },
    burialInformationChapter: {
      title: 'Burial information',
      pages: burialInformationPages,
    },
    markerSelectionChapter: {
      title: 'Headstone or marker selection',
      pages: markerSelectionPages,
    },
    supportingDocumentsChapter: {
      title: 'Supporting documents',
      pages: supportingDocumentsPages,
    },
    certificationAndSubmitChapter: {
      title: 'Certification',
      pages: certificationAndSubmitPages,
    },
  },
};

export default formConfig;
export { formConfig };