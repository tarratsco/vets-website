import environment from '@department-of-veterans-affairs/platform-utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import { VA_FORM_IDS } from 'platform/forms/constants';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import { transform } from './transform';

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
  dependentSummaryUiSchema,
  dependentSummarySchema,
  dependentInformationUiSchema,
  dependentInformationSchema,
} from './chapters/dependentInformation';
import {
  financialDisclosureUiSchema,
  financialDisclosureSchema,
} from './chapters/financialDisclosure';
import {
  careTypeUiSchema,
  careTypeSchema,
} from './chapters/careType';
import {
  fixedAssetsUiSchema,
  fixedAssetsSchema,
} from './chapters/fixedAssets';
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

const MARRIED_STATUSES = [
  'married_living_with',
  'married_separate_not_institutionalized',
  'married_separate_institutionalized',
];

const showSpouseInfoPage = formData =>
  MARRIED_STATUSES.includes(formData.maritalStatus) ||
  formData.maritalStatus === 'divorced_separated_widowed_this_year';

const showDependentPages = formData =>
  formData.maritalStatus !== 'single_no_dependent' &&
  formData.maritalStatus !== undefined;

const showFinancialPages = formData =>
  formData.financialDisclosureElection === 'yes';

const showInstitutionalPages = formData =>
  formData.financialDisclosureElection === 'yes' &&
  formData.careType === 'institutional';

const showSpouseIncomePage = formData =>
  formData.financialDisclosureElection === 'yes' &&
  MARRIED_STATUSES.includes(formData.maritalStatus);

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/v0/extended_care_applications`,
  transformForSubmit: transform,
  trackingPrefix: 'hca-extended-care-',
  v3SegmentedProgressBar: true,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent,
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
    notFound:
      'Please start over to apply for extended care services.',
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
          title: 'Veteran information (Section I)',
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
          title: 'Insurance information (Section II)',
          uiSchema: insuranceInformationUiSchema,
          schema: insuranceInformationSchema,
        },
      },
    },
    spouseAndDependentsChapter: {
      title: 'Spouse and dependent information',
      pages: {
        maritalStatus: {
          path: 'marital-status',
          title: 'Marital and dependent status',
          uiSchema: maritalStatusUiSchema,
          schema: maritalStatusSchema,
        },
        spouseInformation: {
          path: 'spouse-information',
          title: 'Spouse information (Section III)',
          depends: showSpouseInfoPage,
          uiSchema: spouseInformationUiSchema,
          schema: spouseInformationSchema,
        },
        dependentInformation: {
          path: 'dependent-information',
          title: 'Dependent information (Section III)',
          depends: showDependentPages,
          uiSchema: dependentSummaryUiSchema,
          schema: dependentSummarySchema,
        },
      },
    },
    financialDisclosureChapter: {
      title: 'Financial disclosure',
      pages: {
        financialDisclosure: {
          path: 'financial-disclosure-election',
          title: 'Financial disclosure election (Section IV)',
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
          depends: showFinancialPages,
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
          depends: showInstitutionalPages,
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
          depends: showInstitutionalPages,
          uiSchema: liquidAssetsUiSchema,
          schema: liquidAssetsSchema,
        },
      },
    },
    grossIncomeVeteranChapter: {
      title: 'Veteran gross income',
      pages: {
        grossIncomeVeteran: {
          path: 'gross-income-veteran',
          title: 'Veteran gross income (Section VII)',
          depends: showFinancialPages,
          uiSchema: grossIncomeVeteranUiSchema,
          schema: grossIncomeVeteranSchema,
        },
      },
    },
    grossIncomeSpouseChapter: {
      title: 'Spouse gross income',
      pages: {
        grossIncomeSpouse: {
          path: 'gross-income-spouse',
          title: 'Spouse gross income (Section VII)',
          depends: showSpouseIncomePage,
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
          depends: showFinancialPages,
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
          uiSchema: poaDocumentsUiSchema,
          schema: poaDocumentsSchema,
        },
      },
    },
  },
};

export default formConfig;
export { formConfig };