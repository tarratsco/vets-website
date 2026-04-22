// src/applications/education/22-1999/config/chapters/enrollmentPeriod.js
import React from 'react';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';
import VaRadioField from 'platform/forms-system/src/js/web-component-fields/VaRadioField';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

const enrollmentPeriodPage = {
  path: 'enrollment-period',
  title: 'Enrollment period',
  uiSchema: {
    'ui:title': 'Enrollment period',
    enrollmentPeriod: {
      enrollmentBeginDate: {
        'ui:title': 'Enrollment begin date',
        'ui:webComponentField': VaMemorableDateField,
        'ui:description':
          'Enter the first day of class, not the registration date.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the enrollment begin date.',
          pattern: 'Enter a valid enrollment begin date.',
        },
      },
      enrollmentEndDate: {
        'ui:title': 'Enrollment end date',
        'ui:webComponentField': VaMemorableDateField,
        'ui:description':
          'Enter the last scheduled day of class for the term.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the enrollment end date.',
          pattern: 'Enter a valid enrollment end date.',
        },
      },
      certificationTypeSelection: {
        'ui:title': 'Is this an initial certification or an amendment?',
        'ui:webComponentField': VaRadioField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select whether this is an initial certification or an amendment.',
        },
        'ui:options': {
          labels: {
            initial: 'Initial certification',
            amendment: 'Amendment / correction to a prior certification',
          },
        },
      },
      'view:amendmentWarning': {
        'ui:description': formData =>
          formData.enrollmentPeriod &&
          formData.enrollmentPeriod.certificationTypeSelection ===
            'amendment' ? (
            <va-alert status="warning" visible class="vads-u-margin-bottom--2">
              <p className="vads-u-margin-top--0">
                You must reference the original certification confirmation
                number on the next screen. Amendments must be submitted within
                30 days of the effective date of the enrollment change.
              </p>
            </va-alert>
          ) : null,
      },
      termName: {
        'ui:title': 'Term name or identifier (optional)',
        'ui:webComponentField': VaTextInputField,
        'ui:description':
          'Enter the term name to help match this certification to the academic calendar on file (e.g., "Fall 2025").',
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      enrollmentPeriod: {
        type: 'object',
        required: [
          'enrollmentBeginDate',
          'enrollmentEndDate',
          'certificationTypeSelection',
        ],
        properties: {
          enrollmentBeginDate: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          },
          enrollmentEndDate: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          },
          certificationTypeSelection: {
            type: 'string',
            enum: ['initial', 'amendment'],
          },
          termName: { type: 'string', maxLength: 100 },
        },
      },
      'view:amendmentWarning': {
        type: 'object',
        properties: {},
      },
    },
  },
};

const enrollmentPeriodChapter = {
  title: 'Enrollment period',
  pages: {
    enrollmentPeriodPage: enrollmentPeriodPage,
  },
};

export default enrollmentPeriodChapter;