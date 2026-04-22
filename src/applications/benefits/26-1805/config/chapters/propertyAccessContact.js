/**
 * Chapter 6, Screen 13 — Property Access Contact
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const propertyAccessContactUiSchema = {
  accessAndTiming: {
    'ui:title': 'Property access contact',
    propertyAccessContact: {
      'ui:title': 'Contact who will provide property access to the appraiser',
      contactType: selectUI({
        title: 'Role of the property access contact',
        hint:
          'Select the role that best describes the person who will provide access to the property.',
        errorMessages: {
          required: 'Select the contact type.',
        },
      }),
      contactName: textUI({
        title: 'Full name of the property access contact',
        autocomplete: 'name',
        errorMessages: {
          required: 'Enter the name of the property access contact.',
        },
      }),
      contactPhone: phoneUI({
        title: 'Contact phone number',
        errorMessages: {
          required: 'Enter a 10-digit phone number, including area code.',
          pattern: 'Enter a 10-digit phone number, including area code.',
        },
      }),
      contactPhoneAlt: textUI({
        title: 'Alternate phone number (optional)',
        inputType: 'tel',
        hint: 'Enter an alternate phone number for the access contact if available.',
        errorMessages: {
          pattern: 'Enter a valid 10-digit alternate phone number.',
        },
      }),
      contactEmail: emailUI({
        title: 'Email address (optional)',
        errorMessages: {
          pattern: 'Enter a valid email address.',
        },
      }),
      accessInstructions: textareaUI({
        title: 'Access instructions (optional)',
        hint:
          'Provide lockbox codes, gate access instructions, or other information the appraiser needs to access the property (500 characters max).',
        charcount: true,
      }),
    },
  },
};

export const propertyAccessContactSchema = {
  type: 'object',
  properties: {
    accessAndTiming: {
      type: 'object',
      required: ['propertyAccessContact'],
      properties: {
        propertyAccessContact: {
          type: 'object',
          required: ['contactType', 'contactName', 'contactPhone'],
          properties: {
            contactType: {
              type: 'string',
              enum: [
                'listing_agent',
                'seller',
                'current_occupant',
                'property_manager',
                'other',
              ],
              enumNames: [
                'Listing agent',
                'Seller',
                'Current occupant',
                'Property manager',
                'Other',
              ],
            },
            contactName: { type: 'string', maxLength: 75 },
            contactPhone: phoneSchema,
            contactPhoneAlt: {
              type: 'string',
              pattern: '^\\d{10}$',
              minLength: 10,
              maxLength: 10,
            },
            contactEmail: {
              type: 'string',
              pattern: '^[^@]+@[^@]+\\.[^@]+$',
              maxLength: 100,
            },
            accessInstructions: { type: 'string', maxLength: 500 },
          },
        },
      },
    },
  },
};