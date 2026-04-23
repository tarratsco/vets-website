import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const healthCareAgentChoiceUiSchema = {
  appointHealthCareAgent: radioUI({
    title: 'Do you want to appoint a Health Care Agent?',
    hint:
      'A Health Care Agent is a person you trust to make health care decisions for you if you can't make them yourself.',
    labels: {
      appoint: 'Yes, I want to appoint a Health Care Agent',
      decline: 'I don't wish to appoint a Health Care Agent right now',
    },
    errorMessages: {
      required: 'Please select an option',
    },
    required: () => true,
  }),
  'view:agentInfo': {
    'ui:description': () => {
      const React = require('react');
      return React.createElement(
        'va-additional-info',
        { trigger: 'What is a Health Care Agent and what authority do they have?' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            'A Health Care Agent (also called a health care proxy or health care representative) is someone you choose to make health care decisions for you if you are unable to make or communicate those decisions yourself.',
          ),
          React.createElement(
            'p',
            null,
            'Your Health Care Agent can:',
          ),
          React.createElement(
            'ul',
            null,
            React.createElement('li', null, 'Access your medical records'),
            React.createElement('li', null, 'Talk with your health care team'),
            React.createElement('li', null, 'Make decisions about your care based on your wishes'),
            React.createElement('li', null, 'Accept or refuse treatments on your behalf'),
          ),
          React.createElement(
            'p',
            null,
            'Your Health Care Agent is authorized to act only if you are unable to make or communicate your own health care decisions.',
          ),
        ),
      );
    },
  },
};

export const healthCareAgentChoiceSchema = {
  type: 'object',
  required: ['appointHealthCareAgent'],
  properties: {
    appointHealthCareAgent: radioSchema(['appoint', 'decline']),
    'view:agentInfo': {
      type: 'object',
      properties: {},
    },
  },
};