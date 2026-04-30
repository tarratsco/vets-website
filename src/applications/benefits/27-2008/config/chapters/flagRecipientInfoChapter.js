import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  FLAG_RECIPIENT_RELATIONSHIP_LABELS,
  FLAG_RECIPIENT_RELATIONSHIP_KEYS,
} from '../../constants';

const relationshipLabels = FLAG_RECIPIENT_RELATIONSHIP_LABELS;

export const flagRecipientInfoUiSchema = {
  flagRecipient: {
    'ui:title': 'Flag recipient information',
    recipientFullName: textUI({
      title: 'Full name of the person entitled to receive the flag',
      hint:
        'Enter the name of the next-of-kin or authorized person who will receive the burial flag. Only one flag may be issued for each deceased Veteran.',
      errorMessages: {
        required:
          'Please enter the full name of the person entitled to receive the flag.',
      },
    }),
    recipientRelationship: selectUI({
      title: 'Relationship to the deceased Veteran',
      hint:
        'Select the relationship of the person receiving the flag to the deceased Veteran. The flag is generally given in this order of precedence per Section F of the form instructions: surviving spouse, children, parents, brothers or sisters, uncles or aunts, nephews or nieces, others.',
      labels: relationshipLabels,
      errorMessages: {
        required:
          'Please select the relationship of the person receiving the flag to the deceased Veteran.',
      },
    }),
    recipientRelationshipOther: textUI({
      title: 'Describe your relationship (optional)',
      hint: 'Please describe the relationship to the deceased Veteran.',
      'ui:options': {
        expandUnder: 'recipientRelationship',
        expandUnderCondition: 'other',
      },
    }),
  },
};

export const flagRecipientInfoSchema = {
  type: 'object',
  required: ['flagRecipient'],
  properties: {
    flagRecipient: {
      type: 'object',
      required: ['recipientFullName', 'recipientRelationship'],
      properties: {
        recipientFullName: {
          type: 'string',
          minLength: 1,
          maxLength: 80,
        },
        recipientRelationship: selectSchema(FLAG_RECIPIENT_RELATIONSHIP_KEYS),
        recipientRelationshipOther: {
          type: 'string',
          maxLength: 100,
        },
      },
    },
  },
};