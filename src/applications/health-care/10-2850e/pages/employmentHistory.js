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

import { states } from 'platform/forms/address';

const stateLabels = states.USA.reduce((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {});

stateLabels['outside-us'] = 'Outside the United States';

const employmentItemUiSchema = {
  employerName: textUI({
    title: 'Employer or facility name',
    errorMessages: {
      required: 'Please enter the employer or facility name.',
    },
  }),
  employerStreetAddress: textUI({
    title: 'Employer street address',
  }),
  employerCity: textUI({
    title: 'City',
    errorMessages: {
      required: 'Please enter the city.',
    },
  }),
  employerState: selectUI({
    title: 'State',
    labels: stateLabels,
    errorMessages: {
      required: 'Please select a state.',
    },
  }),
  positionTitle: textUI({
    title: 'Position title or job title',
    errorMessages: {
      required: 'Please enter your position title.',
    },
  }),
  department: textUI({
    title: 'Department, unit, or service',
  }),
  startDate: currentOrPastDateUI({
    title: 'Start date of employment',
    errorMessages: {
      required: 'Please enter a start date.',
    },
  }),
  isCurrentPosition: yesNoUI({
    title: 'Do you currently work here?',
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
    hint: 'Examples: Voluntary resignation, End of contract, Relocation',
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
};

const employmentItemSchema = {
  type: 'object',
  required: ['employerName', 'employerCity', 'employerState', 'positionTitle', 'startDate'],
  properties: {
    employerName: { type: 'string', maxLength: 200, minLength: 1 },
    employerStreetAddress: { type: 'string', maxLength: 200 },
    employerCity: { type: 'string', maxLength: 100 },
    employerState: selectSchema(Object.keys(stateLabels)),
    positionTitle: { type: 'string', maxLength: 200, minLength: 1 },
    department: { type: 'string', maxLength: 200 },
    startDate: currentOrPastDateSchema,
    isCurrentPosition: yesNoSchema,
    endDate: currentOrPastDateSchema,
    reasonForLeaving: { type: 'string', maxLength: 500 },
    hoursPerWeek: { type: 'number', minimum: 0.1, maximum: 168 },
  },
};

export const employmentHistoryUiSchema = {
  'ui:title': 'Employment history',
  'ui:description':
    'List all positions you have held in the past 10 years, including your current position. You must account for all employment periods.',
  employmentHistory: {
    'ui:options': {
      itemName: 'employment record',
      viewField: EmploymentViewField,
      keepInPageOnReview: true,
    },
    items: employmentItemUiSchema,
  },
};

function EmploymentViewField({ formData }) {
  return (
    <div>
      <strong>{formData.positionTitle}</strong> &mdash; {formData.employerName}
    </div>
  );
}

export const employmentHistorySchema = {
  type: 'object',
  required: ['employmentHistory'],
  properties: {
    employmentHistory: {
      type: 'array',
      minItems: 1,
      items: employmentItemSchema,
    },
  },
};