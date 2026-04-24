import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const professionalReferencesUiSchema = {
  professionalReferences: {
    'ui:title': 'Professional references',
    'ui:description':
      'Provide at least 3 professional references. Do not list family members or personal friends.',
    'ui:options': {
      itemName: 'Reference',
      viewField: ({ formData }) =>
        `${formData?.firstName || ''} ${formData?.lastName || ''} — ${formData?.institution || ''}`,
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
        errorMessages: { required: "Please enter the reference's professional title." },
      }),
      institution: textUI({
        title: 'Institution or organization where reference works',
        errorMessages: { required: "Please enter the reference's institution." },
      }),
      phone: textUI({
        title: "Reference's phone number",
        inputType: 'tel',
        errorMessages: {
          required: "Please enter the reference's phone number.",
          pattern: 'Please enter a valid phone number.',
        },
      }),
      email: textUI({
        title: "Reference's email address",
        inputType: 'email',
        errorMessages: {
          required: "Please enter the reference's email address.",
          format: 'Please enter a valid email address.',
        },
      }),
      relationship: selectUI({
        title: "This reference's relationship to you",
        hint: 'Do not list family members or personal friends as professional references.',
        errorMessages: { required: 'Please select the relationship.' },
      }),
      yearsKnown: textUI({
        title: 'How many years have you known this reference?',
        hint: 'Enter a number between 0 and 60.',
        inputType: 'number',
        errorMessages: { required: 'Please enter how many years you have known this reference.' },
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
          lastName: { type: 'string', maxLength: 50, minLength: 1 },
          firstName: { type: 'string', maxLength: 50, minLength: 1 },
          professionalTitle: { type: 'string', maxLength: 200, minLength: 1 },
          institution: { type: 'string', maxLength: 200, minLength: 1 },
          phone: {
            type: 'string',
            pattern: '^(?:\\(?[2-9]\\d{2}\\)?[-. ]?){1}\\d{3}[-. ]?\\d{4}$',
          },
          email: { type: 'string', format: 'email', maxLength: 256 },
          relationship: selectSchema([
            'direct-supervisor',
            'peer-colleague',
            'department-chair',
            'training-program-director',
            'other-professional',
          ]),
          yearsKnown: { type: 'integer', minimum: 0, maximum: 60 },
        },
      },
    },
  },
};