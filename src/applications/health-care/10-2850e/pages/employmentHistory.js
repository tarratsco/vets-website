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

const STATE_OPTIONS = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  OUTSIDE_US: 'Outside the United States',
};

export const employmentHistoryUiSchema = {
  employmentHistory: {
    'ui:title': 'Employment history',
    'ui:description':
      'List all positions you have held in the past 10 years, including your current position. You must account for all time, including any gaps of 30 or more days.',
    'ui:options': {
      itemName: 'Position',
      viewField: item =>
        `${item.positionTitle || 'Position'} at ${item.employerName || ''}`,
      keepInPageOnReview: true,
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
        errorMessages: { required: 'Please enter the employer city.' },
      }),
      employerState: selectUI({
        title: 'State',
        labels: STATE_OPTIONS,
        errorMessages: { required: 'Please select the employer state.' },
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
          required: 'Please enter your start date.',
          futureDate: 'Start date cannot be in the future.',
        },
      }),
      isCurrentPosition: yesNoUI({
        title: 'Is this your current position?',
        labels: {
          Y: 'Yes, I currently work here.',
          N: 'No, this is a previous position.',
        },
      }),
      endDate: {
        ...currentOrPastDateUI({
          title: 'End date of employment',
        }),
        'ui:options': {
          hideIf: (formData, index) => {
            const history = formData?.employmentHistory;
            if (!history || !history[index]) return false;
            return history[index].isCurrentPosition === true;
          },
        },
      },
      reasonForLeaving: textUI({
        title: 'Reason for leaving',
        hint: 'Examples: Voluntary resignation, End of contract, Position eliminated, Relocation, Career advancement.',
        'ui:options': {
          hideIf: (formData, index) => {
            const history = formData?.employmentHistory;
            if (!history || !history[index]) return false;
            return history[index].isCurrentPosition === true;
          },
        },
      }),
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
          employerName: { type: 'string', minLength: 1, maxLength: 200 },
          employerStreetAddress: { type: 'string', maxLength: 200 },
          employerCity: { type: 'string', maxLength: 100 },
          employerState: selectSchema(Object.keys(STATE_OPTIONS)),
          positionTitle: { type: 'string', minLength: 1, maxLength: 200 },
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