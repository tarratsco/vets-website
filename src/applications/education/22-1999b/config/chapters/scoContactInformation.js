import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const scoContactInformationUiSchema = {
  scoFirstName: textUI({
    title: 'Your first name',
    hint: 'School Certifying Official first name.',
    errorMessages: {
      required: 'Please enter your first name.',
    },
  }),
  scoLastName: textUI({
    title: 'Your last name',
    hint: 'School Certifying Official last name.',
    errorMessages: {
      required: 'Please enter your last name.',
    },
  }),
  scoTitle: textUI({
    title: 'Your title or role',
    hint: 'Example: Associate Registrar',
  }),
  scoPhone: textUI({
    title: 'Your phone number',
    hint:
      'Enter a 10-digit U.S. phone number. Include area code. Example: 5558675309. VA may use this number to contact you about this submission.',
    inputType: 'tel',
    autocomplete: 'tel',
    errorMessages: {
      required: 'Please enter a valid 10-digit U.S. phone number.',
      pattern: 'Please enter a valid 10-digit U.S. phone number.',
    },
  }),
  scoEmail: textUI({
    title: 'Your email address',
    hint:
      'Enter the email address where VA should send your submission confirmation and any follow-up communications about this form.',
    inputType: 'email',
    autocomplete: 'email',
    errorMessages: {
      required: 'Please enter a valid email address.',
      format: 'Please enter a valid email address in the format name@example.com.',
    },
  }),
};

export const scoContactInformationSchema = {
  type: 'object',
  required: ['scoFirstName', 'scoLastName', 'scoPhone', 'scoEmail'],
  properties: {
    scoFirstName: {
      type: 'string',
      maxLength: 50,
    },
    scoLastName: {
      type: 'string',
      maxLength: 60,
    },
    scoTitle: {
      type: 'string',
      maxLength: 80,
    },
    scoPhone: {
      type: 'string',
      pattern: '^\\d{10}$',
      minLength: 10,
      maxLength: 10,
    },
    scoEmail: {
      type: 'string',
      format: 'email',
      maxLength: 255,
    },
  },
};