import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATES_AND_COUNTRIES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'Other country',
];

export const graduateDegreeUiSchema = {
  education: {
    'ui:title': 'Education',
    graduateDegree: {
      'ui:title': 'Professional or graduate degree',
      institutionName: textUI({
        title: 'Name of school or institution',
        errorMessages: { required: 'Please enter the institution name.' },
      }),
      degreeType: textUI({
        title: 'Degree earned',
        hint:
          'For example: BSN, MSN, DNP, PhD in Nursing, MS-CRNA, Associate Degree in Nursing',
        errorMessages: { required: 'Please enter your degree type.' },
      }),
      fieldOfStudy: textUI({
        title: 'Field of study or major',
        hint: 'For example: Nurse Anesthesia, Family Nurse Practice',
        errorMessages: { required: 'Please enter your field of study.' },
      }),
      graduationDate: currentOrPastDateUI({
        title: 'Date degree was awarded',
        errorMessages: {
          required: 'Please enter your graduation date.',
          futureDate: 'Graduation date cannot be in the future.',
        },
      }),
      institutionCity: textUI({
        title: 'City where institution is located',
      }),
      institutionStateOrCountry: selectUI({
        title: 'State or country where institution is located',
      }),
    },
  },
};

export const graduateDegreeSchema = {
  type: 'object',
  properties: {
    education: {
      type: 'object',
      required: ['graduateDegree'],
      properties: {
        graduateDegree: {
          type: 'object',
          required: ['institutionName', 'degreeType', 'fieldOfStudy', 'graduationDate'],
          properties: {
            institutionName: { type: 'string', maxLength: 200 },
            degreeType: { type: 'string', maxLength: 100 },
            fieldOfStudy: { type: 'string', maxLength: 200 },
            graduationDate: currentOrPastDateSchema,
            institutionCity: { type: 'string', maxLength: 100 },
            institutionStateOrCountry: selectSchema(US_STATES_AND_COUNTRIES),
          },
        },
      },
    },
  },
};