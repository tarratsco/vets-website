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

const RELATIONSHIP_LABELS = {
  'direct-supervisor': 'Direct supervisor',
  'peer-colleague': 'Peer / colleague',
  'department-chair': 'Department chair or medical director',
  'training-program-director': 'Training program director',
  'other-professional': 'Other professional',
};

export const professionalReferencesUiSchema = {
  professionalReferences: {
    'ui:title': 'Professional references',
    'ui:description':
      'Provide at least 3 professional references. Do not list family members or personal friends. References should be colleagues, supervisors, or clinical peers who can speak to your professional qualifications.',
    'ui:options': {
      itemName: 'Reference',
      viewField: item =>
        `${item.firstName || ''} ${item.lastName || ''} — ${item.professionalTitle || ''}`,
      keepInPageOnReview: true,
    },
    items: {
      lastName: textUI({
        title: "Reference's last name",
        errorMessages: { required: "Please enter the reference's last name." },
      }),
      firstName: textUI({
        title: "Reference's first name",
        errorMessages: {
          required: "Please enter the reference's first name.",
        },
      }),
      professionalTitle: textUI({
        title: "Reference's professional title and credentials",
        hint: 'Example: Director of Nursing, MSN, RN',
        errorMessages: {
          required: "Please enter the reference's professional title.",
        },
      }),
      institution: textUI({
        title: 'Institution or organization where reference works',
        errorMessages: {
          required: 'Please enter the institution or organization.',
        },
      }),
      phone: phoneUI("Reference's phone number"),
      email: emailUI("Reference's email address"),
      relationship: selectUI({
        title: "This reference's relationship to you",
        labels: RELATIONSHIP_LABELS,
        hint: 'Do not list family members or personal friends as professional references.',
        errorMessages: { required: 'Please select the relationship type.' },
      }),
      yearsKnown: textUI({
        title: 'How many years have you known this reference?',
        inputType: 'number',
        hint: 'Enter a number between 0 and 60.',
      }),
    },
  },
};

export const professionalReferencesSchema = {
  type: 'object',
  required: ['professionalReferences'],
  properties: {
    professionalReferences: {
      type: 'array',
      minItems: 3,
      items: {
        type: 'object',
        required: [
          'lastName',
          'firstName',
          'professionalTitle',
          'institution',
          'phone',
          'email',
          'relationship',
        ],
        properties: {
          lastName: { type: 'string', minLength: 1, maxLength: 50 },
          firstName: { type: 'string', minLength: 1, maxLength: 50 },
          professionalTitle: { type: 'string', minLength: 1, maxLength: 200 },
          institution: { type: 'string', minLength: 1, maxLength: 200 },
          phone: phoneSchema,
          email: emailSchema,
          relationship: selectSchema(Object.keys(RELATIONSHIP_LABELS)),
          yearsKnown: { type: 'integer', minimum: 0, maximum: 60 },
        },
      },
    },
  },
};