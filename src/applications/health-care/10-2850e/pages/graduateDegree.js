import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const STATE_COUNTRY_OPTIONS = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  OTHER: 'Other country',
};

export const graduateDegreeUiSchema = {
  education: {
    'ui:title': 'Education',
    graduateDegree: {
      'ui:title': 'Professional degree',
      institutionName: textUI({
        title: 'Name of school or institution',
        errorMessages: {
          required: 'Please enter the institution name.',
        },
      }),
      degreeType: textUI({
        title: 'Degree earned',
        hint: 'For example: BSN, MSN, DNP, MS-CRNA, MD, DO, PhD in Nursing',
        errorMessages: {
          required: 'Please enter the degree type.',
        },
      }),
      fieldOfStudy: textUI({
        title: 'Field of study or major',
        errorMessages: {
          required: 'Please enter your field of study.',
        },
      }),
      graduationDate: currentOrPastDateUI({
        title: 'Date degree was awarded',
        errorMessages: {
          required: 'Please enter your graduation date.',
          futureDate: 'Graduation date cannot be in the future.',
        },
      }),
      institutionCity: textUI({
        title: 'City',
      }),
      institutionStateOrCountry: selectUI({
        title: 'State or country',
        labels: STATE_COUNTRY_OPTIONS,
      }),
    },
  },
};

export const graduateDegreeSchema = {
  type: 'object',
  required: ['education'],
  properties: {
    education: {
      type: 'object',
      required: ['graduateDegree'],
      properties: {
        graduateDegree: {
          type: 'object',
          required: [
            'institutionName',
            'degreeType',
            'fieldOfStudy',
            'graduationDate',
          ],
          properties: {
            institutionName: { type: 'string', minLength: 1, maxLength: 200 },
            degreeType: { type: 'string', maxLength: 100 },
            fieldOfStudy: { type: 'string', maxLength: 200 },
            graduationDate: currentOrPastDateSchema,
            institutionCity: { type: 'string', maxLength: 100 },
            institutionStateOrCountry: selectSchema(
              Object.keys(STATE_COUNTRY_OPTIONS),
            ),
          },
        },
      },
    },
  },
};