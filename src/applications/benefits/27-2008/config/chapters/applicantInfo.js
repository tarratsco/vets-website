import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATE_LABELS = {
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
  PR: 'Puerto Rico',
  GU: 'Guam',
  VI: 'U.S. Virgin Islands',
  AS: 'American Samoa',
  MP: 'Northern Mariana Islands',
  UM: 'U.S. Minor Outlying Islands',
  OUTSIDE_US: 'Outside the United States',
};

const STATE_KEYS = Object.keys(US_STATE_LABELS);

const APPLICANT_RELATIONSHIP_LABELS = {
  survivingSpouse: 'Surviving spouse',
  child: 'Child',
  parent: 'Parent (including adoptive, stepparent, or foster parent)',
  brotherOrSister: 'Brother or sister',
  uncleOrAunt: 'Uncle or aunt',
  nephewOrNiece: 'Nephew or niece',
  cousinOrGrandparent: 'Cousin or grandparent',
  funeralDirector: 'Funeral director or funeral home representative',
  vsoRepresentative:
    'Veterans Service Organization (VSO) representative',
  closeFriend: 'Close friend',
  otherAuthorizedRepresentative: 'Other authorized representative',
};

const APPLICANT_RELATIONSHIP_KEYS = Object.keys(APPLICANT_RELATIONSHIP_LABELS);

export const applicantInfoUiSchema = {
  applicant: {
    'ui:title': 'Your information',
    'ui:description':
      'Enter your name as the person submitting this application. This may be different from the person entitled to receive the flag if you are a funeral director, VSO representative, or authorized submitter.',
    firstName: textUI({
      title: 'Your first name',
      errorMessages: { required: 'Please enter your first name.' },
    }),
    middleName: textUI({
      title: 'Your middle name (optional)',
    }),
    lastName: textUI({
      title: 'Your last name',
      errorMessages: { required: 'Please enter your last name.' },
    }),
    addressLine1: textUI({
      title: 'Your street address or rural route, or P.O. Box',
      autocomplete: 'street-address',
      errorMessages: { required: 'Please enter your street address.' },
    }),
    addressLine2: textUI({
      title: 'Apartment, suite, unit (optional)',
    }),
    city: textUI({
      title: 'Your city',
      autocomplete: 'address-level2',
      errorMessages: { required: 'Please enter your city.' },
    }),
    state: selectUI({
      title: 'Your state or territory',
      labels: US_STATE_LABELS,
      errorMessages: { required: 'Please select your state.' },
    }),
    zip: textUI({
      title: 'Your ZIP code',
      inputType: 'text',
      autocomplete: 'postal-code',
      errorMessages: { required: 'Please enter a valid ZIP code.' },
    }),
    relationshipToVeteran: selectUI({
      title: 'Your relationship to the deceased Veteran',
      hint:
        'Select your relationship as the person submitting this application, not the person receiving the flag (if they are different).',
      labels: APPLICANT_RELATIONSHIP_LABELS,
      errorMessages: {
        required: 'Please select your relationship to the deceased Veteran.',
      },
    }),
    relationshipToVeteranOther: {
      ...textUI({
        title: 'Describe your relationship (required if "Other" selected)',
        errorMessages: {
          required: 'Please describe your relationship.',
        },
      }),
      'ui:options': {
        expandUnder: 'relationshipToVeteran',
        expandUnderCondition: 'otherAuthorizedRepresentative',
      },
    },
  },
};

export const applicantInfoSchema = {
  type: 'object',
  required: ['applicant'],
  properties: {
    applicant: {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'addressLine1',
        'city',
        'state',
        'zip',
        'relationshipToVeteran',
      ],
      properties: {
        firstName: { type: 'string', minLength: 1, maxLength: 30 },
        middleName: { type: 'string', maxLength: 30 },
        lastName: { type: 'string', minLength: 1, maxLength: 30 },
        addressLine1: { type: 'string', minLength: 1, maxLength: 100 },
        addressLine2: { type: 'string', maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 50 },
        state: selectSchema(STATE_KEYS),
        zip: {
          type: 'string',
          pattern: '^[0-9]{5}(-[0-9]{4})?$',
          minLength: 5,
          maxLength: 10,
        },
        relationshipToVeteran: selectSchema(APPLICANT_RELATIONSHIP_KEYS),
        relationshipToVeteranOther: { type: 'string', maxLength: 100 },
      },
    },
  },
};