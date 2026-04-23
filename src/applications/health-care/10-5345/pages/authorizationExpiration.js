/**
 * @module pages/authorizationExpiration
 * @description Authorization expiration — required HIPAA element (45 CFR 164.508(c)(1)(v))
 */
import {
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

export const authorizationExpirationUiSchema = {
  'ui:title': 'Authorization expiration',
  'ui:description': () => (
    <va-alert status="info" visible>
      <span slot="headline">
        HIPAA requires an expiration date or event
      </span>
      <p>
        Under HIPAA (45 CFR 164.508(c)(1)(v)), a valid authorization must have
        an expiration date or an expiration event. Standard VHA policy is 90
        days from the date of signature. Enter a date at least 1 day from today.
      </p>
    </va-alert>
  ),
  authorizationExpiration: {
    expirationType: radioUI({
      title: 'How should this authorization expire?',
      labels: {
        specific_date: 'On a specific date',
        expiration_event:
          'When a specific event occurs (e.g., "upon completion of litigation")',
      },
      errorMessages: {
        required: 'Please select how this authorization should expire.',
      },
    }),
    expirationDate: {
      'ui:title': 'Expiration date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:hint':
        'Enter a future date on which this authorization will expire. Recommended: 90 days from today.',
      'ui:errorMessages': {
        required: 'Please enter an expiration date.',
        pattern: 'Please enter a valid future date.',
      },
      'ui:options': {
        expandUnder: 'expirationType',
        expandUnderCondition: 'specific_date',
      },
      'ui:required': formData =>
        formData?.authorizationExpiration?.expirationType === 'specific_date',
    },
    expirationEvent: textareaUI({
      title: 'Describe the expiration event',
      hint:
        'Describe the event upon which this authorization expires (e.g., "Upon completion of litigation" or "Upon resolution of insurance claim").',
      charcount: true,
      'ui:options': {
        expandUnder: 'expirationType',
        expandUnderCondition: 'expiration_event',
      },
      'ui:required': formData =>
        formData?.authorizationExpiration?.expirationType ===
        'expiration_event',
      errorMessages: {
        required:
          'Please describe the event upon which this authorization expires.',
      },
    }),
  },
};

export const authorizationExpirationSchema = {
  type: 'object',
  required: ['authorizationExpiration'],
  properties: {
    authorizationExpiration: {
      type: 'object',
      required: ['expirationType'],
      properties: {
        expirationType: radioSchema(['specific_date', 'expiration_event']),
        expirationDate: {
          type: 'string',
          format: 'date',
        },
        expirationEvent: {
          type: 'string',
          maxLength: 500,
        },
      },
    },
  },
};