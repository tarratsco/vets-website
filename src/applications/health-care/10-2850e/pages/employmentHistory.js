import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  yesNoUI,
  yesNoSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const EMPLOYER_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'Outside the United States',
];

export const employmentHistoryUiSchema = {
  employmentHistory: {
    'ui:title': 'Employment history',
    'ui:description':
      'List all positions held in the past 10 years, including your current position. If there are gaps of 30 or more days between positions, you will be asked to explain them.',
    'ui:options': {
      itemName: 'Employment entry',
      viewField: ({ formData }) =>
        `${formData.positionTitle || 'Position'} at ${formData.employerName || 'Employer'}`,
    },
    items: {
      employerName: textUI({
        title: 'Employer or facility name',
        errorMessages: { required: 'Please enter the employer name.' },
      }),
      employerStreetAddress: textUI({
        title: 'Employer street address',
        errorMessages: { required: 'Please enter the employer street address.' },
      }),
      employerCity: textUI({
        title: 'City',
        errorMessages: { required: 'Please enter the city.' },
      }),
      employerState: selectUI({
        title: 'State',
        errorMessages: { required: 'Please select the state.' },
      }),
      positionTitle: textUI({
        title: 'Position title or job title',
        errorMessages: { required: 'Please enter your position title.' },
      }),
      department: textUI({
        title: 'Department, unit, or service',
      }),
      startDate: currentOrPastDateUI({
        title: 'Start date of employment',
        errorMessages: {
          required: 'Please enter the employment start date.',
          futureDate: 'Start date cannot be in the future.',
        },
      }),
      isCurrentPosition: yesNoUI({
        title: 'Do you currently work here?',
      }),
      endDate: {
        ...currentOrPastDateUI({
          title: 'End date of employment',
          hint: 'Leave blank if this is your current position.',
        }),
        'ui:options': {
          hideIf: formData => formData?.isCurrentPosition === true,
          expandUnder: 'isCurrentPosition',
        },
      },
      reasonForLeaving: {
        ...textUI({
          title: 'Reason for leaving',
          hint: 'Examples: Voluntary resignation, End of contract, Position eliminated, Relocation, Career advancement.',
        }),
        'ui:options': {
          hideIf: formData => formData?.isCurrentPosition === true,
          expandUnder: 'isCurrentPosition',
        },
      },
      hoursPerWeek: textUI({
        title: 'Average hours per week',
        hint: 'Enter your average weekly clinical hours in this position.',
        inputType: 'number',
      }),
    },
  },
};

export const employmentHistorySchema = {
  type: 'object',
  required: ['employmentHistory'],
  properties: {
    employmentHistory: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: [
          'employerName',
          'employerCity',
          'employerState',
          'positionTitle',
          'startDate',
        ],
        properties: {
          employerName: { type: 'string', maxLength: 200 },
          employerStreetAddress: { type: 'string', maxLength: 200 },
          employerCity: { type: 'string', maxLength: 100 },
          employerState: selectSchema(EMPLOYER_STATES),
          positionTitle: { type: 'string', maxLength: 200 },
          department: { type: 'string', maxLength: 200 },
          startDate: currentOrPastDateSchema,
          isCurrentPosition: yesNoSchema,
          endDate: currentOrPastDateSchema,
          reasonForLeaving: { type: 'string', maxLength: 500 },
          hoursPerWeek: {
            type: 'number',
            minimum: 0.1,
            maximum: 168,
          },
        },
      },
    },
  },
};