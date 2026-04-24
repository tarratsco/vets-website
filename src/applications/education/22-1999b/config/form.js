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
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  isLateSubmission,
  hasMitigatingReasonCode,
  showSupportingDocumentation,
} from '../utils/conditionalPageLogic';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/edu_22_1999b_forms`,
  trackingPrefix: '22-1999b-enrollment-change-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  formId: '22-1999b',
  saveInProgress: {
    messages: {
      inProgress:
        'Your enrollment change certification (22-1999b) is in progress.',
      expired:
        'Your saved enrollment change certification (22-1999b) has expired. If you want to submit a change certification, please start a new request.',
      saved: 'Your enrollment change certification has been saved.',
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
  title: 'Report an enrollment change or termination',
  subTitle: 'VA Form 22-1999b',
  defaultDefinitions: {},
  chapters: {
    institutionAndSCO: {
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
    studentAndCertification: {
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
    enrollmentChangeDetails: {
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
          title: 'Effective date of enrollment change',
          uiSchema: effectiveDateOfChangeUiSchema,
          schema: effectiveDateOfChangeSchema,
        },
        lastDateOfAttendance: {
          path: 'last-date-of-attendance',
          title: 'Last date of attendance',
          depends: formData =>
            isTerminationOrWithdrawal(formData.typeOfChange),
          uiSchema: lastDateOfAttendanceUiSchema,
          schema: lastDateOfAttendanceSchema,
        },
        updatedEnrollmentDetails: {
          path: 'updated-enrollment-details',
          title: 'Updated enrollment details',
          depends: formData =>
            isReductionOrPartialWithdrawal(formData.typeOfChange),
          uiSchema: updatedEnrollmentDetailsUiSchema,
          schema: updatedEnrollmentDetailsSchema,
        },
        reasonForChange: {
          path: 'reason-for-change',
          title: 'Reason for enrollment change',
          depends: formData => formData.typeOfChange !== 'correction',
          uiSchema: reasonForChangeUiSchema,
          schema: reasonForChangeSchema,
        },
        mitigatingCircumstances: {
          path: 'mitigating-circumstances',
          title: 'Mitigating circumstances',
          depends: formData =>
            formData.typeOfChange !== 'correction' &&
            hasMitigatingReasonCode(formData.reasonForChange),
          uiSchema: mitigatingCircumstancesUiSchema,
          schema: mitigatingCircumstancesSchema,
        },
        correctionDetails: {
          path: 'correction-details',
          title: 'Correction details',
          depends: formData => formData.typeOfChange === 'correction',
          uiSchema: correctionDetailsUiSchema,
          schema: correctionDetailsSchema,
        },
        timelinessAcknowledgment: {
          path: 'timeliness-acknowledgment',
          title: 'Timeliness acknowledgment',
          depends: formData =>
            formData.typeOfChange !== 'correction' &&
            isLateSubmission(formData.effectiveDateOfChange),
          uiSchema: timelinessAcknowledgmentUiSchema,
          schema: timelinessAcknowledgmentSchema,
        },
      },
    },
    supportingDocumentation: {
      title: 'Supporting documentation',
      pages: {
        documentUpload: {
          path: 'supporting-documentation',
          title: 'Supporting documentation',
          depends: formData => showSupportingDocumentation(formData),
          uiSchema: supportingDocumentationUiSchema,
          schema: supportingDocumentationSchema,
        },
      },
    },
    certificationAttestation: {
      title: 'Certification',
      pages: {
        attestation: {
          path: 'certification',
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