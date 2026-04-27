import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  fullNameUI,
  fullNameSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
  addressUI,
  addressSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Who Is Applying ────────────────────────────────────────────────────────

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
      required: 'Please select your role in submitting this request.',
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

// ─── Applicant Personal Info ─────────────────────────────────────────────────

export const applicantPersonalInfoUiSchema = {
  applicant: {
    'ui:title': 'Your name and contact information',
    name: {
      ...fullNameUI(title => `Your ${title}`),
    },
    daytimePhone: phoneUI('Daytime phone number'),
    email: emailUI(),
    address: addressUI({
      omit: ['isMilitary'],
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

// ─── Relationship to Decedent ────────────────────────────────────────────────

export const relationshipToDecedentUiSchema = {
  applicant: {
    'ui:title': 'Your relationship to the deceased service member',
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
        required: 'Please select your relationship to the deceased service member.',
      },
    }),
    relationshipDescription: textUI({
      title: 'Please describe your relationship',
      hint: 'Required when "Other family member" is selected',
      'ui:options': {
        expandUnder: 'relationshipToDecedent',
        expandUnderCondition: 'otherFamilyMember',
      },
    }),
    organizationName: textUI({
      title: 'Organization name',
      hint: 'Name of the funeral home or cemetery',
    }),
    organizationRole: textUI({
      title: 'Your title or role within the organization',
      hint: 'For example: Funeral Director, Cemetery Manager',
    }),
    legalAuthorityDescription: textUI({
      title: 'Describe your legal authority to submit',
      hint: 'For example: Power of attorney, court-appointed representative',
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

// ─── Authorization ────────────────────────────────────────────────────────────

export const authorizationUiSchema = {
  'view:authorizationInfo': {
    'ui:description':
      'Because you are not the next of kin, you must provide written documentation showing you have the right to submit this request.',
  },
  applicant: {
    authorizationDocument: fileInputUI({
      title: 'Upload your authorization document',
      hint:
        'Accepted formats: PDF, JPG, PNG. Maximum file size: 20 MB. If you are not the next of kin, upload a document showing you have authorization to submit this request.',
      required: true,
      errorMessages: {
        required: 'Please upload your authorization document.',
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
      properties: {
        authorizationDocument: fileInputSchema(),
      },
    },
  },
};

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const applicantInformationPages = {
  whoIsApplying: {
    path: 'applicant-information/who-is-applying',
    title: 'Who is submitting this request?',
    uiSchema: whoIsApplyingUiSchema,
    schema: whoIsApplyingSchema,
  },
  applicantPersonalInfo: {
    path: 'applicant-information/applicant-personal-info',
    title: 'Your name and contact information',
    uiSchema: applicantPersonalInfoUiSchema,
    schema: applicantPersonalInfoSchema,
  },
  relationshipToDecedent: {
    path: 'applicant-information/relationship-to-decedent',
    title: 'Your relationship to the deceased service member',
    uiSchema: relationshipToDecedentUiSchema,
    schema: relationshipToDecedentSchema,
  },
  authorization: {
    path: 'applicant-information/authorization',
    title: 'Authorization to submit',
    depends: formData => formData.submitterRole !== 'nextOfKin',
    uiSchema: authorizationUiSchema,
    schema: authorizationSchema,
  },
};