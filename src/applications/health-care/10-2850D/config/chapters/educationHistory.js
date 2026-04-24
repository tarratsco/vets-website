import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

const STATE_OPTIONS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI',
];

const educationItemUiSchema = {
  schoolName: textUI({
    title: 'Name of school',
    hint: 'Include all post-high school education through graduate and professional school.',
    errorMessages: {
      required: 'Enter the name of the school.',
    },
  }),
  city: textUI({
    title: 'City',
    hint: 'Enter city and state. For international institutions, enter city and country.',
    errorMessages: {
      required: 'Enter the city.',
    },
  }),
  state: textUI({
    title: 'State',
    hint: 'Enter state abbreviation or country name for international schools.',
  }),
  zipCode: textUI({
    title: 'ZIP code (optional)',
  }),
  startDate: {
    'ui:title': 'Start date',
    'ui:webComponentField': VaMemorableDateField,
    'ui:options': {
      hint: 'Enter the month, day, and year you started attending this school.',
    },
    'ui:errorMessages': {
      required: 'Enter the start date.',
      pattern: 'Enter a valid start date.',
    },
  },
  completionDate: {
    'ui:title': 'Completion date or expected completion date',
    'ui:webComponentField': VaMemorableDateField,
    'ui:options': {
      hint: 'If you have not yet completed this degree, enter your expected graduation date.',
    },
    'ui:errorMessages': {
      required: 'Enter the completion date or expected completion date.',
      pattern: 'Enter a valid date.',
    },
  },
  degreeType: textUI({
    title: 'Diploma, degree, or certificate awarded (or in progress)',
    hint:
      'For example: Bachelor of Science, Doctor of Medicine (MD), Doctor of Pharmacy (PharmD), Master of Social Work (MSW), Certificate of Completion.',
    errorMessages: {
      required: 'Enter the degree or certificate type.',
    },
  }),
  majorFieldOfStudy: textUI({
    title: 'Major field of study',
    errorMessages: {
      required: 'Enter your major field of study.',
    },
  }),
};

const educationItemSchema = {
  type: 'object',
  required: [
    'schoolName',
    'city',
    'startDate',
    'completionDate',
    'degreeType',
    'majorFieldOfStudy',
  ],
  properties: {
    schoolName: { type: 'string', minLength: 1, maxLength: 200 },
    city: { type: 'string', minLength: 1, maxLength: 100 },
    state: { type: 'string', maxLength: 100 },
    zipCode: { type: 'string', maxLength: 10 },
    startDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    completionDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    degreeType: { type: 'string', minLength: 1, maxLength: 100 },
    majorFieldOfStudy: { type: 'string', minLength: 1, maxLength: 100 },
  },
};

export const educationHistoryUiSchema = {
  education: {
    'ui:title': 'Education history',
    educationHistory: {
      'ui:options': {
        itemName: 'School or program',
        viewField: ({ formData }) =>
          formData.schoolName || 'Education entry',
        keepInPageOnReview: true,
        useDlWrap: false,
      },
      items: educationItemUiSchema,
    },
  },
};

export const educationHistorySchema = {
  type: 'object',
  properties: {
    education: {
      type: 'object',
      required: ['educationHistory'],
      properties: {
        educationHistory: {
          type: 'array',
          minItems: 1,
          items: educationItemSchema,
        },
      },
    },
  },
};