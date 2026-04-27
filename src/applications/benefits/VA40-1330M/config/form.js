import footerContent from 'platform/forms/components/FormFooter';
import environment from 'platform/utilities/environment';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import GetFormHelp from '../components/GetFormHelp';
import DocumentsIntroPage from '../components/DocumentsIntroPage';

import {
  serviceStatusUiSchema,
  serviceStatusSchema,
  guardReserveQualifierUiSchema,
  guardReserveQualifierSchema,
} from './chapters/eligibilityScreener';

import {
  whoIsApplyingUiSchema,
  whoIsApplyingSchema,
  applicantPersonalInfoUiSchema,
  applicantPersonalInfoSchema,
  relationshipToDecedentUiSchema,
  relationshipToDecedentSchema,
  authorizationUiSchema,
  authorizationSchema,
} from './chapters/applicantInformation';

import {
  decedentPersonalInfoUiSchema,
  decedentPersonalInfoSchema,
  decedentServiceInfoUiSchema,
  decedentServiceInfoSchema,
  deathInformationUiSchema,
  deathInformationSchema,
} from './chapters/deceasedInformation';

import {
  cemeteryInfoUiSchema,
  cemeteryInfoSchema,
  graveLocationUiSchema,
  graveLocationSchema,
  existingMarkerUiSchema,
  existingMarkerSchema,
} from './chapters/burialInformation';

import {
  markerTypeUiSchema,
  markerTypeSchema,
  emblemOfBeliefUiSchema,
  emblemOfBeliefSchema,
  inscriptionUiSchema,
  inscriptionSchema,
} from './chapters/markerSelection';

import {
  deathCertificateUiSchema,
  deathCertificateSchema,
  ddForm1300UiSchema,
  ddForm1300Schema,
  ngbForm22UiSchema,
  ngbForm22Schema,
  additionalDocumentsUiSchema,
  additionalDocumentsSchema,
} from './chapters/supportingDocuments';

import {
  certificationUiSchema,
  certificationSchema,
} from './chapters/certificationChapter';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/burial_forms/headstone_marker`,
  trackingPrefix: 'va40-1330m-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  getHelp: GetFormHelp,
  formId: 'VA40-1330M',
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your headstone or marker request (VA Form 40-1330M) is in progress.',
      expired:
        'Your saved headstone or marker request (VA Form 40-1330M) has expired. If you want to submit your request, please start a new request.',
      saved: 'Your headstone or marker request has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound:
      'Please start over to submit your headstone or marker request.',
    noAuth:
      'Please sign in again to continue your headstone or marker request.',
  },
  title: 'Request a Government Headstone or Marker',
  subTitle: 'VA Form 40-1330M',
  defaultDefinitions: {},
  chapters: {
    eligibilityScreenerChapter: {
      title: 'Eligibility',
      pages: {
        serviceStatus: {
          path: 'eligibility-screener',
          title: 'Service status at time of death',
          uiSchema: serviceStatusUiSchema,
          schema: serviceStatusSchema,
        },
        guardReserveQualifier: {
          path: 'eligibility-screener/guard-reserve-qualifier',
          title: 'Guard/Reserve qualifying circumstance',
          depends: formData => formData.serviceStatusAtDeath === 'guardOrReserve',
          uiSchema: guardReserveQualifierUiSchema,
          schema: guardReserveQualifierSchema,
        },
      },
    },

    applicantInformationChapter: {
      title: 'About the applicant',
      pages: {
        whoIsApplying: {
          path: 'applicant-information/who-is-applying',
          title: 'Who is submitting this request?',
          uiSchema: whoIsApplyingUiSchema,
          schema: whoIsApplyingSchema,
        },
        applicantPersonalInfo: {
          path: 'applicant-information/applicant-personal-info',
          title: 'Your name and contact information',
          uiSchema: applicantPersonalInfoUiSchema,
          schema: applicantPersonalInfoSchema,
        },
        relationshipToDecedent: {
          path: 'applicant-information/relationship-to-decedent',
          title: 'Your relationship to the deceased service member',
          uiSchema: relationshipToDecedentUiSchema,
          schema: relationshipToDecedentSchema,
        },
        authorization: {
          path: 'applicant-information/authorization',
          title: 'Authorization to submit',
          depends: formData => formData.submitterRole !== 'nextOfKin',
          uiSchema: authorizationUiSchema,
          schema: authorizationSchema,
        },
      },
    },

    deceasedInformationChapter: {
      title: 'About the deceased service member',
      pages: {
        decedentPersonalInfo: {
          path: 'deceased-information/personal-info',
          title: 'Personal information of the deceased service member',
          uiSchema: decedentPersonalInfoUiSchema,
          schema: decedentPersonalInfoSchema,
        },
        decedentServiceInfo: {
          path: 'deceased-information/service-info',
          title: 'Military service information',
          uiSchema: decedentServiceInfoUiSchema,
          schema: decedentServiceInfoSchema,
        },
        deathInformation: {
          path: 'deceased-information/death-information',
          title: 'Circumstances of death',
          uiSchema: deathInformationUiSchema,
          schema: deathInformationSchema,
        },
      },
    },

    burialInformationChapter: {
      title: 'Burial information',
      pages: {
        cemeteryInfo: {
          path: 'burial-information/cemetery-info',
          title: 'Cemetery information',
          uiSchema: cemeteryInfoUiSchema,
          schema: cemeteryInfoSchema,
        },
        graveLocation: {
          path: 'burial-information/grave-location',
          title: 'Grave location',
          uiSchema: graveLocationUiSchema,
          schema: graveLocationSchema,
        },
        existingMarker: {
          path: 'burial-information/existing-marker',
          title: 'Existing headstone or marker',
          uiSchema: existingMarkerUiSchema,
          schema: existingMarkerSchema,
        },
      },
    },

    markerSelectionChapter: {
      title: 'Headstone or marker selection',
      pages: {
        markerType: {
          path: 'marker-selection/marker-type',
          title: 'Marker type',
          uiSchema: markerTypeUiSchema,
          schema: markerTypeSchema,
        },
        emblemOfBelief: {
          path: 'marker-selection/emblem-of-belief',
          title: 'Emblem of belief',
          uiSchema: emblemOfBeliefUiSchema,
          schema: emblemOfBeliefSchema,
        },
        inscription: {
          path: 'marker-selection/inscription',
          title: 'Inscription information',
          uiSchema: inscriptionUiSchema,
          schema: inscriptionSchema,
        },
      },
    },

    supportingDocumentsChapter: {
      title: 'Supporting documents',
      pages: {
        documentsIntro: {
          path: 'supporting-documents/required-documents-intro',
          title: 'Documents you need to upload',
          CustomPage: DocumentsIntroPage,
          CustomPageReview: null,
          uiSchema: {},
          schema: { type: 'object', properties: {} },
        },
        deathCertificate: {
          path: 'supporting-documents/death-certificate',
          title: 'Death certificate',
          uiSchema: deathCertificateUiSchema,
          schema: deathCertificateSchema,
        },
        ddForm1300: {
          path: 'supporting-documents/dd-form-1300',
          title: 'Report of Casualty (DD Form 1300)',
          depends: formData => formData.serviceStatusAtDeath === 'activeDuty',
          uiSchema: ddForm1300UiSchema,
          schema: ddForm1300Schema,
        },
        ngbForm22: {
          path: 'supporting-documents/ngb-form-22',
          title: 'Guard/Reserve service record',
          depends: formData =>
            formData.serviceStatusAtDeath === 'guardOrReserve',
          uiSchema: ngbForm22UiSchema,
          schema: ngbForm22Schema,
        },
        additionalDocuments: {
          path: 'supporting-documents/additional-documents',
          title: 'Additional documents (optional)',
          uiSchema: additionalDocumentsUiSchema,
          schema: additionalDocumentsSchema,
        },
      },
    },

    certificationChapter: {
      title: 'Certification',
      pages: {
        certify: {
          path: 'certify',
          title: 'Certify your information',
          uiSchema: certificationUiSchema,
          schema: certificationSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };