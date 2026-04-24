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

const referenceItemUiSchema = {
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
  phone: phoneUI("Reference's phone number"),
  email: emailUI("Reference's email address"),
  relationship: selectUI({
    title: "This reference's relationship to you",
    hint: 'Do not list family members or personal friends as professional references.',
    labels: {
      'direct-supervisor': 'Direct supervisor',
      'peer-colleague': 'Peer / colleague',
      'department-chair': 'Department chair or medical director',
      'training-program-director': 'Training program director',
      'other-professional': 'Other professional',
    },
    errorMessages: {
      required: 'Please select the relationship.',
    },
  }),
  yearsKnown: textUI({
    title: 'How many years have you known this reference?',
    inputType: 'number',
    hint: 'Enter a whole number.',
  }),
};

const referenceItemSchema = {
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
    lastName: { type: 'string', maxLength: 50, minLength: 1 },
    firstName: { type: 'string', maxLength: 50, minLength: 1 },
    professionalTitle: { type: 'string', maxLength: 200, minLength: 1 },
    institution: { type: 'string', maxLength: 200, minLength: 1 },
    phone: phoneSchema,
    email: emailSchema,
    relationship: selectSchema([
      'direct-supervisor',
      'peer-colleague',
      'department-chair',
      'training-program-director',
      'other-professional',
    ]),
    yearsKnown: { type: 'integer', minimum: 0, maximum: 60 },
  },
};

export const professionalReferencesUiSchema = {
  'ui:title': 'Professional references',
  'ui:description':
    'Provide at least 3 professional references. References must be professional colleagues, supervisors, or clinical peers — not family members or personal friends.',
  professionalReferences: {
    'ui:options': {
      itemName: 'reference',
      viewField: ReferenceViewField,
      keepInPageOnReview: true,
    },
    items: referenceItemUiSchema,
  },
};

function ReferenceViewField({ formData }) {
  return (
    <div>
      <strong>
        {formData.firstName} {formData.lastName}
      </strong>{' '}
      &mdash; {formData.professionalTitle}
    </div>
  );
}

export const professionalReferencesSchema = {
  type: 'object',
  required: ['professionalReferences'],
  properties: {
    professionalReferences: {
      type: 'array',
      minItems: 3,
      items: referenceItemSchema,
    },
  },
};