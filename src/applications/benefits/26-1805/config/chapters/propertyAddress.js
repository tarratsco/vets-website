/**
 * Chapter 5, Screen 6 — Property Address
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const stateEnumValues = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'PR', 'GU', 'VI', 'AS', 'MP',
];

const stateEnumNames = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  'Puerto Rico', 'Guam', 'U.S. Virgin Islands', 'American Samoa',
  'Northern Mariana Islands',
];

export const propertyAddressUiSchema = {
  propertyInformation: {
    'ui:title': 'Subject property address',
    propertyAddress: {
      'ui:title': 'Property address',
      street: textUI({
        title: 'Street address',
        autocomplete: 'street-address',
        errorMessages: { required: 'Enter the property street address.' },
      }),
      unit: textUI({
        title: 'Unit, apartment, or suite number (optional)',
        autocomplete: 'address-line2',
      }),
      city: textUI({
        title: 'City',
        autocomplete: 'address-level2',
        errorMessages: { required: 'Enter the property city.' },
      }),
      state: selectUI({
        title: 'State',
        autocomplete: 'address-level1',
        errorMessages: { required: 'Select the property state.' },
      }),
      postalCode: textUI({
        title: 'ZIP code',
        hint: 'Enter the 5-digit ZIP code of the subject property.',
        autocomplete: 'postal-code',
        inputType: 'text',
        errorMessages: {
          required: 'Enter a ZIP code.',
          pattern: 'Enter a valid 5-digit ZIP code.',
        },
      }),
    },
  },
};

export const propertyAddressSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      required: ['propertyAddress'],
      properties: {
        propertyAddress: {
          type: 'object',
          required: ['street', 'city', 'state', 'postalCode'],
          properties: {
            street: { type: 'string', maxLength: 100 },
            unit: { type: 'string', maxLength: 20 },
            city: {
              type: 'string',
              maxLength: 50,
              pattern: '^[A-Za-z\\s\\-\\.]+$',
            },
            state: {
              type: 'string',
              enum: stateEnumValues,
              enumNames: stateEnumNames,
            },
            postalCode: {
              type: 'string',
              pattern: '^\\d{5}$',
              minLength: 5,
              maxLength: 5,
            },
          },
        },
      },
    },
  },
};