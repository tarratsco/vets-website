import {
  currencyUI,
  currencySchema,
  selectUI,
  selectSchema,
  titleUI,
  titleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const INCOME_FREQUENCY_LABELS = {
  annually: 'Annually',
  monthly: 'Monthly',
  twice_monthly: 'Twice monthly (24 times per year)',
  bi_weekly: 'Bi-weekly (every 2 weeks, 26 times per year)',
  weekly: 'Weekly',
};

const INCOME_FREQUENCY_KEYS = Object.keys(INCOME_FREQUENCY_LABELS);

const frequencyRequired = amountKey => formData =>
  formData[amountKey] !== undefined &&
  formData[amountKey] !== null &&
  formData[amountKey] !== '' &&
  parseFloat(formData[amountKey]) > 0;

export const grossIncomeVeteranUiSchema = {
  'view:veteranIncomeTitle': titleUI('Current gross income \u2014 Veteran (Section VII)'),
  veteranEmploymentIncome: currencyUI({
    title: 'Gross income from employment \u2014 Veteran',
    hint: 'Include wages, bonuses, tips, severance pay, and accrued benefits. Enter 0 if none.',
  }),
  veteranEmploymentIncomeFrequency: selectUI({
    title: 'How often do you receive this income?',
    hint: 'Select the frequency that matches how often you are paid',
    required: frequencyRequired('veteranEmploymentIncome'),
    labels: INCOME_FREQUENCY_LABELS,
    errorMessages: {
      required: 'Please select how often you receive your employment income',
    },
    hideIf: formData =>
      !formData.veteranEmploymentIncome ||
      parseFloat(formData.veteranEmploymentIncome) <= 0,
  }),
  veteranBusinessIncome: currencyUI({
    title: 'Net income from farm, ranch, property, or business \u2014 Veteran',
    hint: 'Enter income from a business minus business expenses. Enter 0 if none.',
  }),
  veteranBusinessIncomeFrequency: selectUI({
    title: 'How often do you receive this income?',
    hint: 'Select the frequency that matches how often you receive this payment',
    required: frequencyRequired('veteranBusinessIncome'),
    labels: INCOME_FREQUENCY_LABELS,
    errorMessages: {
      required: 'Please select how often you receive your business income',
    },
    hideIf: formData =>
      !formData.veteranBusinessIncome ||
      parseFloat(formData.veteranBusinessIncome) <= 0,
  }),
  veteranOtherIncome: currencyUI({
    title: 'Other income \u2014 Veteran',
    hint: 'Include Social Security, retirement, pension, interest, and dividends. Enter 0 if none.',
  }),
  veteranOtherIncomeFrequency: selectUI({
    title: 'How often do you receive this income?',
    hint: 'Select the frequency that matches how often you receive this payment',
    required: frequencyRequired('veteranOtherIncome'),
    labels: INCOME_FREQUENCY_LABELS,
    errorMessages: {
      required: 'Please select how often you receive your other income',
    },
    hideIf: formData =>
      !formData.veteranOtherIncome ||
      parseFloat(formData.veteranOtherIncome) <= 0,
  }),
};

export const grossIncomeVeteranSchema = {
  type: 'object',
  properties: {
    'view:veteranIncomeTitle': titleSchema,
    veteranEmploymentIncome: currencySchema,
    veteranEmploymentIncomeFrequency: selectSchema(INCOME_FREQUENCY_KEYS),
    veteranBusinessIncome: currencySchema,
    veteranBusinessIncomeFrequency: selectSchema(INCOME_FREQUENCY_KEYS),
    veteranOtherIncome: currencySchema,
    veteranOtherIncomeFrequency: selectSchema(INCOME_FREQUENCY_KEYS),
  },
};