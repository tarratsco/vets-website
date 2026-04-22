/**
 * Chapter 2 — Lender Information (Screen 3)
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'GU', label: 'Guam' },
  { value: 'VI', label: 'U.S. Virgin Islands' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'MP', label: 'Northern Mariana Islands' },
];

const stateEnumValues = stateOptions.map(s => s.value);
const stateEnumNames = stateOptions.map(s => s.label);

export const lenderInformationUiSchema = {
  lenderInformation: {
    'ui:title': 'Lender information',
    lenderName: textUI({
      title: 'Lender institution name',
      hint: 'Enter the full legal name of the VA-approved lending institution.',
      autocomplete: 'organization',
      errorMessages: {
        required: 'Enter the lender institution name.',
      },
    }),
    vaLenderID: textUI({
      title: 'VA Lender ID number',
      hint:
        'Your 7-digit VA Lender ID is issued by VA Loan Guaranty Service. It appears on your VA lender approval letter.',
      inputType: 'text',
      autocomplete: 'off',
      errorMessages: {
        required: 'Enter your 7-digit VA Lender ID number.',
        pattern:
          'Enter your 7-digit VA Lender ID number. This is required to process your request.',
      },
    }),
    lenderType: selectUI({
      title: 'Lender type',
      hint:
        'If you are a mortgage broker, your sponsoring VA-approved lender\'s name and VA Lender ID are required above.',
      errorMessages: {
        required: 'Select a lender type.',
      },
    }),
    'view:lenderAddressHeader': {
      'ui:description': 'Lender mailing address',
    },
    lenderAddress: {
      'ui:title': 'Lender address',
      street: textUI({
        title: 'Street address',
        autocomplete: 'street-address',
        errorMessages: { required: 'Enter the lender street address.' },
      }),
      city: textUI({
        title: 'City',
        autocomplete: 'address-level2',
        errorMessages: { required: 'Enter the lender city.' },
      }),
      state: selectUI({
        title: 'State',
        autocomplete: 'address-level1',
        errorMessages: { required: 'Select a state.' },
      }),
      postalCode: textUI({
        title: 'ZIP code',
        autocomplete: 'postal-code',
        inputType: 'text',
        errorMessages: {
          required: 'Enter a ZIP code.',
          pattern: 'Enter a 5-digit ZIP code.',
        },
      }),
    },
    lenderPOCName: textUI({
      title: 'Point of contact name',
      hint:
        'The loan officer or processor VA should contact about this appraisal request.',
      autocomplete: 'name',
      errorMessages: { required: 'Enter the point of contact name.' },
    }),
    lenderPOCPhone: phoneUI({
      title: 'Point of contact phone number',
      errorMessages: {
        required: 'Enter a 10-digit phone number, including area code.',
        pattern: 'Enter a 10-digit phone number, including area code.',
      },
    }),
    lenderPOCEmail: emailUI({
      title: 'Point of contact email address',
      errorMessages: {
        required: 'Enter a valid email address.',
        pattern: 'Enter a valid email address in the format name@domain.com.',
      },
    }),
  },
};

export const lenderInformationSchema = {
  type: 'object',
  properties: {
    lenderInformation: {
      type: 'object',
      required: [
        'lenderName',
        'vaLenderID',
        'lenderType',
        'lenderAddress',
        'lenderPOCName',
        'lenderPOCPhone',
        'lenderPOCEmail',
      ],
      properties: {
        lenderName: {
          type: 'string',
          maxLength: 100,
        },
        vaLenderID: {
          type: 'string',
          pattern: '^\\d{7}$',
          minLength: 7,
          maxLength: 7,
        },
        lenderType: {
          type: 'string',
          enum: [
            'bank_savings',
            'credit_union',
            'mortgage_company',
            'mortgage_broker',
            'government_entity',
            'other',
          ],
          enumNames: [
            'Bank / Savings Institution',
            'Credit Union',
            'Mortgage Company',
            'Mortgage Broker (submitting on behalf of VA-approved lender)',
            'Government Entity',
            'Other',
          ],
        },
        'view:lenderAddressHeader': {
          type: 'object',
          properties: {},
        },
        lenderAddress: {
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
        lenderPOCName: { type: 'string', maxLength: 75 },
        lenderPOCPhone: phoneSchema,
        lenderPOCEmail: emailSchema,
      },
    },
  },
};