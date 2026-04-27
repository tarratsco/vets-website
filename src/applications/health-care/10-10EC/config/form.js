import footerContent from 'platform/forms/components/FormFooter';
import environment from 'platform/utilities/environment';
import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  veteranInformationUiSchema,
  veteranInformationSchema,
} from './chapters/veteranInformation';
import {
  insuranceInformationUiSchema,
  insuranceInformationSchema,
} from './chapters/insuranceInformation';
import {
  maritalStatusUiSchema,
  maritalStatusSchema,
} from './chapters/maritalStatus';
import {
  spouseInformationUiSchema,
  spouseInformationSchema,
} from './chapters/spouseInformation';
import {
  dependentInformationUiSchema,
  dependentInformationSchema,
} from './chapters/dependentInformation';
import {
  financialDisclosureUiSchema,
  financialDisclosureSchema,
} from './chapters/financialDisclosure';
import { careTypeUiSchema, careTypeSchema } from './chapters/careType';
import { fixedAssetsUiSchema, fixedAssetsSchema } from './chapters/fixedAssets';
import {
  liquidAssetsUiSchema,
  liquidAssetsSchema,
} from './chapters/liquidAssets';
import {
  grossIncomeVeteranUiSchema,
  grossIncomeVeteranSchema,
} from './chapters/grossIncomeVeteran';
import {
  grossIncomeSpouseUiSchema,
  grossIncomeSpouseSchema,
} from './chapters/grossIncomeSpouse';
import {
  deductibleExpensesUiSchema,
  deductibleExpensesSchema,
} from './chapters/deductibleExpenses';
import {
  poaDocumentsUiSchema,
  poaDocumentsSchema,
} from './chapters/poaDocuments';
import transformForSubmit from './transform';

const MARRIED_STATUSES = [
  'married_living_with',
  'married_separate_not_institutionalized',
  'married_separate_institutionalized',
];

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/extended_care_applications`,
  transformForSubmit,
  trackingPrefix: 'hca-extended-care-',
  v3SegmentedProgressBar: true,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
  dev: {
    showNavLinks: true,
    collapsibleNavLinks: true,
  },
  formId: '10-10EC',
  saveInProgress: {
    messages: {
      inProgress:
        'Your application for extended care services (10-10EC) is in progress.',
      expired:
        'Your saved application for extended care services (10-10EC) has expired. Please start a new application.',
      saved: 'Your application for extended care services has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for extended care services.',
    noAuth:
      'Please sign in again to continue your application for extended care services.',
  },
  title: 'Apply for extended care services',
  subTitle: 'VA Form 10-10EC',
  defaultDefinitions: {},
  chapters: {
    veteranInformationChapter: {
      title: 'Veteran information',
      pages: {
        veteranInformation: {
          path: 'veteran-information',
          title: 'Veteran information',
          uiSchema: veteranInformationUiSchema,
          schema: veteranInformationSchema,
        },
      },
    },
    insuranceInformationChapter: {
      title: 'Insurance information',
      pages: {
        insuranceInformation: {
          path: 'insurance-information',
          title: 'Insurance information',
          uiSchema: insuranceInformationUiSchema,
          schema: insuranceInformationSchema,
        },
      },
    },
    maritalStatusChapter: {
      title: 'Marital and dependent status',
      pages: {
        maritalStatus: {
          path: 'marital-status',
          title: 'Marital and dependent status',
          uiSchema: maritalStatusUiSchema,
          schema: maritalStatusSchema,
        },
      },
    },
    spouseInformationChapter: {
      title: 'Spouse information',
      pages: {
        spouseInformation: {
          path: 'spouse-information',
          title: 'Spouse information',
          depends: formData => MARRIED_STATUSES.includes(formData.maritalStatus),
          uiSchema: spouseInformationUiSchema,
          schema: spouseInformationSchema,
        },
      },
    },
    dependentInformationChapter: {
      title: 'Dependent information',
      pages: {
        dependentInformation: {
          path: 'dependent-information',
          title: 'Dependent information',
          depends: formData =>
            formData.maritalStatus !== 'single_no_dependent',
          uiSchema: dependentInformationUiSchema,
          schema: dependentInformationSchema,
        },
      },
    },
    financialDisclosureChapter: {
      title: 'Financial disclosure',
      pages: {
        financialDisclosure: {
          path: 'financial-disclosure-election',
          title: 'Financial disclosure election',
          uiSchema: financialDisclosureUiSchema,
          schema: financialDisclosureSchema,
        },
      },
    },
    careTypeChapter: {
      title: 'Care type',
      pages: {
        careType: {
          path: 'care-type',
          title: 'Type of extended care',
          depends: formData =>
            formData.financialDisclosureElection === 'yes',
          uiSchema: careTypeUiSchema,
          schema: careTypeSchema,
        },
      },
    },
    fixedAssetsChapter: {
      title: 'Fixed assets',
      pages: {
        fixedAssets: {
          path: 'fixed-assets',
          title: 'Fixed assets (Section V)',
          depends: formData =>
            formData.financialDisclosureElection === 'yes' &&
            formData.careType === 'institutional',
          uiSchema: fixedAssetsUiSchema,
          schema: fixedAssetsSchema,
        },
      },
    },
    liquidAssetsChapter: {
      title: 'Liquid assets',
      pages: {
        liquidAssets: {
          path: 'liquid-assets',
          title: 'Liquid assets (Section VI)',
          depends: formData =>
            formData.financialDisclosureElection === 'yes' &&
            formData.careType === 'institutional',
          uiSchema: liquidAssetsUiSchema,
          schema: liquidAssetsSchema,
        },
      },
    },
    grossIncomeVeteranChapter: {
      title: 'Gross income — Veteran',
      pages: {
        grossIncomeVeteran: {
          path: 'gross-income-veteran',
          title: 'Gross income — Veteran (Section VII)',
          depends: formData =>
            formData.financialDisclosureElection === 'yes',
          uiSchema: grossIncomeVeteranUiSchema,
          schema: grossIncomeVeteranSchema,
        },
      },
    },
    grossIncomeSpouseChapter: {
      title: 'Gross income — Spouse',
      pages: {
        grossIncomeSpouse: {
          path: 'gross-income-spouse',
          title: 'Gross income — Spouse (Section VII)',
          depends: formData =>
            formData.financialDisclosureElection === 'yes' &&
            MARRIED_STATUSES.includes(formData.maritalStatus),
          uiSchema: grossIncomeSpouseUiSchema,
          schema: grossIncomeSpouseSchema,
        },
      },
    },
    deductibleExpensesChapter: {
      title: 'Deductible expenses',
      pages: {
        deductibleExpenses: {
          path: 'deductible-expenses',
          title: 'Deductible expenses (Section VIII)',
          depends: formData =>
            formData.financialDisclosureElection === 'yes',
          uiSchema: deductibleExpensesUiSchema,
          schema: deductibleExpensesSchema,
        },
      },
    },
    poaDocumentsChapter: {
      title: 'Power of attorney',
      pages: {
        poaDocuments: {
          path: 'poa-document-upload',
          title: 'Power of attorney documents',
          depends: formData =>
            formData.submitterType === 'poa_representative',
          uiSchema: poaDocumentsUiSchema,
          schema: poaDocumentsSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };