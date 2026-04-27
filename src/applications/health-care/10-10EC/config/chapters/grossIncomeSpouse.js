import {
  currencyUI,
  currencySchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const FREQUENCY_OPTIONS = {
  annually: 'Annually',
  monthly: 'Monthly',
  twice_monthly: 'Twice monthly (24 times per year)',
  bi_weekly: 'Bi-weekly (every 2 weeks, 26 times per year)',
  weekly: 'Weekly',
};

const FREQUENCY_KEYS = Object.keys(FREQUENCY_OPTIONS);

const frequencyRequired = amountKey => formData => {
  const amount = formData[amountKey];
  return amount !== null && amount !== undefined && amount !== '' && parseFloat(amount) > 0;
};

export const grossIncomeSpouseUiSchema = {
  employmentIncomeSpouse: currencyUI({
    title: 'Gross income from employment — Spouse',
    hint:
      "Include your spouse's wages, bonuses, tips, severance pay, and accrued benefits. Enter 0 if none.",
    required: () => false,
  }),
  employmentIncomeFrequencySpouse: selectUI({
    title: 'How often does your spouse receive this employment income?',
    required: frequencyRequired('employmentIncomeSpouse'),
    hint: 'Select the frequency that matches how often your spouse is paid',
    labels: FREQUENCY_OPTIONS,
    errorMessages: {
      required:
        "Please select how often your spouse receives employment income",
    },
  }),
  businessIncomeSpouse: currencyUI({
    title: 'Net income from farm, ranch, property, or business — Spouse',
    hint:
      "Enter your spouse's income from a business minus business expenses. Enter 0 if none.",
    required: () => false,
  }),
  businessIncomeFrequencySpouse: selectUI({
    title: 'How often does your spouse receive this business income?',
    required: frequencyRequired('businessIncomeSpouse'),
    hint: 'Select the frequency that matches how often your spouse receives this income',
    labels: FREQUENCY_OPTIONS,
    errorMessages: {
      required:
        "Please select how often your spouse receives business income",
    },
  }),
  otherIncomeSpouse: currencyUI({
    title: 'Other income — Spouse',
    hint:
      "Include your spouse's Social Security, retirement, pension, interest, and dividends. Enter 0 if none.",
    required: () => false,
  }),
  otherIncomeFrequencySpouse: selectUI({
    title: 'How often does your spouse receive this other income?',
    required: frequencyRequired('otherIncomeSpouse'),
    hint: 'Select the frequency that matches how often your spouse receives this income',
    labels: FREQUENCY_OPTIONS,
    errorMessages: {
      required:
        "Please select how often your spouse receives other income",
    },
  }),
};

export const grossIncomeSpouseSchema = {
  type: 'object',
  properties: {
    employmentIncomeSpouse: currencySchema,
    employmentIncomeFrequencySpouse: selectSchema(FREQUENCY_KEYS),
    businessIncomeSpouse: currencySchema,
    businessIncomeFrequencySpouse: selectSchema(FREQUENCY_KEYS),
    otherIncomeSpouse: currencySchema,
    otherIncomeFrequencySpouse: selectSchema(FREQUENCY_KEYS),
  },
};