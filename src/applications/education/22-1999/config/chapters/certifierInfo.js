// src/applications/education/22-1999/config/chapters/certifierInfo.js
import React from 'react';
import {
  titleUI,
  descriptionUI,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

const certifierInfoPage = {
  path: 'certifier-info',
  title: 'Certifying official information',
  uiSchema: {
    'ui:title': 'Certifying official information',
    'ui:description': () => (
      <va-alert status="info" visible class="vads-u-margin-bottom--2">
        <p className="vads-u-margin-top--0">
          Some fields below may be pre-filled from your Login.gov or ID.me
          profile. Please verify all information is correct before continuing.
        </p>
      </va-alert>
    ),
    certifierInfo: {
      'ui:title': 'Your information as the certifying official',
      firstName: {
        'ui:title': 'First name',
        'ui:webComponentField': VaTextInputField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter your first name.',
        },
      },
      lastName: {
        'ui:title': 'Last name',
        'ui:webComponentField': VaTextInputField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter your last name.',
        },
      },
      title: {
        'ui:title': 'Job title',
        'ui:webComponentField': VaTextInputField,
        'ui:description':
          'Your official title at the institution (e.g., School Certifying Official, Registrar).',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter your job title.',
        },
      },
      email: {
        'ui:title': 'Institutional email address',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          inputType: 'email',
        },
        'ui:description':
          'Use your official school or employer email address, not a personal email. VA may use this to contact you about this certification.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter a valid institutional email address.',
          pattern: 'Enter a valid email address in the format: name@example.com.',
        },
      },
      phone: {
        'ui:title': 'Daytime phone number',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          inputType: 'tel',
        },
        'ui:description':
          'Include area code. We may call this number if we have questions about this certification.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter a 10-digit U.S. phone number including area code.',
          pattern: 'Enter a 10-digit U.S. phone number including area code.',
        },
      },
      scoRegistrationNumber: {
        'ui:title': 'SCO registration number',
        'ui:webComponentField': VaTextInputField,
        'ui:description':
          'Your VA-assigned School Certifying Official registration number. You can find this in your VA-ONCE account profile or your SCO authorization letter from VA Education Service.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required:
            'Enter your SCO registration number. This is a 6–12 character code from your VA SCO authorization letter.',
          pattern:
            'Enter your SCO registration number. This is a 6–12 character alphanumeric code.',
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      certifierInfo: {
        type: 'object',
        required: [
          'firstName',
          'lastName',
          'title',
          'email',
          'phone',
          'scoRegistrationNumber',
        ],
        properties: {
          firstName: { type: 'string', minLength: 1, maxLength: 50 },
          lastName: { type: 'string', minLength: 1, maxLength: 50 },
          title: { type: 'string', minLength: 1, maxLength: 100 },
          email: {
            type: 'string',
            minLength: 6,
            maxLength: 254,
            pattern: '^[^@]+@[^@]+\\.[^@]+$',
          },
          phone: { type: 'string', pattern: '^\\d{10}$' },
          scoRegistrationNumber: {
            type: 'string',
            pattern: '^[A-Z0-9]{6,12}$',
            minLength: 6,
            maxLength: 12,
          },
        },
      },
    },
  },
};

const certifierInfoChapter = {
  title: 'Certifying official',
  pages: {
    certifierInfoPage: certifierInfoPage,
  },
};

export default certifierInfoChapter;