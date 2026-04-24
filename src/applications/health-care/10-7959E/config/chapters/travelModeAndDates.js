import {
  textUI,
  textSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
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
  'travel.modeOfTravel': checkboxGroupUI({
    title: 'Mode of travel',
    hint:
      'Select all modes of travel used for this trip. Attach receipts for all modes except privately owned vehicle (POV) mileage.',
    required: () => true,
    labels: MODE_LABELS,
    errorMessages: {
      required: 'Please select at least one mode of travel.',
    },
  }),
  'travel.modeOfTravelOther': {
    'ui:title': 'Please specify other mode of travel',
    'ui:webComponentField': VaTextInputField,
    'ui:options': {
      expandUnder: 'travel.modeOfTravel',
      expandUnderCondition: data =>
        data &&
        typeof data === 'object' &&
        data['travel.modeOfTravel'] &&
        data['travel.modeOfTravel'].other,
    },
    'ui:errorMessages': {
      required: 'Please describe the other mode of travel.',
    },
  },
  'travel.segment1': {
    'ui:title': 'Travel Segment 1',
    dateOfTravel: currentOrPastDateUI({
      title: 'Date of travel',
      hint: 'Format: MM/DD/YYYY',
      errorMessages: {
        required: 'Please enter the date of travel.',
        pattern: 'Please enter a valid date of travel.',
      },
    }),
    'departure.city': textUI({
      title: 'Departure city',
      errorMessages: {
        required: 'Please enter the departure city.',
      },
    }),
    'departure.state': {
      'ui:title': 'Departure state',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the departure state.',
      },
    },
    'departure.time': {
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
    'arrival.city': textUI({
      title: 'Arrival city',
      errorMessages: {
        required: 'Please enter the arrival city.',
      },
    }),
    'arrival.state': {
      'ui:title': 'Arrival state',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the arrival state.',
      },
    },
    'arrival.time': {
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
    'travel.modeOfTravel': checkboxGroupSchema(MODE_KEYS),
    'travel.modeOfTravelOther': {
      type: 'string',
      maxLength: 60,
    },
    'travel.segment1': {
      type: 'object',
      required: [
        'dateOfTravel',
        'departure.city',
        'departure.state',
        'departure.time',
        'arrival.city',
        'arrival.state',
        'arrival.time',
      ],
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