/**
 * @module pages/veteranContact
 * @description Veteran's mailing address, phone, and email for ROI office follow-up
 */
import {
  textUI,
  textSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
  addressUI,
  addressSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranContactUiSchema = {
  'ui:title': 'Veteran contact information',
  'ui:description':
    "We've pre-filled your contact information from your VA profile. Review it and make any updates needed.",
  veteran: {
    address: addressUI({
      omit: ['isMilitary'],
    }),
    phone: phoneUI("Veteran's phone number"),
    email: emailUI("Veteran's email address"),
  },
};

export const veteranContactSchema = {
  type: 'object',
  properties: {
    veteran: {
      type: 'object',
      properties: {
        address: addressSchema({
          omit: ['isMilitary'],
        }),
        phone: phoneSchema,
        email: emailSchema,
      },
    },
  },
};