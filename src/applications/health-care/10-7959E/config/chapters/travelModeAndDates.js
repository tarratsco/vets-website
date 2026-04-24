import {
  textUI,
  checkboxGroupUI,
  checkboxGroupSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

const STATE_LABELS = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

const stateOptions = STATE_LABELS.reduce((acc, s) => {
  acc[s] = s;
  return acc;
}, {});

const MODE_LABELS = {
  airline: 'Airline',
  taxi: 'Taxi',
  pov: 'Privately owned vehicle (POV) \u2014 round trip mileage',
  bus: 'Bus',
  train: 'Train',
  other: 'Other (specify below)',
};

const MODE_KEYS = Object.keys(MODE_LABELS);

export const travelModeAndDatesUiSchema = {
  modeOfTravel: checkboxGroupUI({
    title: 'Mode of travel',
    hint:
      'Select all modes of travel used for this trip. Attach receipts for all modes except privately owned vehicle (POV) mileage.',
    required: () => true,
    labels: MODE_LABELS,
    errorMessages: {
      required: 'Please select at least one mode of travel.',
    },
  }),
  modeOfTravelOther: {
    'ui:title': 'Please specify other mode of travel',
    'ui:webComponentField': VaTextInputField,
    'ui:options': {
      expandUnder: 'modeOfTravel',
      expandUnderCondition: data =>
        data &&
        typeof data === 'object' &&
        data.modeOfTravel &&
        data.modeOfTravel.other,
    },
    'ui:errorMessages': {
      required: 'Please describe the other mode of travel.',
    },
  },
  segment1: {
    'ui:title': 'Travel Segment 1',
    dateOfTravel: currentOrPastDateUI({
      title: 'Date of travel',
      hint: 'Format: MM/DD/YYYY',
      errorMessages: {
        required: 'Please enter the date of travel.',
        pattern: 'Please enter a valid date of travel.',
      },
    }),
    departureCity: textUI({
      title: 'Departure city',
      errorMessages: {
        required: 'Please enter the departure city.',
      },
    }),
    departureState: {
      'ui:title': 'Departure state',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the departure state.',
      },
    },
    departureTime: {
      'ui:title': 'Departure time',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Use 24-hour format, e.g., 0815 for 8:15 AM or 1430 for 2:30 PM.',
        inputmode: 'numeric',
        maxlength: 4,
      },
      'ui:errorMessages': {
        required: 'Please enter the departure time.',
        pattern: 'Please enter the time in 24-hour format, e.g., 0815.',
      },
    },
    arrivalCity: textUI({
      title: 'Arrival city',
      errorMessages: {
        required: 'Please enter the arrival city.',
      },
    }),
    arrivalState: {
      'ui:title': 'Arrival state',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the arrival state.',
      },
    },
    arrivalTime: {
      'ui:title': 'Arrival time',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Use 24-hour format, e.g., 0815 for 8:15 AM or 1430 for 2:30 PM.',
        inputmode: 'numeric',
        maxlength: 4,
      },
      'ui:errorMessages': {
        required: 'Please enter the arrival time.',
        pattern: 'Please enter the time in 24-hour format, e.g., 0815.',
      },
    },
  },
};

export const travelModeAndDatesSchema = {
  type: 'object',
  properties: {
    modeOfTravel: checkboxGroupSchema(MODE_KEYS),
    modeOfTravelOther: {
      type: 'string',
      maxLength: 60,
    },
    segment1: {
      type: 'object',
      required: [
        'dateOfTravel',
        'departureCity',
        'departureState',
        'departureTime',
        'arrivalCity',
        'arrivalState',
        'arrivalTime',
      ],
      properties: {
        dateOfTravel: currentOrPastDateSchema,
        departureCity: { type: 'string', minLength: 1, maxLength: 30 },
        departureState: { type: 'string', enum: STATE_LABELS },
        departureTime: {
          type: 'string',
          pattern: '^([01]\\d|2[0-3])[0-5]\\d$',
          minLength: 4,
          maxLength: 4,
        },
        arrivalCity: { type: 'string', minLength: 1, maxLength: 30 },
        arrivalState: { type: 'string', enum: STATE_LABELS },
        arrivalTime: {
          type: 'string',
          pattern: '^([01]\\d|2[0-3])[0-5]\\d$',
          minLength: 4,
          maxLength: 4,
        },
      },
    },
  },
};
