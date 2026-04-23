import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const mentalHealthPreferencesUiSchema = {
  mentalHealthPreferences: textareaUI({
    title: 'Mental health care preferences',
    hint:
      'This section is optional. If you have a serious mental health condition, you may want to describe medications that have worked for you in the past, or mental health facilities or hospitals you prefer or want to avoid.',
    charcount: true,
    errorMessages: {
      maxLength:
        'Your response is too long. Please shorten it to 4,000 characters or fewer.',
    },
  }),
};

export const mentalHealthPreferencesSchema = {
  type: 'object',
  properties: {
    mentalHealthPreferences: {
      type: 'string',
      maxLength: 4000,
    },
  },
};