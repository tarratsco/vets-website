// src/applications/education/22-1999/config/chapters/institutionInfo.js
import React from 'react';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';
import SchoolFacilityCodeLookup from '../../components/SchoolFacilityCodeLookup';

const INSTITUTION_TYPE_OPTIONS = [
  { value: 'IHL', label: 'Institution of Higher Learning (IHL)' },
  { value: 'OJT_APPRENTICESHIP', label: 'OJT / Apprenticeship' },
  { value: 'NON_COLLEGE_DEGREE', label: 'Non-College Degree / Vocational' },
  { value: 'FLIGHT', label: 'Flight Training' },
  { value: 'NATIONAL_EXAM', label: 'National Exam' },
  { value: 'FOREIGN_SCHOOL', label: 'Foreign School' },
];

const institutionInfoPage = {
  path: 'institution-info',
  title: 'Institution information',
  uiSchema: {
    'ui:title': 'Institution information',
    institutionInfo: {
      schoolFacilityCode: {
        'ui:title': 'School Facility Code (SFC)',
        'ui:field': SchoolFacilityCodeLookup,
        'ui:description':
          'Enter the 8-digit VA-assigned School Facility Code. The institution name and address will be populated automatically.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the 8-digit VA School Facility Code.',
          pattern: 'Enter a valid 8-digit School Facility Code.',
        },
      },
      institutionName: {
        'ui:title': 'Institution name',
        'ui:webComponentField': VaTextInputField,
        'ui:description': 'This will be auto-populated after a successful SFC lookup. Verify the name is correct.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the institution name.',
        },
      },
      institutionType: {
        'ui:title': 'Institution type',
        'ui:webComponentField': VaSelectField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select the institution type.',
        },
        'ui:options': {
          labels: INSTITUTION_TYPE_OPTIONS.reduce((acc, opt) => {
            acc[opt.value] = opt.label;
            return acc;
          }, {}),
        },
      },
      institutionAddress: {
        'ui:title': 'Institution address',
        street: {
          'ui:title': 'Street address',
          'ui:webComponentField': VaTextInputField,
          'ui:required': () => true,
          'ui:errorMessages': {
            required: 'Enter the street address.',
          },
        },
        street2: {
          'ui:title': 'Street address line 2',
          'ui:webComponentField': VaTextInputField,
        },
        city: {
          'ui:title': 'City',
          'ui:webComponentField': VaTextInputField,
          'ui:required': () => true,
          'ui:errorMessages': {
            required: 'Enter the city.',
          },
        },
        state: {
          'ui:title': 'State / Province',
          'ui:webComponentField': VaTextInputField,
        },
        postalCode: {
          'ui:title': 'ZIP / Postal code',
          'ui:webComponentField': VaTextInputField,
        },
        country: {
          'ui:title': 'Country',
          'ui:webComponentField': VaTextInputField,
          'ui:description': 'Required for foreign schools.',
        },
      },
      vaRegionalProcessingOffice: {
        'ui:title': 'VA Regional Processing Office',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          readOnly: true,
        },
        'ui:description':
          'Auto-populated based on the institution state or country.',
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      institutionInfo: {
        type: 'object',
        required: [
          'schoolFacilityCode',
          'institutionName',
          'institutionType',
          'institutionAddress',
        ],
        properties: {
          schoolFacilityCode: {
            type: 'string',
            pattern: '^\\d{8}$',
            minLength: 8,
            maxLength: 8,
          },
          institutionName: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
          },
          institutionType: {
            type: 'string',
            enum: [
              'IHL',
              'OJT_APPRENTICESHIP',
              'NON_COLLEGE_DEGREE',
              'FLIGHT',
              'NATIONAL_EXAM',
              'FOREIGN_SCHOOL',
            ],
          },
          institutionAddress: {
            type: 'object',
            required: ['street', 'city'],
            properties: {
              street: { type: 'string', minLength: 1, maxLength: 100 },
              street2: { type: 'string', maxLength: 100 },
              city: { type: 'string', minLength: 1, maxLength: 100 },
              state: { type: 'string', maxLength: 50 },
              postalCode: { type: 'string', maxLength: 20 },
              country: { type: 'string', maxLength: 100 },
            },
          },
          vaRegionalProcessingOffice: {
            type: 'string',
            enum: ['BUFFALO', 'MUSKOGEE', 'ST_LOUIS'],
          },
          sfcLookupSuccess: { type: 'boolean' },
        },
      },
    },
  },
};

const institutionInfoChapter = {
  title: 'Institution information',
  pages: {
    institutionInfoPage: institutionInfoPage,
  },
};

export default institutionInfoChapter;