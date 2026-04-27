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

export const fixedAssetsUiSchema = {
  'view:fixedAssetsTitle': titleUI('Fixed assets (Section V)'),
  veteranPrimaryResidence: currencyUI({
    title: 'Primary residence value \u2014 Veteran',
    hint:
      'Enter the market value of the primary residence minus any outstanding mortgages or liens. If you live with a non-institutionalized spouse, enter your combined value here.',
  }),
  spousePrimaryResidence: currencyUI({
    title: 'Primary residence value \u2014 Spouse',
    hint:
      "Enter the market value of the spouse's primary residence minus any outstanding mortgages or liens, if separate from Veteran's primary residence.",
    hideIf: formData => !showSpouseColumn(formData),
  }),
  veteranOtherResidences: currencyUI({
    title:
      'Other residences, land, farm, or ranch value \u2014 Veteran',
    hint:
      'Enter the combined market value minus mortgages or liens for all second homes, vacation homes, rental properties, and farm or ranch land.',
  }),
  spouseOtherResidences: currencyUI({
    title:
      'Other residences, land, farm, or ranch value \u2014 Spouse',
    hint:
      "Enter the combined market value minus mortgages or liens for the spouse's other residences.",
    hideIf: formData => !showSpouseColumn(formData),
  }),
  veteranVehicles: currencyUI({
    title: 'Vehicle value \u2014 Veteran',
    hint: 'Enter the value of your vehicle(s) minus any outstanding lien.',
  }),
  spouseVehicles: currencyUI({
    title: 'Vehicle value \u2014 Spouse',
    hint:
      "Enter the value of the spouse's vehicle(s) minus any outstanding lien.",
    hideIf: formData => !showSpouseColumn(formData),
  }),
};

export const fixedAssetsSchema = {
  type: 'object',
  properties: {
    'view:fixedAssetsTitle': titleSchema,
    veteranPrimaryResidence: currencySchema,
    spousePrimaryResidence: currencySchema,
    veteranOtherResidences: currencySchema,
    spouseOtherResidences: currencySchema,
    veteranVehicles: currencySchema,
    spouseVehicles: currencySchema,
  },
};