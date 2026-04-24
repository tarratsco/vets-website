import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

const STATE_LABELS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
  'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
  'WA', 'WV', 'WI', 'WY',
];

const stateOptions = STATE_LABELS.reduce((acc, s) => {
  acc[s] = s;
  return acc;
}, {});

export const travelAdditionalSegmentUiSchema = {
  'travel.addSecondSegment': radioUI({
    title: 'Do you have a second travel segment to add?',
    hint:
      'For example, a return trip on a different date. The form provides space for two travel segments.',
    labels: {
      yes: 'Yes, add another travel date and route',
      no: 'No',
    },
    required: () => true,
    errorMessages: {
      required: 'Please indicate whether you have a second travel segment.',
    },
  }),
  'travel.segment2': {
    'ui:title': 'Travel Segment 2',
    'ui:options': {
      expandUnder: 'travel.addSecondSegment',
      expandUnderCondition: 'yes',
    },
    dateOfTravel: currentOrPastDateUI({
      title: 'Date of travel (Segment 2)',
      hint: 'Format: MM/DD/YYYY',
      errorMessages: {
        required: 'Please enter the date of travel for the second segment.',
        pattern: 'Please enter a valid date of travel.',
      },
    }),
    'departure.city': textUI({
      title: 'Departure city (Segment 2)',
      errorMessages: {
        required: 'Please enter the departure city for the second segment.',
      },
    }),
    'departure.state': {
      'ui:title': 'Departure state (Segment 2)',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the departure state for the second segment.',
      },
    },
    'departure.time': {
      'ui:title': 'Departure time (Segment 2)',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Use 24-hour format, e.g., 0815 for 8:15 AM or 1430 for 2:30 PM.',
        inputmode: 'numeric',
        maxlength: 4,
      },
      'ui:errorMessages': {
        required: 'Please enter the departure time for the second segment.',
        pattern: 'Please enter the time in 24-hour format, e.g., 0815.',
      },
    },
    'arrival.city': textUI({
      title: 'Arrival city (Segment 2)',
      errorMessages: {
        required: 'Please enter the arrival city for the second segment.',
      },
    }),
    'arrival.state': {
      'ui:title': 'Arrival state (Segment 2)',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the arrival state for the second segment.',
      },
    },
    'arrival.time': {
      'ui:title': 'Arrival time (Segment 2)',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Use 24-hour format, e.g., 0815 for 8:15 AM or 1430 for 2:30 PM.',
        inputmode: 'numeric',
        maxlength: 4,
      },
      'ui:errorMessages': {
        required: 'Please enter the arrival time for the second segment.',
        pattern: 'Please enter the time in 24-hour format, e.g., 0815.',
      },
    },
  },
};

export const travelAdditionalSegmentSchema = {
  type: 'object',
  required: ['travel.addSecondSegment'],
  properties: {
    'travel.addSecondSegment': radioSchema(['yes', 'no']),
    'travel.segment2': {
      type: 'object',
      properties: {
        dateOfTravel: currentOrPastDateSchema,
        'departure.city': { type: 'string', minLength: 1, maxLength: 30 },
        'departure.state': { type: 'string', enum: STATE_LABELS },
        'departure.time': {
          type: 'string',
          pattern: '^([01]\\d|2[0-3])[0-5]\\d$',
          minLength: 4,
          maxLength: 4,
        },
        'arrival.city': { type: 'string', minLength: 1, maxLength: 30 },
        'arrival.state': { type: 'string', enum: STATE_LABELS },
        'arrival.time': {
          type: 'string',
          pattern: '^([01]\\d|2[0-3])[0-5]\\d$',
          minLength: 4,
          maxLength: 4,
        },
      },
    },
  },
};