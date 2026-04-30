import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'PR', 'GU', 'VI', 'AS', 'MP', 'UM', 'OUTSIDE_US',
];

const STATE_LABELS = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
  CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming', PR: 'Puerto Rico', GU: 'Guam',
  VI: 'U.S. Virgin Islands', AS: 'American Samoa',
  MP: 'Northern Mariana Islands', UM: 'U.S. Minor Outlying Islands',
  OUTSIDE_US: 'Outside the United States',
};

export const burialPlaceUiSchema = {
  veteranInformation: {
    'ui:title': 'Place of burial',
    'ui:description':
      'Enter the name of the cemetery and the city and state where the Veteran will be buried or interred. If burial is at sea or cremation with no cemetery, describe the location.',
    placeOfBurialCemeteryName: textUI({
      title: 'Name of cemetery',
      errorMessages: {
        required: 'Please enter the name of the cemetery.',
      },
    }),
    placeOfBurialCity: textUI({
      title: 'City',
      errorMessages: {
        required: 'Please enter the city.',
      },
    }),
    placeOfBurialState: selectUI({
      title: 'State or territory',
      labels: STATE_LABELS,
      errorMessages: {
        required: 'Please select a state or territory.',
      },
    }),
  },
};

export const burialPlaceSchema = {
  type: 'object',
  properties: {
    veteranInformation: {
      type: 'object',
      required: [
        'placeOfBurialCemeteryName',
        'placeOfBurialCity',
        'placeOfBurialState',
      ],
      properties: {
        placeOfBurialCemeteryName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        placeOfBurialCity: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        placeOfBurialState: selectSchema(US_STATES),
      },
    },
  },
};