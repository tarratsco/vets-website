import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { US_STATE_KEYS, US_STATE_OPTIONS } from '../../constants';

const stateLabels = US_STATE_OPTIONS.reduce((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {});

export const burialPlaceUiSchema = {
  veteranInformation: {
    'ui:title': 'Place of burial',
    'ui:description':
      'Enter the name of the cemetery and the city and state where the Veteran will be buried or interred. If burial is at sea or cremation with no cemetery, describe the location.',
    placeOfBurialCemeteryName: textUI({
      title: 'Name of cemetery',
      errorMessages: {
        required: "Please enter the name of the cemetery.",
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
      labels: stateLabels,
      errorMessages: {
        required: 'Please select a state or territory.',
      },
    }),
  },
};

export const burialPlaceSchema = {
  type: 'object',
  required: ['veteranInformation'],
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
        placeOfBurialState: selectSchema(US_STATE_KEYS),
      },
    },
  },
};