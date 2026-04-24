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
  'peer-colleague': 'Peer/colleague',
  'department-chair': 'Department chair or medical director',
  'training-program-director': 'Training program director',
  'other-professional': 'Other professional',
};

export const professionalReferencesUiSchema = {
  professionalReferences: {
    'ui:title': 'Professional references',
    'ui:description':
      'Provide at least 3 professional references. References must be colleagues, supervisors, or clinical peers — not family members or personal friends.',
    'ui:options': {
      itemName: 'Reference',
      viewField: ({ formData }) =>
        `${formData.firstName || ''} ${formData.lastName || ''} — ${formData.professionalTitle || ''}`,
    },
    items: {
      lastName: textUI({
        title: "Reference's last name",
        errorMessages: {
          required: "Please enter the reference's last name.",
        },
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
          required: "Please enter the reference's institution.",
        },
      }),
      phone: phoneUI({
        title: "Reference's phone number",
        errorMessages: {
          required: "Please enter the reference's phone number.",
          pattern: 'Please enter a valid 10-digit phone number.',
        },
      }),
      email: emailUI({
        title: "Reference's email address",
        errorMessages: {
          required: "Please enter the reference's email address.",
          format: 'Please enter a valid email address.',
        },
      }),
      relationship: selectUI({
        title: "This reference's relationship to you",
        hint: 'Do not list family members or personal friends as professional references.',
        labels: RELATIONSHIP_LABELS,
        errorMessages: {
          required: 'Please select the relationship to this reference.',
        },
      }),
      yearsKnown: textUI({
        title: 'How many years have you known this reference?',
        hint: 'Enter a number between 0 and 60.',
        inputType: 'number',
        errorMessages: {
          required: 'Please enter the number of years known.',
        },
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
          lastName: { type: 'string', maxLength: 50 },
          firstName: { type: 'string', maxLength: 50 },
          professionalTitle: { type: 'string', maxLength: 200 },
          institution: { type: 'string', maxLength: 200 },
          phone: phoneSchema,
          email: emailSchema,
          relationship: selectSchema(Object.keys(RELATIONSHIP_LABELS)),
          yearsKnown: {
            type: 'integer',
            minimum: 0,
            maximum: 60,
          },
        },
      },
    },
  },
};