import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'AS', 'GU', 'MP', 'PR', 'VI', 'Outside the United States',
];

export const employmentHistoryUiSchema = {
  employmentHistory: {
    'ui:title': 'Employment history',
    'ui:description':
      'List all positions you have held in the past 10 years. You must account for all time, including any gaps of 30 days or more.',
    'ui:options': {
      itemName: 'Position',
      viewField: ({ formData }) =>
        `${formData?.positionTitle || 'Position'} at ${formData?.employerName || ''}`,
    },
    items: {
      employerName: textUI({
        title: 'Employer or facility name',
        errorMessages: { required: 'Please enter the employer name.' },
      }),
      employerStreetAddress: textUI({
        title: 'Employer street address',
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
          required: 'Please enter your employment start date.',
          futureDate: 'Start date cannot be in the future.',
        },
      }),
      isCurrentPosition: yesNoUI({
        title: 'I currently work here',
      }),
      endDate: {
        ...currentOrPastDateUI({
          title: 'End date of employment',
        }),
        'ui:options': {
          hideIf: (formData, index) =>
            formData?.employmentHistory?.[index]?.isCurrentPosition === true,
        },
        'ui:required': (formData, index) =>
          formData?.employmentHistory?.[index]?.isCurrentPosition !== true,
      },
      reasonForLeaving: {
        ...textUI({
          title: 'Reason for leaving',
          hint: 'Examples: Voluntary resignation, End of contract, Position eliminated, Relocation, Career advancement.',
        }),
        'ui:options': {
          hideIf: (formData, index) =>
            formData?.employmentHistory?.[index]?.isCurrentPosition === true,
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
        required: ['employerName', 'employerCity', 'employerState', 'positionTitle', 'startDate'],
        properties: {
          employerName: { type: 'string', maxLength: 200, minLength: 1 },
          employerStreetAddress: { type: 'string', maxLength: 200 },
          employerCity: { type: 'string', maxLength: 100 },
          employerState: selectSchema(US_STATES),
          positionTitle: { type: 'string', maxLength: 200, minLength: 1 },
          department: { type: 'string', maxLength: 200 },
          startDate: currentOrPastDateSchema,
          endDate: currentOrPastDateSchema,
          isCurrentPosition: yesNoSchema,
          reasonForLeaving: { type: 'string', maxLength: 500 },
          hoursPerWeek: { type: 'number', minimum: 0.1, maximum: 168 },
        },
      },
    },
  },
};