import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const CARE_TYPE_LABELS = {
  institutional:
    'Institutional extended care (nursing home, Community Living Center, inpatient — after 181+ days)',
  non_institutional:
    'Non-institutional extended care (home-based primary care, adult day health care, respite, domiciliary)',
};

export const careTypeUiSchema = {
  careType: radioUI({
    title: 'What type of extended care are you applying for?',
    required: () => true,
    hint:
      'Your answer determines whether Sections V and VI (Fixed Assets and Liquid Assets) apply to your application.',
    labels: CARE_TYPE_LABELS,
    errorMessages: {
      required: 'Please select the type of extended care you are applying for',
    },
  }),
};

export const careTypeSchema = {
  type: 'object',
  required: ['careType'],
  properties: {
    careType: radioSchema(['institutional', 'non_institutional']),
  },
};