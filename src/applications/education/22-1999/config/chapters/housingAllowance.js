// src/applications/education/22-1999/config/chapters/housingAllowance.js
import React from 'react';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import VaCheckboxGroupField from 'platform/forms-system/src/js/web-component-fields/VaCheckboxGroupField';

const housingAllowancePage = {
  path: 'housing-allowance',
  title: 'Housing allowance ZIP code',
  depends: formData => {
    const isChapter33 =
      formData.benefitChapter &&
      formData.benefitChapter.chapterSelection === 'chapter33';
    const isAtLeastHalfTime =
      formData.creditClockHours &&
      formData.creditClockHours.calculatedTrainingTimePercent >= 50;
    return isChapter33 && isAtLeastHalfTime;
  },
  uiSchema: {
    'ui:title': 'Housing allowance ZIP code',
    'ui:description': () => (
      <va-alert status="info" visible class="vads-u-margin-bottom--2">
        <p className="vads-u-margin-top--0">
          For students enrolled exclusively online, VA uses a national average
          rate instead of a location-based Basic Allowance for Housing (BAH)
          rate. If more than 50% of courses are online, select the appropriate
          enrollment modality option below.
        </p>
      </va-alert>
    ),
    housingAllowance: {
      primaryCampusZipCode: {
        'ui:title': 'Primary campus ZIP code',
        'ui:webComponentField': VaTextInputField,
        'ui:description':
          'Enter the ZIP code where the student physically attends the majority of their classes. For online-only enrollment, enter the student\'s home ZIP code.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the primary campus ZIP code.',
          pattern: 'Enter a valid 5-digit ZIP code.',
        },
      },
      enrollmentModality: {
        'ui:title': 'Enrollment modality',
        'ui:webComponentField': VaCheckboxGroupField,
        'ui:required': () => true,
        'ui:description':
          'Select the option that best describes how the student is attending classes for this enrollment period.',
        'ui:errorMessages': {
          required: 'Select the enrollment modality.',
        },
        'ui:options': {
          labels: {
            ALL_IN_PERSON: 'All courses are in-person',
            MAJORITY_ONLINE: 'More than 50% of courses are online',
            EXCLUSIVELY_ONLINE: 'Exclusively online',
            HYBRID_LESS_THAN_50_ONLINE: 'Hybrid — less than 50% online',
          },
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      housingAllowance: {
        type: 'object',
        required: ['primaryCampusZipCode', 'enrollmentModality'],
        properties: {
          primaryCampusZipCode: {
            type: 'string',
            pattern: '^\\d{5}$',
          },
          enrollmentModality: {
            type: 'string',
            enum: [
              'ALL_IN_PERSON',
              'MAJORITY_ONLINE',
              'EXCLUSIVELY_ONLINE',
              'HYBRID_LESS_THAN_50_ONLINE',
            ],
          },
        },
      },
    },
  },
};

const housingAllowanceChapter = {
  title: 'Housing allowance',
  pages: {
    housingAllowancePage: housingAllowancePage,
  },
};

export default housingAllowanceChapter;