import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const strictnessUiSchema = {
  preferencesStrictness: radioUI({
    title: 'How strictly do you want your health care preferences followed?',
    hint:
      'Choose the option that best reflects how you want others to use your Living Will.',
    labels: {
      general_guide:
        'As a general guide — The person making decisions for me may decide something different if they think it's in my best interests',
      strictly_followed:
        'Strictly followed — My preferences must be followed even if the decision-maker thinks it isn't in my best interests',
    },
    errorMessages: {
      required:
        'Please select how strictly you want your preferences followed',
    },
  }),
  'view:strictnessInfo': {
    'ui:description': () => {
      const React = require('react');
      return React.createElement(
        'va-additional-info',
        { trigger: 'What is the difference between these options?' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'As a general guide:'),
            ' The person making decisions for you will consider your preferences but may exercise their own judgment if they believe it is in your best interest. This gives your decision-maker more flexibility.',
          ),
          React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'Strictly followed:'),
            ' Your preferences must be honored as written, even if your decision-maker believes a different choice would be better for you. This gives you more control but less flexibility for unforeseen circumstances.',
          ),
        ),
      );
    },
  },
};

export const strictnessSchema = {
  type: 'object',
  properties: {
    preferencesStrictness: radioSchema(['general_guide', 'strictly_followed']),
    'view:strictnessInfo': {
      type: 'object',
      properties: {},
    },
  },
};