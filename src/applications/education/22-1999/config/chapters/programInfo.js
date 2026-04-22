// src/applications/education/22-1999/config/chapters/programInfo.js
import React from 'react';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';
import VaRadioField from 'platform/forms-system/src/js/web-component-fields/VaRadioField';
import VaNumberInputField from 'platform/forms-system/src/js/web-component-fields/VaNumberInputField';

const DEGREE_OBJECTIVE_LABELS = {
  ASSOCIATE: 'Associate degree',
  BACHELOR: "Bachelor's degree",
  MASTER: "Master's degree",
  DOCTORAL: 'Doctoral degree',
  CERTIFICATE: 'Certificate',
  VOCATIONAL_CERTIFICATE: 'Vocational certificate',
  OJT: 'On-the-job training (OJT)',
  APPRENTICESHIP: 'Apprenticeship',
  FLIGHT: 'Flight training',
  LICENSING_CERTIFICATION_EXAM: 'Licensing / certification exam',
  CORRESPONDENCE: 'Correspondence training',
};

const programInfoPage = {
  path: 'program-info',
  title: 'Educational program details',
  uiSchema: {
    'ui:title': 'Educational program details',
    programInfo: {
      programName: {
        'ui:title': 'Name of educational or training program',
        'ui:webComponentField': VaTextInputField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the name of the educational or training program.',
        },
      },
      degreeObjective: {
        'ui:title': 'Degree or certificate objective',
        'ui:webComponentField': VaSelectField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select the degree or certificate objective.',
        },
        'ui:options': {
          labels: DEGREE_OBJECTIVE_LABELS,
        },
      },
      cipCode: {
        'ui:title': 'CIP code (optional)',
        'ui:webComponentField': VaTextInputField,
        'ui:description':
          'Optional but recommended. Enter the 6-digit Classification of Instructional Programs code in XX.XXXX format (e.g., 11.0101).',
        'ui:errorMessages': {
          pattern: 'Enter a valid CIP code in XX.XXXX format.',
        },
      },
      vaProgramApprovalNumber: {
        'ui:title': 'VA program approval number (optional)',
        'ui:webComponentField': VaTextInputField,
        'ui:description': 'The VA-assigned program approval number, if applicable.',
      },
      institutionalFullTimeCreditHourStandard: {
        'ui:title': 'Institutional full-time credit hour standard',
        'ui:webComponentField': VaNumberInputField,
        'ui:description':
          'The number of credit hours your institution considers full-time for this program (e.g., 12 for most undergraduate programs). This is used to calculate the student\'s training time percentage.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required:
            'Enter the institutional full-time credit hour standard.',
        },
      },
      trainingTimeType: {
        'ui:title': 'How is training time measured for this program?',
        'ui:webComponentField': VaRadioField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select whether training time is measured in credit hours or clock hours.',
        },
        'ui:options': {
          labels: {
            CREDIT_HOURS: 'Credit hours',
            CLOCK_HOURS: 'Clock hours',
          },
        },
      },
      'view:creditVsClockHoursHelp': {
        'ui:description': () => (
          <va-accordion class="vads-u-margin-top--2">
            <va-accordion-item header="What is the difference between credit hours and clock hours?">
              <p>
                <strong>Credit hours</strong> are used by most colleges and
                universities. One credit hour typically represents one hour of
                classroom instruction per week over a term.
              </p>
              <p>
                <strong>Clock hours</strong> are used by vocational, flight,
                and some non-college-degree programs. One clock hour equals
                60 minutes of supervised training.
              </p>
            </va-accordion-item>
          </va-accordion>
        ),
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      programInfo: {
        type: 'object',
        required: [
          'programName',
          'degreeObjective',
          'institutionalFullTimeCreditHourStandard',
          'trainingTimeType',
        ],
        properties: {
          programName: { type: 'string', minLength: 1, maxLength: 200 },
          degreeObjective: {
            type: 'string',
            enum: [
              'ASSOCIATE',
              'BACHELOR',
              'MASTER',
              'DOCTORAL',
              'CERTIFICATE',
              'VOCATIONAL_CERTIFICATE',
              'OJT',
              'APPRENTICESHIP',
              'FLIGHT',
              'LICENSING_CERTIFICATION_EXAM',
              'CORRESPONDENCE',
            ],
          },
          cipCode: {
            type: 'string',
            pattern: '^\\d{2}\\.\\d{4}$',
          },
          vaProgramApprovalNumber: { type: 'string', maxLength: 50 },
          institutionalFullTimeCreditHourStandard: {
            type: 'integer',
            minimum: 1,
            maximum: 99,
          },
          trainingTimeType: {
            type: 'string',
            enum: ['CREDIT_HOURS', 'CLOCK_HOURS'],
          },
        },
      },
      'view:creditVsClockHoursHelp': {
        type: 'object',
        properties: {},
      },
    },
  },
};

const programInfoChapter = {
  title: 'Educational program',
  pages: {
    programInfoPage: programInfoPage,
  },
};

export default programInfoChapter;