import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import { prefillTransformer } from './prefill-transformer';
import { transformForSubmit } from './transform';
import GetHelp from '../components/GetHelp';

import {
  personalInformationUiSchema,
  personalInformationSchema,
} from '../chapters/personalInformation';

import {
  healthCareAgentChoiceUiSchema,
  healthCareAgentChoiceSchema,
} from '../chapters/healthCareAgentChoice';

import {
  primaryAgentUiSchema,
  primaryAgentSchema,
} from '../chapters/primaryAgent';

import {
  alternateAgentUiSchema,
  alternateAgentSchema,
} from '../chapters/alternateAgent';

import {
  lifeSustainingTreatmentsUiSchema,
  lifeSustainingTreatmentsSchema,
} from '../chapters/lifeSustainingTreatments';

import {
  mentalHealthPreferencesUiSchema,
  mentalHealthPreferencesSchema,
} from '../chapters/mentalHealthPreferences';

import {
  additionalPreferencesUiSchema,
  additionalPreferencesSchema,
} from '../chapters/additionalPreferences';

import {
  strictnessUiSchema,
  strictnessSchema,
} from '../chapters/strictness';

import {
  veteranSignatureUiSchema,
  veteranSignatureSchema,
} from '../chapters/veteranSignature';

import {
  witness1UiSchema,
  witness1Schema,
} from '../chapters/witness1';

import {
  witness2UiSchema,
  witness2Schema,
} from '../chapters/witness2';

import WitnessInstructionsPage from '../components/WitnessInstructionsPage';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/health/advance_directive`,
  transformForSubmit,
  trackingPrefix: '10-0137-advance-directive-',
  v3SegmentedProgressBar: true,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  getHelp: GetHelp,
  formId: '10-0137',
  saveInProgress: {
    messages: {
      inProgress:
        'Your VA Advance Directive (10-0137) is in progress.',
      expired:
        'Your saved VA Advance Directive (10-0137) has expired. If you want to submit your advance directive, please start a new form.',
      saved: 'Your VA Advance Directive has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  prefillTransformer,
  savedFormMessages: {
    notFound:
      'Please start over to complete your VA Advance Directive.',
    noAuth:
      'Please sign in again to continue your VA Advance Directive.',
  },
  title: 'VA Advance Directive',
  subTitle: 'Durable Power of Attorney for Health Care and Living Will (VA Form 10-0137)',
  defaultDefinitions: {},
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  chapters: {
    personalInformation: {
      title: 'Your information',
      pages: {
        personalInformation: {
          path: 'personal-information',
          title: 'Personal information',
          uiSchema: personalInformationUiSchema,
          schema: personalInformationSchema,
        },
      },
    },
    healthCareAgent: {
      title: 'Health Care Agent',
      pages: {
        healthCareAgentChoice: {
          path: 'health-care-agent/choice',
          title: 'Health Care Agent decision',
          uiSchema: healthCareAgentChoiceUiSchema,
          schema: healthCareAgentChoiceSchema,
        },
        primaryAgent: {
          path: 'health-care-agent/primary',
          title: 'Primary Health Care Agent',
          depends: formData =>
            formData.appointHealthCareAgent === 'appoint',
          uiSchema: primaryAgentUiSchema,
          schema: primaryAgentSchema,
        },
        alternateAgent: {
          path: 'health-care-agent/alternate',
          title: 'Alternate Health Care Agent',
          depends: formData =>
            formData.appointHealthCareAgent === 'appoint',
          uiSchema: alternateAgentUiSchema,
          schema: alternateAgentSchema,
        },
      },
    },
    livingWill: {
      title: 'Living Will',
      pages: {
        lifeSustainingTreatments: {
          path: 'living-will/life-sustaining-treatments',
          title: 'Life-sustaining treatment preferences',
          uiSchema: lifeSustainingTreatmentsUiSchema,
          schema: lifeSustainingTreatmentsSchema,
        },
        mentalHealthPreferences: {
          path: 'living-will/mental-health-preferences',
          title: 'Mental health care preferences',
          uiSchema: mentalHealthPreferencesUiSchema,
          schema: mentalHealthPreferencesSchema,
        },
        additionalPreferences: {
          path: 'living-will/additional-preferences',
          title: 'Other health care preferences',
          uiSchema: additionalPreferencesUiSchema,
          schema: additionalPreferencesSchema,
        },
        strictness: {
          path: 'living-will/strictness',
          title: 'How strictly to follow your preferences',
          uiSchema: strictnessUiSchema,
          schema: strictnessSchema,
        },
      },
    },
    signatures: {
      title: 'Sign your advance directive',
      pages: {
        veteranSignature: {
          path: 'signature/veteran',
          title: 'Your signature',
          uiSchema: veteranSignatureUiSchema,
          schema: veteranSignatureSchema,
        },
        witnessInstructions: {
          path: 'signature/witness-instructions',
          title: 'Witness instructions',
          CustomPage: WitnessInstructionsPage,
          CustomPageReview: null,
          uiSchema: {},
          schema: { type: 'object', properties: {} },
        },
        witness1: {
          path: 'signature/witness-1',
          title: 'Witness 1 signature',
          uiSchema: witness1UiSchema,
          schema: witness1Schema,
        },
        witness2: {
          path: 'signature/witness-2',
          title: 'Witness 2 signature',
          uiSchema: witness2UiSchema,
          schema: witness2Schema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };