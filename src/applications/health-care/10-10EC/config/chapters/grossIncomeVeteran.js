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

export const grossIncomeVeteranUiSchema = {
  employmentIncomeVeteran: currencyUI({
    title: 'Gross income from employment — Veteran',
    hint:
      'Include wages, bonuses, tips, severance pay, and accrued benefits. Enter 0 if none.',
    required: () => false,
  }),
  employmentIncomeFrequencyVeteran: selectUI({
    title: 'How often do you receive this employment income?',
    required: frequencyRequired('employmentIncomeVeteran'),
    hint: 'Select the frequency that matches how often you are paid',
    labels: FREQUENCY_OPTIONS,
    errorMessages: {
      required:
        'Please select how often you receive your employment income',
    },
  }),
  businessIncomeVeteran: currencyUI({
    title: 'Net income from farm, ranch, property, or business — Veteran',
    hint:
      'Enter income from a business minus business expenses. Enter 0 if none.',
    required: () => false,
  }),
  businessIncomeFrequencyVeteran: selectUI({
    title: 'How often do you receive this business income?',
    required: frequencyRequired('businessIncomeVeteran'),
    hint: 'Select the frequency that matches how often you receive this income',
    labels: FREQUENCY_OPTIONS,
    errorMessages: {
      required:
        'Please select how often you receive your business income',
    },
  }),
  otherIncomeVeteran: currencyUI({
    title: 'Other income — Veteran',
    hint:
      'Include Social Security, retirement, pension, interest, and dividends. Enter 0 if none.',
    required: () => false,
  }),
  otherIncomeFrequencyVeteran: selectUI({
    title: 'How often do you receive this other income?',
    required: frequencyRequired('otherIncomeVeteran'),
    hint: 'Select the frequency that matches how often you receive this income',
    labels: FREQUENCY_OPTIONS,
    errorMessages: {
      required:
        'Please select how often you receive your other income',
    },
  }),
};

export const grossIncomeVeteranSchema = {
  type: 'object',
  properties: {
    employmentIncomeVeteran: currencySchema,
    employmentIncomeFrequencyVeteran: selectSchema(FREQUENCY_KEYS),
    businessIncomeVeteran: currencySchema,
    businessIncomeFrequencyVeteran: selectSchema(FREQUENCY_KEYS),
    otherIncomeVeteran: currencySchema,
    otherIncomeFrequencyVeteran: selectSchema(FREQUENCY_KEYS),
  },
};