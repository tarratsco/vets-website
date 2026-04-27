import {
  currencyUI,
  currencySchema,
  titleUI,
  titleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { MARRIED_STATUSES } from './maritalStatus';

const showSpouseColumn = formData =>
  MARRIED_STATUSES.includes(formData.maritalStatus) &&
  formData.maritalStatus !== 'divorced_separated_widowed_this_year';

const showHouseholdEffects = formData =>
  formData.maritalStatus === 'single_no_dependent' ||
  formData.maritalStatus === 'married_separate_institutionalized' ||
  formData.maritalStatus === 'divorced_separated_widowed_this_year';

export const liquidAssetsUiSchema = {
  'view:liquidAssetsTitle': titleUI('Liquid assets (Section VI)'),
  veteranCashAndInvestments: currencyUI({
    title: 'Cash and investments \u2014 Veteran',
    hint:
      'Include cash, checking and savings accounts, certificates of deposit, individual retirement accounts (IRAs), stocks, and bonds.',
  }),
  spouseCashAndInvestments: currencyUI({
    title: 'Cash and investments \u2014 Spouse',
    hint:
      "Include the spouse's cash, checking and savings accounts, CDs, IRAs, stocks, and bonds.",
    hideIf: formData => !showSpouseColumn(formData),
  }),
  veteranOtherLiquidAssets: currencyUI({
    title: 'Other liquid assets \u2014 Veteran',
    hint:
      'Include art, rare coins, stamp collections, and other collectibles. Enter the value minus the amount you owe on these items.',
  }),
  spouseOtherLiquidAssets: currencyUI({
    title: 'Other liquid assets \u2014 Spouse',
    hint:
      "Include the spouse's art, rare coins, stamp collections, and other collectibles.",
    hideIf: formData => !showSpouseColumn(formData),
  }),
  veteranHouseholdEffects: currencyUI({
    title: 'Household effects \u2014 Veteran',
    hint:
      'Include the value of clothing, jewelry, and personal items. Report this only if you have no spouse or dependent residing in the community.',
    hideIf: formData => !showHouseholdEffects(formData),
  }),
  spouseHouseholdEffects: currencyUI({
    title: 'Household effects \u2014 Spouse',
    hint:
      "Include the spouse's clothing, jewelry, and personal items.",
    hideIf: formData =>
      !showSpouseColumn(formData) || !showHouseholdEffects(formData),
  }),
};

export const liquidAssetsSchema = {
  type: 'object',
  properties: {
    'view:liquidAssetsTitle': titleSchema,
    veteranCashAndInvestments: currencySchema,
    spouseCashAndInvestments: currencySchema,
    veteranOtherLiquidAssets: currencySchema,
    spouseOtherLiquidAssets: currencySchema,
    veteranHouseholdEffects: currencySchema,
    spouseHouseholdEffects: currencySchema,
  },
};