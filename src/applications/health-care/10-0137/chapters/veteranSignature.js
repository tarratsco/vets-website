import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  validateVeteranAttestation,
  validateSignatureDate,
} from '../utils/validations';

export const veteranSignatureUiSchema = {
  'ui:title': 'Sign your advance directive',
  'view:signatureInfo': {
    'ui:description': () => {
      const React = require('react');
      return React.createElement(
        'va-alert',
        { status: 'info', visible: true, class: 'vads-u-margin-bottom--4' },
        React.createElement('h3', { slot: 'headline' }, 'What signing means'),
        React.createElement(
          'p',
          null,
          'By completing this section, you are certifying that the information in this advance directive accurately reflects your health care preferences. Your typed name serves as your digital signature under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act).',
        ),
      );
    },
  },
  veteranAttestation: {
    'ui:title':
      'I certify that this form accurately describes my preferences',
    'ui:widget': 'checkbox',
    'ui:options': {
      hideEmptyValueInReview: true,
    },
    'ui:validations': [validateVeteranAttestation],
    'ui:errorMessages': {
      required:
        'You must certify that this form accurately describes your preferences before submitting',
    },
  },
  veteranSignatureName: textUI({
    title: 'Your full legal name (typed signature)',
    hint:
      'Type your full name as it appears on your VA record. This serves as your digital signature.',
    autocomplete: 'off',
    errorMessages: {
      required: 'Please enter your full legal name exactly as it appears in Part I',
    },
  }),
  veteranSignatureDate: currentOrPastDateUI({
    title: 'Date you are signing this form',
    hint: 'Enter today's date',
    errorMessages: {
      required: 'Please enter the date you are signing this form',
      pattern: 'Please enter a valid date. The date cannot be in the future.',
      futureDate:
        'Please enter a valid date. The date cannot be in the future.',
    },
  }),
  'view:signatureAccommodations': {
    'ui:description': () => {
      const React = require('react');
      return React.createElement(
        'va-additional-info',
        { trigger: 'Can't type your name? Accessibility options.' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            'If a physical impairment prevents you from completing this form digitally, please contact your VA care team for assistance. They can help you complete the paper form or provide other accommodations.',
          ),
          React.createElement(
            'p',
            null,
            'You can reach VA at ',
            React.createElement('va-telephone', { contact: '8006982411' }),
            ' (TTY: ',
            React.createElement('va-telephone', { contact: '711' }),
            ').',
          ),
        ),
      );
    },
  },
};

export const veteranSignatureSchema = {
  type: 'object',
  required: ['veteranAttestation', 'veteranSignatureName', 'veteranSignatureDate'],
  properties: {
    'view:signatureInfo': {
      type: 'object',
      properties: {},
    },
    veteranAttestation: {
      type: 'boolean',
    },
    veteranSignatureName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    veteranSignatureDate: currentOrPastDateSchema,
    'view:signatureAccommodations': {
      type: 'object',
      properties: {},
    },
  },
};