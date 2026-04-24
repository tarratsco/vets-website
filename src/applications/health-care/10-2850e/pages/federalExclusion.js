import {
  yesNoUI,
  yesNoSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const federalExclusionUiSchema = {
  adverseHistory: {
    federalExclusion: {
      'ui:title': 'Federal exclusion status',
      isCurrentlyExcluded: yesNoUI({
        title:
          'Are you currently listed on the HHS Office of Inspector General (OIG) List of Excluded Individuals and Entities, the SAM.gov excluded parties list, or any other federal healthcare program exclusion list?',
        description:
          'Individuals currently listed on the HHS OIG exclusion list or SAM.gov excluded parties list are not eligible for appointment to a VHA clinical position.',
        errorMessages: {
          required: 'Please indicate whether you are currently federally excluded.',
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