/**
 * @module pages/representativeInfo
 * @description Representative's name, authority type, and contact info
 * Conditional — shown only when requestorType !== 'veteran'
 */
import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
  addressUI,
  addressSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const representativeInfoUiSchema = {
  'ui:title': 'Your information as the representative',
  representative: {
    firstName: textUI({
      title: "Your first name",
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    lastName: textUI({
      title: "Your last name",
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    authorityType: radioUI({
      title:
        'What is your legal authority to request records on behalf of this Veteran?',
      hint:
        'Select the option that matches the legal documentation you will upload. Your documentation must support the authority type you select.',
      labels: {
        legal_guardian: 'Court-appointed legal guardian',
        healthcare_poa: 'Healthcare power of attorney',
        personal_rep_hipaa:
          'HIPAA personal representative (established under state law)',
        va_fiduciary: 'VA-appointed fiduciary',
        vso_accredited: 'VSO or accredited claims representative',
        surviving_nok: 'Surviving spouse or next of kin (Veteran is deceased)',
      },
      errorMessages: {
        required: 'Please select your legal authority type.',
      },
    }),
    phone: phoneUI('Your phone number'),
    email: emailUI('Your email address'),
    address: addressUI({
      omit: ['isMilitary'],
    }),
  },
};

export const representativeInfoSchema = {
  type: 'object',
  properties: {
    representative: {
      type: 'object',
      required: ['firstName', 'lastName', 'authorityType'],
      properties: {
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        authorityType: radioSchema([
          'legal_guardian',
          'healthcare_poa',
          'personal_rep_hipaa',
          'va_fiduciary',
          'vso_accredited',
          'surviving_nok',
        ]),
        phone: phoneSchema,
        email: emailSchema,
        address: addressSchema({
          omit: ['isMilitary'],
        }),
      },
    },
  },
};