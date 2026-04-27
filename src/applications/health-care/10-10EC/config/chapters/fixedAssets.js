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

export const fixedAssetsUiSchema = {
  fixedAssetsVeteranPrimaryResidence: currencyUI({
    title: 'Primary residence value — Veteran',
    hint:
      'Enter the market value of the primary residence minus any outstanding mortgages or liens. If you live with a non-institutionalized spouse, enter your combined value here.',
    required: () => false,
  }),
  fixedAssetsSpousePrimaryResidence: {
    ...currencyUI({
      title: 'Primary residence value — Spouse',
      hint:
        "Enter the market value of the spouse's primary residence minus any outstanding mortgages or liens, if separate from Veteran's primary residence.",
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showSpouseColumn(formData),
    },
  },
  fixedAssetsVeteranOtherResidences: currencyUI({
    title: 'Other residences, land, farm, or ranch value — Veteran',
    hint:
      'Enter the combined market value minus mortgages or liens for all second homes, vacation homes, rental properties, and farm or ranch land.',
    required: () => false,
  }),
  fixedAssetsSpouseOtherResidences: {
    ...currencyUI({
      title: 'Other residences, land, farm, or ranch value — Spouse',
      hint:
        "Enter the combined market value minus mortgages or liens for the spouse's other residences.",
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showSpouseColumn(formData),
    },
  },
  fixedAssetsVeteranVehicles: currencyUI({
    title: 'Vehicle value — Veteran',
    hint: 'Enter the value of your vehicle(s) minus any outstanding lien.',
    required: () => false,
  }),
  fixedAssetsSpouseVehicles: {
    ...currencyUI({
      title: 'Vehicle value — Spouse',
      hint:
        "Enter the value of the spouse's vehicle(s) minus any outstanding lien.",
      required: () => false,
    }),
    'ui:options': {
      hideIf: formData => !showSpouseColumn(formData),
    },
  },
};

export const fixedAssetsSchema = {
  type: 'object',
  properties: {
    fixedAssetsVeteranPrimaryResidence: currencySchema,
    fixedAssetsSpousePrimaryResidence: currencySchema,
    fixedAssetsVeteranOtherResidences: currencySchema,
    fixedAssetsSpouseOtherResidences: currencySchema,
    fixedAssetsVeteranVehicles: currencySchema,
    fixedAssetsSpouseVehicles: currencySchema,
  },
};