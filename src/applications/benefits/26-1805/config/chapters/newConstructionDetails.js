/**
 * Chapter 5, Screen 10 — New Construction Details
 * Conditional: shown only when constructionType === 'proposed_new_construction'
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
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

export const newConstructionDetailsUiSchema = {
  propertyInformation: {
    'ui:title': 'New construction details',
    newConstructionDetails: {
      'ui:title': 'Builder information',
      builderName: textUI({
        title: 'Builder / general contractor name',
        errorMessages: {
          required: 'Enter the builder or general contractor name.',
        },
      }),
      builderAddress: {
        'ui:title': "Builder's business address",
        street: textUI({
          title: 'Street address',
          errorMessages: { required: 'Enter the builder street address.' },
        }),
        city: textUI({
          title: 'City',
          errorMessages: { required: 'Enter the builder city.' },
        }),
        state: selectUI({
          title: 'State',
          errorMessages: { required: 'Select the builder state.' },
        }),
        postalCode: textUI({
          title: 'ZIP code',
          inputType: 'text',
          errorMessages: {
            required: 'Enter a ZIP code.',
            pattern: 'Enter a valid 5-digit ZIP code.',
          },
        }),
      },
      builderLicenseNumber: textUI({
        title: "Builder's state contractor license number (optional)",
        hint:
          "Enter the builder's state-issued contractor license number if available.",
      }),
      plansAndSpecsAvailable: radioUI({
        title:
          'Are plans and specifications available for the appraiser to review?',
        labels: {
          true: 'Yes — plans and specifications are available',
          false: 'No — plans and specifications are not yet available',
        },
        errorMessages: {
          required:
            'Please indicate whether plans and specifications are available.',
        },
      }),
      acknowledgements: checkboxGroupUI({
        title: 'New construction acknowledgements',
        required: true,
        labels: {
          cci_workflow_acknowledged:
            'I understand this new construction submission will be processed through the Construction Compliance Inspection (CCI) workflow.',
          rlc_manual_handling_acknowledged:
            'I understand this request may require manual handling by the Regional Loan Center (RLC).',
        },
        errorMessages: {
          required:
            'Please acknowledge the new construction requirements before proceeding.',
        },
      }),
    },
  },
};

export const newConstructionDetailsSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      properties: {
        newConstructionDetails: {
          type: 'object',
          required: ['builderName', 'plansAndSpecsAvailable'],
          properties: {
            builderName: { type: 'string', maxLength: 100 },
            builderAddress: {
              type: 'object',
              required: ['street', 'city', 'state', 'postalCode'],
              properties: {
                street: { type: 'string', maxLength: 100 },
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
            builderLicenseNumber: { type: 'string', maxLength: 30 },
            plansAndSpecsAvailable: radioSchema(['true', 'false']),
            acknowledgements: checkboxGroupSchema([
              'cci_workflow_acknowledged',
              'rlc_manual_handling_acknowledged',
            ]),
          },
        },
      },
    },
  },
};