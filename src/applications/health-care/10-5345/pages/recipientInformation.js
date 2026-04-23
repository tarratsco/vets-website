/**
 * @module pages/recipientInformation
 * @description Identify person or organization receiving records — required HIPAA element
 */
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
} from 'platform/forms-system/src/js/web-component-patterns';

const isThirdParty = formData =>
  formData?.recipient?.recipientType !== 'myself' &&
  formData?.recipient?.recipientType !== undefined;

export const recipientInformationUiSchema = {
  'ui:title': 'Recipient information',
  'ui:description':
    'Identify the person or organization to whom your records will be released. Under HIPAA (45 CFR 164.508(c)(1)(ii)), a valid authorization must identify the recipient.',
  recipient: {
    recipientType: radioUI({
      title: 'Who should receive the records?',
      labels: {
        myself: 'Me (the Veteran or authorized representative)',
        third_party_individual: 'A specific individual',
        attorney: 'My attorney',
        private_healthcare_provider: 'My private healthcare provider',
        insurance_company: 'An insurance company',
        social_security_administration: 'Social Security Administration',
        other_organization: 'Another organization',
      },
      errorMessages: {
        required: 'Please select who should receive the records.',
      },
    }),
    name: {
      ...textUI({
        title: 'Recipient name (individual or organization)',
        hint:
          'Enter the full name of the individual or organization receiving the records (e.g., "Dr. Sarah Johnson" or "Springfield Medical Center").',
        errorMessages: {
          required: 'Please enter the name of the recipient.',
        },
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.recipient?.recipientType === 'myself',
      },
      'ui:required': isThirdParty,
    },
    organizationName: {
      ...textUI({
        title: 'Organization name (if applicable)',
        hint: 'If releasing to an organization, enter the full organization name.',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.recipient?.recipientType === 'myself' ||
          formData?.recipient?.recipientType === 'third_party_individual' ||
          formData?.recipient?.recipientType === 'attorney',
      },
    },
    address: {
      ...addressUI({
        omit: ['isMilitary'],
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.recipient?.recipientType === 'myself',
      },
    },
    phone: {
      ...phoneUI("Recipient's phone number"),
      'ui:options': {
        hideIf: formData =>
          formData?.recipient?.recipientType === 'myself',
      },
    },
    fax: {
      ...textUI({
        title: "Recipient's fax number",
        hint: '10-digit fax number, digits only.',
        inputType: 'tel',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.recipient?.recipientType === 'myself',
      },
    },
    secureEmail: {
      ...emailUI("Recipient's secure email address"),
      'ui:options': {
        hideIf: formData =>
          formData?.recipient?.recipientType === 'myself',
      },
    },
  },
};

export const recipientInformationSchema = {
  type: 'object',
  required: ['recipient'],
  properties: {
    recipient: {
      type: 'object',
      required: ['recipientType'],
      properties: {
        recipientType: radioSchema([
          'myself',
          'third_party_individual',
          'attorney',
          'private_healthcare_provider',
          'insurance_company',
          'social_security_administration',
          'other_organization',
        ]),
        name: {
          type: 'string',
          maxLength: 200,
        },
        organizationName: {
          type: 'string',
          maxLength: 200,
        },
        address: addressSchema({
          omit: ['isMilitary'],
        }),
        phone: phoneSchema,
        fax: {
          type: 'string',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        secureEmail: emailSchema,
      },
    },
  },
};