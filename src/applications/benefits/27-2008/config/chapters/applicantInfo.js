import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const STATE_OPTIONS = [
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

const APPLICANT_RELATIONSHIP_OPTIONS = [
  'survivingSpouse',
  'child',
  'parent',
  'brotherOrSister',
  'uncleOrAunt',
  'nephewOrNiece',
  'cousinOrGrandparent',
  'funeralDirector',
  'vsoRepresentative',
  'closeFriend',
  'otherAuthorizedRepresentative',
];

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

function validateApplicantOtherRelationship(errors, formData) {
  const relationship = formData?.applicant?.relationshipToVeteran;
  const other = formData?.applicant?.relationshipToVeteranOther;
  if (
    relationship === 'otherAuthorizedRepresentative' &&
    (!other || !other.trim())
  ) {
    errors.applicant.relationshipToVeteranOther.addError(
      'Please describe your relationship to the deceased Veteran.',
    );
  }
}

export const applicantInfoUiSchema = {
  applicant: {
    'ui:title': 'Your information',
    'ui:description':
      'Enter your name as the person submitting this application. This may be different from the person entitled to receive the flag if you are a funeral director, VSO representative, or authorized submitter.',
    firstName: textUI({
      title: 'Your first name',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    middleName: textUI({
      title: 'Your middle name (optional)',
    }),
    lastName: textUI({
      title: 'Your last name',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    addressLine1: textUI({
      title: 'Your street address or rural route, or P.O. Box',
      autocomplete: 'street-address',
      errorMessages: {
        required: 'Please enter your street address.',
      },
    }),
    addressLine2: textUI({
      title: 'Apartment, suite, unit (optional)',
    }),
    city: textUI({
      title: 'Your city',
      autocomplete: 'address-level2',
      errorMessages: {
        required: 'Please enter your city.',
      },
    }),
    state: selectUI({
      title: 'Your state or territory',
      labels: STATE_LABELS,
      errorMessages: {
        required: 'Please select your state or territory.',
      },
    }),
    zip: textUI({
      title: 'Your ZIP code',
      inputType: 'text',
      autocomplete: 'postal-code',
      errorMessages: {
        required: 'Please enter your ZIP code.',
        pattern:
          'Please enter a valid ZIP code (5 digits, optionally followed by a dash and 4 digits).',
      },
    }),
    relationshipToVeteran: selectUI({
      title: 'Your relationship to the deceased Veteran',
      hint:
        'Select your relationship as the person submitting this application, not the person receiving the flag (if they are different).',
      labels: APPLICANT_RELATIONSHIP_LABELS,
      errorMessages: {
        required:
          'Please select your relationship to the deceased Veteran.',
      },
    }),
    relationshipToVeteranOther: textUI({
      title: 'Describe your relationship to the deceased Veteran',
      hint: 'Required when "Other authorized representative" is selected above.',
      'ui:required': formData =>
        formData?.applicant?.relationshipToVeteran ===
        'otherAuthorizedRepresentative',
    }),
  },
  'ui:validations': [validateApplicantOtherRelationship],
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
        state: selectSchema(STATE_OPTIONS),
        zip: {
          type: 'string',
          pattern: '^[0-9]{5}(-[0-9]{4})?$',
          minLength: 5,
          maxLength: 10,
        },
        relationshipToVeteran: selectSchema(APPLICANT_RELATIONSHIP_OPTIONS),
        relationshipToVeteranOther: { type: 'string', maxLength: 100 },
      },
    },
  },
};