import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const careTypeUiSchema = {
  careType: radioUI({
    title: 'What type of extended care are you applying for?',
    hint:
      'Your care type determines which financial sections of this form apply to you.',
    required: () => true,
    labels: {
      institutional:
        'Institutional extended care (inpatient / nursing home care)',
      non_institutional:
        'Non-institutional extended care (home-based, adult day health, respite, domiciliary)',
    },
    descriptions: {
      institutional:
        'Includes VA Community Living Centers, contract nursing homes, and inpatient extended care after 181 or more days',
      non_institutional:
        'Includes home-based primary care, adult day health care, homemaker/home health aide, respite care, and domiciliary care',
    },
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