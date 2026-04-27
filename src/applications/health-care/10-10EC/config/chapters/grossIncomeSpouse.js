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

export const grossIncomeSpouseUiSchema = {
  'view:spouseIncomeTitle': titleUI('Current gross income \u2014 Spouse (Section VII)'),
  spouseEmploymentIncome: currencyUI({
    title: 'Gross income from employment \u2014 Spouse',
    hint: 'Include wages, bonuses, tips, severance pay, and accrued benefits. Enter 0 if none.',
  }),
  spouseEmploymentIncomeFrequency: selectUI({
    title: 'How often does your spouse receive this income?',
    hint: 'Select the frequency that matches how often your spouse is paid',
    required: frequencyRequired('spouseEmploymentIncome'),
    labels: INCOME_FREQUENCY_LABELS,
    errorMessages: {
      required: 'Please select how often your spouse receives employment income',
    },
    hideIf: formData =>
      !formData.spouseEmploymentIncome ||
      parseFloat(formData.spouseEmploymentIncome) <= 0,
  }),
  spouseBusinessIncome: currencyUI({
    title: 'Net income from farm, ranch, property, or business \u2014 Spouse',
    hint: "Enter your spouse's business income minus business expenses. Enter 0 if none.",
  }),
  spouseBusinessIncomeFrequency: selectUI({
    title: 'How often does your spouse receive this income?',
    hint: 'Select the frequency that matches how often your spouse receives this payment',
    required: frequencyRequired('spouseBusinessIncome'),
    labels: INCOME_FREQUENCY_LABELS,
    errorMessages: {
      required: 'Please select how often your spouse receives business income',
    },
    hideIf: formData =>
      !formData.spouseBusinessIncome ||
      parseFloat(formData.spouseBusinessIncome) <= 0,
  }),
  spouseOtherIncome: currencyUI({
    title: 'Other income \u2014 Spouse',
    hint: 'Include Social Security, retirement, pension, interest, and dividends. Enter 0 if none.',
  }),
  spouseOtherIncomeFrequency: selectUI({
    title: 'How often does your spouse receive this income?',
    hint: 'Select the frequency that matches how often your spouse receives this payment',
    required: frequencyRequired('spouseOtherIncome'),
    labels: INCOME_FREQUENCY_LABELS,
    errorMessages: {
      required: 'Please select how often your spouse receives other income',
    },
    hideIf: formData =>
      !formData.spouseOtherIncome ||
      parseFloat(formData.spouseOtherIncome) <= 0,
  }),
};

export const grossIncomeSpouseSchema = {
  type: 'object',
  properties: {
    'view:spouseIncomeTitle': titleSchema,
    spouseEmploymentIncome: currencySchema,
    spouseEmploymentIncomeFrequency: selectSchema(INCOME_FREQUENCY_KEYS),
    spouseBusinessIncome: currencySchema,
    spouseBusinessIncomeFrequency: selectSchema(INCOME_FREQUENCY_KEYS),
    spouseOtherIncome: currencySchema,
    spouseOtherIncomeFrequency: selectSchema(INCOME_FREQUENCY_KEYS),
  },
};