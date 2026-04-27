import {
  currencyUI,
  currencySchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const MARRIED_STATUSES_WITH_SPOUSE_COLUMNS = [
  'married_living_with',
  'married_separate_not_institutionalized',
  'married_separate_institutionalized',
];

const showSpouseColumn = formData =>
  MARRIED_STATUSES_WITH_SPOUSE_COLUMNS.includes(formData.maritalStatus) &&
  formData.maritalStatus !== 'divorced_separated_widowed_this_year';

const showHouseholdEffects = formData =>
  formData.maritalStatus === 'single_no_dependent' ||
  formData.maritalStatus === 'married_separate_institutionalized';

export const liquidAssetsUiSchema = {
  liquidAssetsVeteranCashAndInvestments: currencyUI({
    title: 'Cash and investments — Veteran',
    hint:
      'Include cash, checking and savings accounts, certificates of deposit, individual retirement accounts (IRAs), stocks, and bonds.',
    required: () => false,
  }),
  liquidAssetsSpouseCashAndInvestments: {
    ...currencyUI({
      title: 'Cash and investments — Spouse',
      hint:
        "Include the spouse's cash, checking and savings accounts, certificates of deposit, IRAs, stocks, and bonds.",
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showSpouseColumn(formData),
    },
  },
  liquidAssetsVeteranOtherLiquidAssets: currencyUI({
    title: 'Other liquid assets — Veteran',
    hint:
      'Include art, rare coins, stamp collections, and other collectibles. Enter the value minus the amount you owe on these items.',
    required: () => false,
  }),
  liquidAssetsSpouseOtherLiquidAssets: {
    ...currencyUI({
      title: 'Other liquid assets — Spouse',
      hint:
        "Include the spouse's art, rare coins, stamp collections, and other collectibles. Enter the value minus amounts owed.",
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showSpouseColumn(formData),
    },
  },
  liquidAssetsVeteranHouseholdEffects: {
    ...currencyUI({
      title: 'Household effects — Veteran',
      hint:
        'Include the value of clothing, jewelry, and personal items. Report this only if you have no spouse or dependent residing in the community.',
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showHouseholdEffects(formData),
    },
  },
  liquidAssetsSpouseHouseholdEffects: {
    ...currencyUI({
      title: "Household effects — Spouse",
      hint:
        "Include the value of the spouse's clothing, jewelry, and personal items.",
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showSpouseColumn(formData),
    },
  },
};

export const liquidAssetsSchema = {
  type: 'object',
  properties: {
    liquidAssetsVeteranCashAndInvestments: currencySchema,
    liquidAssetsSpouseCashAndInvestments: currencySchema,
    liquidAssetsVeteranOtherLiquidAssets: currencySchema,
    liquidAssetsSpouseOtherLiquidAssets: currencySchema,
    liquidAssetsVeteranHouseholdEffects: currencySchema,
    liquidAssetsSpouseHouseholdEffects: currencySchema,
  },
};