import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const financialDisclosureUiSchema = {
  financialDisclosureElection: radioUI({
    title: 'Do you want to provide your financial details?',
    required: () => true,
    hint:
      'We need to collect information about your income, assets, and expenses. If you choose not to provide this information, you will be charged the maximum copayment amount for all services.',
    labels: {
      yes: 'Yes, I am providing financial details for the current calendar year',
      no: 'No, I am not providing financial details. I understand I will be assessed the maximum copayment amount for extended care services.',
    },
    errorMessages: {
      required: 'Please select whether you want to provide financial details',
    },
  }),
};

export const financialDisclosureSchema = {
  type: 'object',
  required: ['financialDisclosureElection'],
  properties: {
    financialDisclosureElection: radioSchema(['yes', 'no']),
  },
};