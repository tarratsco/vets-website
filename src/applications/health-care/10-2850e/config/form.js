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

const TITLE = 'Apply for a VA Clinical Position';
const SUBTITLE = 'VA Form 10-2850e';

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
  formId: '10-2850E',
  saveInProgress: {
    messages: {
      inProgress:
        'Your VA Form 10-2850e clinical position application is in progress.',
      expired:
        'Your saved VA Form 10-2850e application has expired. If you want to apply for a VA clinical position, please start a new application.',
      saved: 'Your VA Form 10-2850e application has been saved.',
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
  title: TITLE,
  subTitle: SUBTITLE,
  defaultDefinitions: {},
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