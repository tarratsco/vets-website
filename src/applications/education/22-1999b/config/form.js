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
} from './chapters/studentAndCertification';

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
  certificationAttestationUiSchema,
  certificationAttestationSchema,
} from './chapters/certificationAttestation';

import {
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  requiresMitigatingCircumstances,
  requiresSupportingDocumentation,
  isLateSubmission,
} from '../utils/conditionalPageLogic';

import { FORM_TITLE, FORM_SUBTITLE } from '../constants';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/edu_22_1999b_forms`,
  trackingPrefix: '22-1999b-enrollment-change-',
  formId: '22-1999b',
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound:
      'Please start over to submit your enrollment change certification.',
    noAuth:
      'Please sign in again to continue your enrollment change certification.',
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your enrollment change certification (22-1999b) is in progress.',
      expired:
        'Your saved enrollment change certification (22-1999b) has expired. If you want to submit your information, please start a new certification.',
      saved: 'Your enrollment change certification has been saved.',
    },
  },
  title: FORM_TITLE,
  subTitle: FORM_SUBTITLE,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
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
            requiresMitigatingCircumstances(
              formData.typeOfChange,
              formData.reasonForChange,
            ),
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
          title: 'Late submission explanation',
          depends: formData =>
            formData.typeOfChange !== 'correction' &&
            isLateSubmission(formData.effectiveDateOfChange),
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
          depends: formData =>
            requiresSupportingDocumentation(
              formData.typeOfChange,
              formData.mitigatingCircumstancesKnown,
            ),
          uiSchema: supportingDocumentationUiSchema,
          schema: supportingDocumentationSchema,
        },
      },
    },
    certificationChapter: {
      title: 'Certification',
      pages: {
        certificationAttestation: {
          path: 'certification-attestation',
          title: 'Certification',
          uiSchema: certificationAttestationUiSchema,
          schema: certificationAttestationSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };