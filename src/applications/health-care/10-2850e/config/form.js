import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import applicantInformation from './chapters/applicantInformation';
import licensure from './chapters/licensure';
import educationTraining from './chapters/educationTraining';
import employmentHistory from './chapters/employmentHistory';
import adverseHistory from './chapters/adverseHistory';
import supportingDocuments from './chapters/supportingDocuments';
import appointmentDetails from './chapters/appointmentDetails';
import attestation from './chapters/attestation';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/form10_2850e/submissions`,
  trackingPrefix: 'form-10-2850e-',
  v3SegmentedProgressBar: true,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  formId: '10-2850e',
  saveInProgress: {
    messages: {
      inProgress:
        'Your VA clinical position application (10-2850e) is in progress.',
      expired:
        'Your saved VA clinical position application (10-2850e) has expired. If you want to apply, please start a new application.',
      saved: 'Your VA clinical position application has been saved.',
    },
  },
  version: 0,
  prefillEnabled: false,
  savedFormMessages: {
    notFound:
      'Please start over to apply for a VA clinical position.',
    noAuth:
      'Please sign in again to continue your VA clinical position application.',
  },
  title: 'Apply for a VA Clinical Position',
  subTitle: 'VA Form 10-2850e',
  defaultDefinitions: {},
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  chapters: {
    applicantInformationChapter: applicantInformation,
    licensureChapter: licensure,
    educationTrainingChapter: educationTraining,
    employmentHistoryChapter: employmentHistory,
    adverseHistoryChapter: adverseHistory,
    supportingDocumentsChapter: supportingDocuments,
    appointmentDetailsChapter: appointmentDetails,
    attestationChapter: attestation,
  },
};

export default formConfig;