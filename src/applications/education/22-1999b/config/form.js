import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  institutionInformationUiSchema,
  institutionInformationSchema,
} from './chapters/institutionInformation';
import {
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from './chapters/scoContactInformation';
import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
} from './chapters/studentIdentification';
import {
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
} from './chapters/priorCertificationReference';
import {
  typeOfChangeUiSchema,
  typeOfChangeSchema,
} from './chapters/typeOfChange';
import {
  effectiveDateOfChangeUiSchema,
  effectiveDateOfChangeSchema,
} from './chapters/effectiveDateOfChange';
import {
  lastDateOfAttendanceUiSchema,
  lastDateOfAttendanceSchema,
} from './chapters/lastDateOfAttendance';
import {
  updatedEnrollmentDetailsUiSchema,
  updatedEnrollmentDetailsSchema,
} from './chapters/updatedEnrollmentDetails';
import {
  reasonForChangeUiSchema,
  reasonForChangeSchema,
} from './chapters/reasonForChange';
import {
  mitigatingCircumstancesUiSchema,
  mitigatingCircumstancesSchema,
} from './chapters/mitigatingCircumstances';
import {
  correctionDetailsUiSchema,
  correctionDetailsSchema,
} from './chapters/correctionDetails';
import {
  timelinessAcknowledgmentUiSchema,
  timelinessAcknowledgmentSchema,
} from './chapters/timelinessAcknowledgment';
import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from './chapters/supportingDocumentation';
import {
  certificationAttestationUiSchema,
  certificationAttestationSchema,
} from './chapters/certificationAttestation';

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
  formId: '22-1999b',
  saveInProgress: {
    messages: {
      inProgress:
        'Your enrollment change certification (22-1999b) is in progress.',
      expired:
        'Your saved enrollment change certification (22-1999b) has expired. If you want to report an enrollment change, please start a new certification.',
      saved: 'Your enrollment change certification has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound:
      'Please start over to report your enrollment change certification.',
    noAuth:
      'Please sign in again to continue your enrollment change certification.',
  },
  title: TITLE,
  subTitle: SUBTITLE,
  defaultDefinitions: {},
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
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
          title: 'School certifying official contact information',
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
          depends: formData => showLastDateOfAttendance(formData),
          uiSchema: lastDateOfAttendanceUiSchema,
          schema: lastDateOfAttendanceSchema,
        },
        updatedEnrollmentDetails: {
          path: 'updated-enrollment-details',
          title: 'Updated enrollment details',
          depends: formData => showUpdatedEnrollmentDetails(formData),
          uiSchema: updatedEnrollmentDetailsUiSchema,
          schema: updatedEnrollmentDetailsSchema,
        },
        reasonForChange: {
          path: 'reason-for-change',
          title: 'Reason for change',
          depends: formData => showReasonForChange(formData),
          uiSchema: reasonForChangeUiSchema,
          schema: reasonForChangeSchema,
        },
        mitigatingCircumstances: {
          path: 'mitigating-circumstances',
          title: 'Mitigating circumstances',
          depends: formData => showMitigatingCircumstances(formData),
          uiSchema: mitigatingCircumstancesUiSchema,
          schema: mitigatingCircumstancesSchema,
        },
        correctionDetails: {
          path: 'correction-details',
          title: 'Correction details',
          depends: formData => showCorrectionDetails(formData),
          uiSchema: correctionDetailsUiSchema,
          schema: correctionDetailsSchema,
        },
        timelinessAcknowledgment: {
          path: 'timeliness-acknowledgment',
          title: 'Timeliness acknowledgment',
          depends: formData => showTimelinessAcknowledgment(formData),
          uiSchema: timelinessAcknowledgmentUiSchema,
          schema: timelinessAcknowledgmentSchema,
        },
      },
    },
    supportingDocumentationChapter: {
      title: 'Supporting documentation',
      pages: {
        supportingDocumentation: {
          path: 'supporting-documentation',
          title: 'Supporting documentation',
          depends: formData => showSupportingDocumentation(formData),
          uiSchema: supportingDocumentationUiSchema,
          schema: supportingDocumentationSchema,
        },
      },
    },
    certificationAttestationChapter: {
      title: 'Review and certify',
      pages: {
        certificationAttestation: {
          path: 'certification-attestation',
          title: 'Certification attestation',
          uiSchema: certificationAttestationUiSchema,
          schema: certificationAttestationSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };