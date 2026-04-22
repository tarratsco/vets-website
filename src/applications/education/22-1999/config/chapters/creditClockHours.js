// src/applications/education/22-1999/config/chapters/creditClockHours.js
import React from 'react';
import VaNumberInputField from 'platform/forms-system/src/js/web-component-fields/VaNumberInputField';
import VaCheckboxGroupField from 'platform/forms-system/src/js/web-component-fields/VaCheckboxGroupField';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import TrainingTimeCalculator from '../../components/TrainingTimeCalculator';

const creditHoursPage = {
  path: 'credit-clock-hours',
  title: 'Credit or clock hours enrolled',
  uiSchema: {
    'ui:title': 'Credit or clock hours enrolled',
    creditClockHours: {
      creditHoursEnrolled: {
        'ui:title': 'Number of credit hours enrolled',
        'ui:webComponentField': VaNumberInputField,
        'ui:required': formData =>
          formData.programInfo &&
          formData.programInfo.trainingTimeType === 'CREDIT_HOURS',
        'ui:depends': formData =>
          formData.programInfo &&
          formData.programInfo.trainingTimeType === 'CREDIT_HOURS',
        'ui:errorMessages': {
          required: 'Enter the number of credit hours enrolled.',
        },
      },
      clockHoursPerWeek: {
        'ui:title': 'Number of clock hours per week',
        'ui:webComponentField': VaNumberInputField,
        'ui:required': formData =>
          formData.programInfo &&
          formData.programInfo.trainingTimeType === 'CLOCK_HOURS',
        'ui:depends': formData =>
          formData.programInfo &&
          formData.programInfo.trainingTimeType === 'CLOCK_HOURS',
        'ui:errorMessages': {
          required: 'Enter the number of clock hours per week.',
        },
      },
      clockHoursForEnrollmentPeriod: {
        'ui:title': 'Total clock hours for this enrollment period',
        'ui:webComponentField': VaNumberInputField,
        'ui:required': formData =>
          formData.programInfo &&
          formData.programInfo.trainingTimeType === 'CLOCK_HOURS',
        'ui:depends': formData =>
          formData.programInfo &&
          formData.programInfo.trainingTimeType === 'CLOCK_HOURS',
        'ui:errorMessages': {
          required: 'Enter the total clock hours for the enrollment period.',
        },
      },
      courseTypes: {
        'ui:title': 'Types of courses included in this enrollment',
        'ui:webComponentField': VaCheckboxGroupField,
        'ui:description': 'Select all that apply.',
        'ui:options': {
          labels: {
            REGULAR_DEGREE: 'Regular / degree-applicable courses',
            REMEDIAL_DEFICIENCY: 'Remedial or deficiency courses',
            INDEPENDENT_STUDY: 'Independent study',
            ONLINE_DISTANCE: 'Online / distance learning',
            WORK_STUDY: 'Work-study',
          },
        },
      },
      onlineCreditHours: {
        'ui:title': 'Number of online or distance learning credit hours',
        'ui:webComponentField': VaNumberInputField,
        'ui:description':
          'Enter the number of the total credit hours above that are delivered online. This is used for Chapter 33 Monthly Housing Allowance calculation.',
      },
      'view:trainingTimeCalculator': {
        'ui:field': TrainingTimeCalculator,
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      creditClockHours: {
        type: 'object',
        properties: {
          creditHoursEnrolled: { type: 'integer', minimum: 0, maximum: 99 },
          clockHoursPerWeek: { type: 'integer', minimum: 0, maximum: 168 },
          clockHoursForEnrollmentPeriod: {
            type: 'integer',
            minimum: 0,
            maximum: 9999,
          },
          courseTypes: {
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'string',
              enum: [
                'REGULAR_DEGREE',
                'REMEDIAL_DEFICIENCY',
                'INDEPENDENT_STUDY',
                'ONLINE_DISTANCE',
                'WORK_STUDY',
              ],
            },
          },
          onlineCreditHours: { type: 'integer', minimum: 0, maximum: 99 },
          calculatedTrainingTimePercent: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
          },
          trainingTimeTier: {
            type: 'string',
            enum: [
              'FULL_TIME',
              'THREE_QUARTER_TIME',
              'HALF_TIME',
              'LESS_THAN_HALF_TIME',
            ],
          },
        },
      },
      'view:trainingTimeCalculator': {
        type: 'object',
        properties: {},
      },
    },
  },
};

const creditClockHoursChapter = {
  title: 'Credit and clock hours',
  pages: {
    creditHoursPage: creditHoursPage,
  },
};

export default creditClockHoursChapter;