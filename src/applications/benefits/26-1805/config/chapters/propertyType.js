/**
 * Chapter 5, Screen 7 — Property Type
 * VA Form 26-1805
 */
import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const propertyTypeUiSchema = {
  propertyInformation: {
    'ui:title': 'Property type',
    propertyType: radioUI({
      title: 'What type of property is this?',
      labels: {
        single_family_detached: 'Single-family detached home',
        condo: 'Condominium (condo)',
        townhouse: 'Townhouse',
        manufactured_home: 'Manufactured home',
        '2_unit': '2-unit property',
        '3_unit': '3-unit property',
        '4_unit': '4-unit property',
      },
      errorMessages: {
        required: 'Please select the property type.',
      },
    }),
    constructionType: radioUI({
      title: 'What is the construction status of this property?',
      labels: {
        existing: 'Existing construction (property already built)',
        proposed_new_construction:
          'Proposed or new construction (property not yet built or recently completed)',
      },
      errorMessages: {
        required: 'Please select the construction status.',
      },
    }),
  },
};

export const propertyTypeSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      required: ['propertyType', 'constructionType'],
      properties: {
        propertyType: radioSchema([
          'single_family_detached',
          'condo',
          'townhouse',
          'manufactured_home',
          '2_unit',
          '3_unit',
          '4_unit',
        ]),
        constructionType: radioSchema([
          'existing',
          'proposed_new_construction',
        ]),
      },
    },
  },
};