import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  institutionInformationUiSchema,
  institutionInformationSchema,
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from './chapters/institutionAndSco';

import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
} from './chapters/studentAndPriorCertification';

import {
  typeOfChangeUiSchema,
  typeOfChangeSchema,
  effectiveDateOfChangeUiSchema,
  effectiveDateOfChangeSchema,
  lastDateOfAttendanceUiSchema,
  lastDateOfAttendanceSchema,
  updatedEnrollmentDetailsUiSchema,
  updatedEnrollmentDetailsSchema,
  reasonForChangeUiSchema,
  reasonForChangeSchema,
  mitigatingCircumstancesUiSchema,
  mitigatingCircumstancesSchema,
  correctionDetailsUiSchema,
  correctionDetailsSchema,
  timelinessAcknowledgmentUiSchema,
  timelinessAcknowledgmentSchema,
} from './chapters/enrollmentChangeDetails';

import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from './chapters/supportingDocumentation';

import {
  showLastDateOfAttendance,
  showUpdatedEnrollmentDetails,
  showReasonForChange,
  showMitigatingCircumstances,
  showCorrectionDetails,
  showTimelinessAcknowledgment,
  showSupportingDocumentation,
} from '../utils/conditionalPageLogic';

import { TITLE, SUBTITLE } from '../constants';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/edu_22_1999b_forms`,
  trackingPrefix: '22-1999b-enrollment-change-',
  v3SegmentedProgressBar: true,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  preSubmitInfo: {
    statementOfTruth: {
      body:
        'I certify that, to the best of my knowledge, the information I have provided on this enrollment change certification is true and complete. I understand that any false statement may be punishable by fine or imprisonment under applicable Federal law.',
      messageAriaDescribedby:
        'I certify that, to the best of my knowledge, the information I have provided on this enrollment change certification is true and complete. I understand that any false statement may be punishable by fine or imprisonment under applicable Federal law.',
      fullNamePath: 'institutionAndScoInformation.scoLastName',
    },
  },
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  formId: '22-1999b',
  saveInProgress: {
    messages: {
      inProgress:
        'Your enrollment change certification (VA Form 22-1999b) is in progress.',
      expired:
        'Your saved enrollment change certification (VA Form 22-1999b) has expired. If you want to submit your certification, please start a new one.',
      saved:
        'Your enrollment change certification has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound:
      'Please start over to submit your enrollment change certification.',
    noAuth:
      'Please sign in again to continue your enrollment change certification.',
  },
  title: TITLE,
  subTitle: SUBTITLE,
  defaultDefinitions: {},
  chapters: {
    institutionAndSCOChapter: {
      title: 'Institution and certifying official information',
      pages: {
        institutionInformation: {
          path: 'institution-information',
          title: 'Institution information',
          uiSchema: institutionInformationUiSchema,
          schema: institutionInformationSchema,
        },
        scoContactInformation: {
          path: 'sco-contact-information',
          title: 'School Certifying Official contact information',
          uiSchema: scoContactInformationUiSchema,
          schema: scoContactInformationSchema,
        },
      },
    },
    studentAndCertificationChapter: {
      title: 'Student and prior certification information',
      pages: {
        studentIdentification: {
          path: 'student-identification',
          title: 'Student identification',
          uiSchema: studentIdentificationUiSchema,
          schema: studentIdentificationSchema,
        },
        priorCertificationReference: {
          path: 'prior-certification-reference',
          title: 'Prior certification reference',
          uiSchema: priorCertificationReferenceUiSchema,
          schema: priorCertificationReferenceSchema,
        },
      },
    },
    enrollmentChangeDetailsChapter: {
      title: 'Enrollment change details',
      pages: {
        typeOfChange: {
          path: 'type-of-change',
          title: 'Type of enrollment change',
          uiSchema: typeOfChangeUiSchema,
          schema: typeOfChangeSchema,
        },
        effectiveDateOfChange: {
          path: 'effective-date-of-change',
          title: 'Effective date of change',
          uiSchema: effectiveDateOfChangeUiSchema,
          schema: effectiveDateOfChangeSchema,
        },
        lastDateOfAttendance: {
          path: 'last-date-of-attendance',
          title: 'Last date of attendance',
          depends: showLastDateOfAttendance,
          uiSchema: lastDateOfAttendanceUiSchema,
          schema: lastDateOfAttendanceSchema,
        },
        updatedEnrollmentDetails: {
          path: 'updated-enrollment-details',
          title: 'Updated enrollment details',
          depends: showUpdatedEnrollmentDetails,
          uiSchema: updatedEnrollmentDetailsUiSchema,
          schema: updatedEnrollmentDetailsSchema,
        },
        reasonForChange: {
          path: 'reason-for-change',
          title: 'Reason for change',
          depends: showReasonForChange,
          uiSchema: reasonForChangeUiSchema,
          schema: reasonForChangeSchema,
        },
        mitigatingCircumstances: {
          path: 'mitigating-circumstances',
          title: 'Mitigating circumstances',
          depends: showMitigatingCircumstances,
          uiSchema: mitigatingCircumstancesUiSchema,
          schema: mitigatingCircumstancesSchema,
        },
        correctionDetails: {
          path: 'correction-details',
          title: 'Correction details',
          depends: showCorrectionDetails,
          uiSchema: correctionDetailsUiSchema,
          schema: correctionDetailsSchema,
        },
        timelinessAcknowledgment: {
          path: 'timeliness-acknowledgment',
          title: 'Timeliness acknowledgment',
          depends: showTimelinessAcknowledgment,
          uiSchema: timelinessAcknowledgmentUiSchema,
          schema: timelinessAcknowledgmentSchema,
        },
      },
    },
    supportingDocumentationChapter: {
      title: 'Supporting documentation',
      pages: {
        documentUpload: {
          path: 'supporting-documentation',
          title: 'Supporting documentation',
          depends: showSupportingDocumentation,
          uiSchema: supportingDocumentationUiSchema,
          schema: supportingDocumentationSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };