import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
  addressUI,
  addressSchema,
  fullNameUI,
  fullNameSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

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
      required: 'Please select your role.',
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

export const applicantPersonalInfoUiSchema = {
  applicant: {
    'ui:title': 'Your personal information',
    name: fullNameUI(title => `Your ${title}`),
    daytimePhone: phoneUI('Daytime phone number'),
    email: emailUI(),
    address: addressUI({
      omit: ['isMilitary'],
    }),
  },
};

export const applicantPersonalInfoSchema = {
  type: 'object',
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

export const relationshipToDecedentUiSchema = {
  'ui:title': 'Your relationship to the deceased service member',
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
        required: 'Please select your relationship to the deceased service member.',
      },
    }),
    relationshipDescription: textUI({
      title: 'Please describe your relationship',
      hint: 'Required when "Other family member" is selected',
      expandUnder: 'relationshipToDecedent',
      expandUnderCondition: 'otherFamilyMember',
    }),
    organizationName: textUI({
      title: 'Organization or funeral home name',
      hint: 'Enter the name of your organization',
    }),
    organizationRole: textUI({
      title: 'Your title or role within the organization',
      hint: 'For example: Funeral Director, Cemetery Manager',
    }),
    legalAuthorityDescription: textUI({
      title: 'Describe your legal authority to submit',
      hint: 'For example: Power of Attorney, Court-appointed representative',
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

export const authorizationUiSchema = {
  'ui:title': 'Authorization to submit',
  'ui:description':
    'Because you are submitting on behalf of the next of kin, you must provide documentation of your authorization.',
  applicant: {
    authorizationDocument: fileInputUI({
      title: 'Upload your authorization document',
      hint:
        'Upload a document showing you have the right to submit this request. Accepted formats: PDF, JPG, PNG. Maximum file size: 20MB.',
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
    applicant: {
      type: 'object',
      properties: {
        authorizationDocument: fileInputSchema(),
      },
    },
  },
};