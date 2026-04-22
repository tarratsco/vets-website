/**
 * Chapter 5, Screen 11 — Property Details
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

export const propertyDetailsUiSchema = {
  propertyInformation: {
    'ui:title': 'Property details',
    propertyDetails: {
      'ui:title': 'Additional property characteristics',
      yearBuilt: {
        'ui:title': 'Year the property was built (existing construction only)',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          inputType: 'number',
          hint:
            'Enter the 4-digit year the property was built. Leave blank for new/proposed construction.',
        },
        'ui:errorMessages': {
          pattern: 'Enter a valid 4-digit year (e.g., 1998).',
        },
      },
      occupancyStatus: selectUI({
        title: 'Current occupancy status of the property',
        errorMessages: {
          required: 'Select the current occupancy status.',
        },
      }),
      bedrooms: {
        'ui:title': 'Number of bedrooms',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          inputType: 'number',
          hint: 'Enter the number of bedrooms in the property.',
        },
        'ui:errorMessages': {
          pattern: 'Enter a valid number of bedrooms.',
        },
      },
      bathrooms: {
        'ui:title': 'Number of bathrooms',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          inputType: 'number',
          hint:
            'Enter the number of bathrooms. Use 0.5 for half-baths (e.g., enter 2.5 for 2 full baths and 1 half-bath).',
        },
        'ui:errorMessages': {
          pattern: 'Enter a valid number of bathrooms.',
        },
      },
      legalDescription: {
        'ui:title': 'Abbreviated legal description (optional)',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint:
            'Enter an abbreviated legal description of the property if available (e.g., Lot 5, Block 3, Subdivision Name).',
          charcount: true,
        },
        'ui:errorMessages': {},
      },
    },
  },
};

export const propertyDetailsSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      required: ['propertyDetails'],
      properties: {
        propertyDetails: {
          type: 'object',
          required: ['occupancyStatus'],
          properties: {
            yearBuilt: {
              type: 'integer',
              minimum: 1800,
              maximum: 2100,
            },
            occupancyStatus: {
              type: 'string',
              enum: [
                'owner_occupied',
                'tenant_occupied',
                'vacant',
                'other',
              ],
              enumNames: [
                'Owner-occupied',
                'Tenant-occupied',
                'Vacant',
                'Other',
              ],
            },
            bedrooms: {
              type: 'integer',
              minimum: 0,
              maximum: 20,
            },
            bathrooms: {
              type: 'number',
              minimum: 0,
              maximum: 20,
            },
            legalDescription: {
              type: 'string',
              maxLength: 500,
            },
          },
        },
      },
    },
  },
};