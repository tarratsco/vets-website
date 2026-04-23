import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import GetFormHelp from '../components/GetFormHelp';

import requestorIdentityChapter from './chapters/requestorIdentity';
import recordsLocationChapter from './chapters/recordsLocation';
import recordsRequestedChapter from './chapters/recordsRequested';
import disclosurePurposeChapter from './chapters/disclosurePurpose';
import recipientChapter from './chapters/recipient';
import authorizationTermsChapter from './chapters/authorizationTerms';

import prefillTransformer from './prefill';
import transformForSubmit from './transform';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/form10_5345`,
  transformForSubmit,
  trackingPrefix: 'health-records-release-10-5345-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  getHelp: GetFormHelp,
  formId: '10-5345',
  version: 0,
  prefillEnabled: true,
  prefillTransformer,
  savedFormMessages: {
    notFound: 'Please start your medical records authorization over.',
    noAuth:
      'Please sign in again to continue your medical records authorization.',
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your medical records release authorization (10-5345) is in progress.',
      expired:
        'Your saved medical records release authorization (10-5345) has expired. If you want to submit a new authorization, please start over.',
      saved: 'Your medical records release authorization has been saved.',
    },
  },
  title:
    'Request for and Authorization to Release Medical Records or Health Information',
  subTitle: 'VA Form 10-5345',
  defaultDefinitions: {},
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  preSubmitInfo: {
    statementOfTruth: {
      body:
        'I certify that the information I have provided is accurate and complete to the best of my knowledge. I understand that I have the right to revoke this authorization in writing at any time.',
      messageAriaDescribedby:
        'I certify that the information I have provided is accurate and complete to the best of my knowledge.',
      fullNamePath: 'veteran.firstName',
    },
  },
  chapters: {
    requestorIdentity: requestorIdentityChapter,
    recordsLocation: recordsLocationChapter,
    recordsRequested: recordsRequestedChapter,
    disclosurePurpose: disclosurePurposeChapter,
    recipient: recipientChapter,
    authorizationTerms: authorizationTermsChapter,
  },
};

export default formConfig;
export { formConfig };