import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const relationshipOptions = [
  'direct-supervisor',
  'peer-colleague',
  'department-chair',
  'training-program-director',
  'other-professional',
];

export const professionalReferencesUiSchema = {
  professionalReferences: {
    'ui:title': 'Professional References',
    'ui:description':
      'You must provide at least 3 professional references. References should be colleagues, supervisors, or clinical peers — not family members or personal friends.',
    'ui:options': {
      itemName: 'Reference',
      viewField: ({ formData }) =>
        `${formData.firstName || ''} ${formData.lastName || ''} — ${formData.professionalTitle || ''}`,
    },
    items: {
      lastName: textUI({
        title: "Reference's last name",
        errorMessages: { required: "Please enter the reference's last name." },
      }),
      firstName: textUI({
        title: "Reference's first name",
        errorMessages: { required: "Please enter the reference's first name." },
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
          pattern: 'Please enter a valid 10-digit U.S. phone number.',
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
        errorMessages: {
          required: "Please select the reference's relationship to you.",
        },
      }),
      yearsKnown: textUI({
        title: 'How many years have you known this reference?',
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
        required: ['lastName', 'firstName', 'professionalTitle', 'institution', 'phone', 'email', 'relationship'],
        properties: {
          lastName: { type: 'string', minLength: 1, maxLength: 50 },
          firstName: { type: 'string', minLength: 1, maxLength: 50 },
          professionalTitle: { type: 'string', minLength: 1, maxLength: 200 },
          institution: { type: 'string', minLength: 1, maxLength: 200 },
          phone: phoneSchema,
          email: emailSchema,
          relationship: selectSchema(relationshipOptions),
          yearsKnown: { type: 'integer', minimum: 0, maximum: 60 },
        },
      },
    },
  },
};