import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const additionalPreferencesUiSchema = {
  additionalPreferences: textareaUI({
    title: 'Other health care preferences',
    hint:
      'This section is optional. You can describe social, cultural, or faith-based preferences for your care, or preferences about specific treatments such as feeding tubes, blood transfusions, or pain medications.',
    charcount: true,
    errorMessages: {
      maxLength:
        'Your response is too long. Please shorten it to 4,000 characters or fewer.',
    },
  }),
};

export const additionalPreferencesSchema = {
  type: 'object',
  properties: {
    additionalPreferences: {
      type: 'string',
      maxLength: 4000,
    },
  },
};