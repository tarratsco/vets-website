import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  programSelectionUiSchema,
  programSelectionSchema,
} from './chapters/programSelection';
import {
  patientInformationUiSchema,
  patientInformationSchema,
} from './chapters/patientInformation';
import {
  sponsorInformationUiSchema,
  sponsorInformationSchema,
} from './chapters/sponsorInformation';
import { claimTypeUiSchema, claimTypeSchema } from './chapters/claimType';
import {
  travelProviderCertificationUiSchema,
  travelProviderCertificationSchema,
} from './chapters/travelProviderCertification';
import {
  travelModeAndDatesUiSchema,
  travelModeAndDatesSchema,
} from './chapters/travelModeAndDates';
import {
  travelAdditionalSegmentUiSchema,
  travelAdditionalSegmentSchema,
} from './chapters/travelAdditionalSegment';
import {
  travelPovMileageUiSchema,
  travelPovMileageSchema,
} from './chapters/travelPovMileage';
import {
  travelAttendantInformationUiSchema,
  travelAttendantInformationSchema,
} from './chapters/travelAttendantInformation';
import {
  travelMiscellaneousExpensesUiSchema,
  travelMiscellaneousExpensesSchema,
} from './chapters/travelMiscellaneousExpenses';
import {
  certificationSignerUiSchema,
  certificationSignerSchema,
} from './chapters/certificationSigner';
import {
  certificationRepresentativeInformationUiSchema,
  certificationRepresentativeInformationSchema,
} from './chapters/certificationRepresentativeInformation';
import {
  certificationSignatureUiSchema,
  certificationSignatureSchema,
} from './chapters/certificationSignature';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/form10_7959e_claims`,
  trackingPrefix: 'form-10-7959e-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  formId: '10-7959E',
  saveInProgress: {
    messages: {
      inProgress: 'Your VA Form 10-7959E claim is in progress.',
      expired:
        'Your saved VA Form 10-7959E claim has expired. If you want to continue, please start a new claim.',
      saved: 'Your VA Form 10-7959E claim has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to file your claim.',
    noAuth: 'Please sign in again to continue your VA Form 10-7959E claim.',
  },
  hideUnauthedStartLink: true,
  title: 'Claim for Miscellaneous Expenses',
  subTitle: 'VA Form 10-7959E',
  defaultDefinitions: {},
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  chapters: {
    programSelectionChapter: {
      title: 'Program',
      pages: {
        programSelection: {
          path: 'program-selection',
          title: 'Which program are you filing under?',
          uiSchema: programSelectionUiSchema,
          schema: programSelectionSchema,
        },
      },
    },
    patientInformationChapter: {
      title: 'Patient Information',
      pages: {
        patientInformation: {
          path: 'patient-information',
          title: 'Patient Information (Section I)',
          uiSchema: patientInformationUiSchema,
          schema: patientInformationSchema,
        },
      },
    },
    sponsorInformationChapter: {
      title: 'Sponsor Information',
      pages: {
        sponsorInformation: {
          path: 'sponsor-information',
          title: 'Sponsor Information (Section II)',
          uiSchema: sponsorInformationUiSchema,
          schema: sponsorInformationSchema,
        },
      },
    },
    expensesChapter: {
      title: 'Expenses',
      pages: {
        claimType: {
          path: 'claim-type',
          title: 'What expenses are you claiming?',
          uiSchema: claimTypeUiSchema,
          schema: claimTypeSchema,
        },
        travelProviderCertification: {
          path: 'travel-provider-certification',
          title: 'Provider Certification (Section III)',
          depends: formData =>
            Array.isArray(formData.claimType) &&
            formData.claimType.includes('travel'),
          uiSchema: travelProviderCertificationUiSchema,
          schema: travelProviderCertificationSchema,
        },
        travelModeAndDates: {
          path: 'travel-mode-and-dates',
          title: 'Travel Mode and Dates (Section III)',
          depends: formData =>
            Array.isArray(formData.claimType) &&
            formData.claimType.includes('travel'),
          uiSchema: travelModeAndDatesUiSchema,
          schema: travelModeAndDatesSchema,
        },
        travelAdditionalSegment: {
          path: 'travel-additional-segment',
          title: 'Add Another Travel Segment?',
          depends: formData =>
            Array.isArray(formData.claimType) &&
            formData.claimType.includes('travel'),
          uiSchema: travelAdditionalSegmentUiSchema,
          schema: travelAdditionalSegmentSchema,
        },
        travelPovMileage: {
          path: 'travel-pov-mileage',
          title: 'POV Mileage Details (Section III)',
          depends: formData =>
            Array.isArray(formData.claimType) &&
            formData.claimType.includes('travel') &&
            Array.isArray(formData.modeOfTravel) &&
            formData.modeOfTravel.includes('pov'),
          uiSchema: travelPovMileageUiSchema,
          schema: travelPovMileageSchema,
        },
        travelAttendantInformation: {
          path: 'travel-attendant-information',
          title: 'Attendant Information (Section III)',
          depends: formData =>
            Array.isArray(formData.claimType) &&
            formData.claimType.includes('travel'),
          uiSchema: travelAttendantInformationUiSchema,
          schema: travelAttendantInformationSchema,
        },
        travelMiscellaneousExpenses: {
          path: 'travel-miscellaneous-expenses',
          title: 'Miscellaneous Expenses (Section III)',
          uiSchema: travelMiscellaneousExpensesUiSchema,
          schema: travelMiscellaneousExpensesSchema,
        },
      },
    },
    certificationChapter: {
      title: 'Certification',
      pages: {
        certificationSigner: {
          path: 'certification-signer',
          title: 'Who is signing this certification?',
          uiSchema: certificationSignerUiSchema,
          schema: certificationSignerSchema,
        },
        certificationRepresentativeInformation: {
          path: 'certification-representative-information',
          title: 'Representative Information (Section IV)',
          depends: formData =>
            formData.certificationSigner === 'representative',
          uiSchema: certificationRepresentativeInformationUiSchema,
          schema: certificationRepresentativeInformationSchema,
        },
        certificationSignature: {
          path: 'certification-signature',
          title: 'Certification and Signature (Section IV)',
          uiSchema: certificationSignatureUiSchema,
          schema: certificationSignatureSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };
