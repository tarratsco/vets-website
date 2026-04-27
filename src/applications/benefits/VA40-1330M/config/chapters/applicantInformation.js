import {
  radioUI,
  radioSchema,
  fullNameUI,
  fullNameSchema,
  textUI,
  textSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
  addressUI,
  addressSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ── Who Is Applying ──────────────────────────────────────────────────────────

export const whoIsApplyingUiSchema = {
  submitterRole: radioUI({
    title: 'What is your role in submitting this request?',
    hint:
      'Headstone and marker requests can be submitted by family members, funeral home directors, cemetery officials, or authorized personal representatives.',
    labels: {
      nextOfKin: 'I am a family member (next of kin)',
      funeralHomeDirector: 'I am a funeral home director or staff member',
      cemeteryOfficial: 'I am a cemetery official',
      personalRepresentative:
        'I am a personal representative or attorney-in-fact',
    },
    errorMessages: {
      required: 'Please select your role',
    },
  }),
};

export const whoIsApplyingSchema = {
  type: 'object',
  required: ['submitterRole'],
  properties: {
    submitterRole: radioSchema([
      'nextOfKin',
      'funeralHomeDirector',
      'cemeteryOfficial',
      'personalRepresentative',
    ]),
  },
};

// ── Applicant Personal Info ───────────────────────────────────────────────────

export const applicantPersonalInfoUiSchema = {
  applicant: {
    'ui:title': 'Your name and contact information',
    name: {
      ...fullNameUI(title => `Your ${title}`),
    },
    daytimePhone: phoneUI({
      title: 'Daytime phone number',
      hint: 'We may use this to follow up about your request. Enter a 10-digit U.S. phone number.',
    }),
    email: emailUI({
      title: 'Email address',
      hint: "We'll send a confirmation to this email when we receive your request.",
    }),
    address: addressUI({
      labels: {
        street: 'Street address',
        street2: 'Apartment or unit number',
        city: 'City',
        state: 'State',
        postalCode: 'ZIP code',
      },
      hint:
        'Enter the address where NCA should mail correspondence about this request.',
    }),
  },
};

export const applicantPersonalInfoSchema = {
  type: 'object',
  required: ['applicant'],
  properties: {
    applicant: {
      type: 'object',
      required: ['name', 'daytimePhone', 'email', 'address'],
      properties: {
        name: fullNameSchema,
        daytimePhone: phoneSchema,
        email: emailSchema,
        address: addressSchema(),
      },
    },
  },
};

// ── Relationship To Decedent ──────────────────────────────────────────────────

export const relationshipToDecedentUiSchema = {
  applicant: {
    relationshipToDecedent: radioUI({
      title: 'What is your relationship to the deceased service member?',
      labels: {
        spouse: 'Spouse',
        parent: 'Parent',
        child: 'Child',
        sibling: 'Sibling',
        otherFamilyMember: 'Other family member',
      },
      errorMessages: {
        required: 'Please select your relationship',
      },
    }),
    relationshipDescription: textUI({
      title: 'Please describe your relationship',
      hint: 'Required when you select "Other family member"',
      expandUnder: 'relationshipToDecedent',
      expandUnderCondition: 'otherFamilyMember',
    }),
    organizationName: textUI({
      title: 'Funeral home or organization name',
      hint: 'Enter the full name of your organization',
    }),
    organizationRole: textUI({
      title: 'Your title or role within the organization',
    }),
    legalAuthorityDescription: textUI({
      title: 'Describe your legal authority to submit this request',
      hint: 'For example: Power of attorney, court-appointed executor',
    }),
  },
};

export const relationshipToDecedentSchema = {
  type: 'object',
  properties: {
    applicant: {
      type: 'object',
      properties: {
        relationshipToDecedent: radioSchema([
          'spouse',
          'parent',
          'child',
          'sibling',
          'otherFamilyMember',
        ]),
        relationshipDescription: {
          type: 'string',
          maxLength: 100,
        },
        organizationName: {
          type: 'string',
          maxLength: 100,
        },
        organizationRole: {
          type: 'string',
          maxLength: 100,
        },
        legalAuthorityDescription: {
          type: 'string',
          maxLength: 200,
        },
      },
    },
  },
};

// ── Authorization ─────────────────────────────────────────────────────────────

export const authorizationUiSchema = {
  'view:authorizationInfo': {
    'ui:description':
      'Because you are submitting on behalf of the next of kin, you must provide documentation of your authorization.',
  },
  applicant: {
    authorizationDocument: fileInputUI({
      title: 'Upload your authorization document',
      hint:
        'Accepted formats: PDF, JPG, PNG. Maximum file size: 20 MB. Provide written authorization showing you have the right to submit this request.',
      required: true,
      errorMessages: {
        required: 'Please upload your authorization document',
      },
    }),
  },
};

export const authorizationSchema = {
  type: 'object',
  properties: {
    'view:authorizationInfo': {
      type: 'object',
      properties: {},
    },
    applicant: {
      type: 'object',
      required: ['authorizationDocument'],
      properties: {
        authorizationDocument: fileInputSchema(),
      },
    },
  },
};