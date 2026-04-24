import { textUI } from 'platform/forms-system/src/js/web-component-patterns';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';

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

export const travelPovMileageUiSchema = {
  'ui:description':
    'Receipts are not required for privately owned vehicle (POV) mileage. Enter your departure and arrival city and state. Reimbursement will be calculated at the applicable round-trip mileage rate. Contact OIVC at 1-833-930-0816 to confirm the current rate.',
  pov: {
    'ui:title': 'POV Mileage Details (Section III)',
    departureCity: textUI({
      title: 'Departure city (for POV mileage)',
      hint: 'Enter the city where your trip began.',
      errorMessages: {
        required: 'Please enter the departure city for your POV trip.',
      },
    }),
    departureState: {
      'ui:title': 'Departure state (for POV mileage)',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the departure state for your POV trip.',
      },
    },
    arrivalCity: textUI({
      title: 'Arrival city (for POV mileage)',
      hint: 'Enter the city where the medical appointment took place.',
      errorMessages: {
        required: 'Please enter the arrival city for your POV trip.',
      },
    }),
    arrivalState: {
      'ui:title': 'Arrival state (for POV mileage)',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        labels: stateOptions,
      },
      'ui:errorMessages': {
        required: 'Please select the arrival state for your POV trip.',
      },
    },
  },
};

export const travelPovMileageSchema = {
  type: 'object',
  properties: {
    pov: {
      type: 'object',
      required: [
        'departureCity',
        'departureState',
        'arrivalCity',
        'arrivalState',
      ],
      properties: {
        departureCity: { type: 'string', minLength: 1, maxLength: 30 },
        departureState: { type: 'string', enum: STATE_LABELS },
        arrivalCity: { type: 'string', minLength: 1, maxLength: 30 },
        arrivalState: { type: 'string', enum: STATE_LABELS },
      },
    },
  },
};
