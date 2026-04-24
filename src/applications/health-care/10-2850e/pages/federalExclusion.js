import {
  yesNoUI,
  yesNoSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const federalExclusionUiSchema = {
  adverseHistory: {
    federalExclusion: {
      'ui:title': 'Federal Exclusion Status',
      isCurrentlyExcluded: yesNoUI({
        title:
          'Are you currently listed on the HHS Office of Inspector General (OIG) List of Excluded Individuals and Entities, the SAM.gov excluded parties list, or any other federal healthcare program exclusion list?',
        errorMessages: {
          required: 'Please answer whether you are currently on a federal exclusion list.',
        },
      }),
    },
  },
};

export const federalExclusionSchema = {
  type: 'object',
  properties: {
    adverseHistory: {
      type: 'object',
      properties: {
        federalExclusion: {
          type: 'object',
          required: ['isCurrentlyExcluded'],
          properties: {
            isCurrentlyExcluded: yesNoSchema,
          },
        },
      },
    },
  },
};