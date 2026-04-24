import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const travelProviderCertificationUiSchema = {
  travel: {
    providerCertification: {
      'ui:title': 'Provider Certification (Section III)',
      dateOfService: currentOrPastDateUI({
        title: 'Date of service',
        hint:
          'Enter the date of the medical appointment for which you are claiming travel. Format: MM/DD/YYYY.',
        errorMessages: {
          required: 'Please enter the date of service.',
          pattern: 'Please enter a valid date of service.',
          futureDate: 'The date of service cannot be a future date.',
        },
      }),
      providerTaxId: textUI({
        title: 'Provider Tax ID number',
        hint:
          'Enter the Tax Identification Number (TIN) of the provider who certified services on the date of service. Ask your provider for this number.',
        errorMessages: {
          required: "Please enter the provider's Tax ID number.",
          pattern: 'Please enter a valid Tax ID number.',
        },
      }),
      providerSignature: textUI({
        title: 'Provider signature certifying service on service date',
        hint:
          "The form states: 'type if electronic.' Enter the provider's full name as their electronic signature certifying the service was provided on the date above. You may obtain this from your provider.",
        errorMessages: {
          required:
            "Please enter the provider's name as their electronic signature.",
        },
      }),
      providerWillBill: radioUI({
        title: 'Will the provider be billing for services?',
        hint:
          'If the provider is billing separately, your travel and miscellaneous expenses may still be reimbursed. However, the provider\'s service costs cannot be claimed on this form.',
        labels: {
          yes: 'Yes',
          no: 'No',
        },
        required: () => true,
        errorMessages: {
          required:
            'Please indicate whether the provider will be billing for services.',
        },
      }),
    },
  },
};

export const travelProviderCertificationSchema = {
  type: 'object',
  properties: {
    travel: {
      type: 'object',
      properties: {
        providerCertification: {
          type: 'object',
          required: [
            'dateOfService',
            'providerTaxId',
            'providerSignature',
            'providerWillBill',
          ],
          properties: {
            dateOfService: currentOrPastDateSchema,
            providerTaxId: {
              type: 'string',
              pattern: '^(\\d{2}-\\d{7}|\\d{3}-\\d{2}-\\d{4})$',
              minLength: 9,
              maxLength: 12,
            },
            providerSignature: {
              type: 'string',
              minLength: 1,
              maxLength: 60,
            },
            providerWillBill: radioSchema(['yes', 'no']),
          },
        },
      },
    },
  },
};