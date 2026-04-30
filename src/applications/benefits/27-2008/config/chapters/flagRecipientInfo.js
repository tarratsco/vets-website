import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const RELATIONSHIP_LABELS = {
  survivingSpouse: 'Surviving spouse',
  child: 'Child',
  parent: 'Parent (including adoptive, stepparent, or foster parent)',
  brotherOrSister: 'Brother or sister (including half-blood)',
  uncleOrAunt: 'Uncle or aunt',
  nephewOrNiece: 'Nephew or niece',
  cousinOrGrandparent: 'Cousin or grandparent',
  friend: 'Friend (no living next-of-kin available)',
  other: 'Other',
};

const RELATIONSHIP_KEYS = Object.keys(RELATIONSHIP_LABELS);

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
      errorMessages: {
        required:
          'Please select the relationship of the person receiving the flag to the deceased Veteran.',
      },
    }),
    recipientRelationshipOther: {
      ...textUI({
        title: 'Describe the relationship (required if "Other" selected)',
        errorMessages: {
          required: 'Please describe the relationship.',
        },
      }),
      'ui:options': {
        expandUnder: 'recipientRelationship',
        expandUnderCondition: 'other',
      },
    },
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
        recipientFullName: { type: 'string', minLength: 1, maxLength: 80 },
        recipientRelationship: selectSchema(RELATIONSHIP_KEYS),
        recipientRelationshipOther: { type: 'string', maxLength: 100 },
      },
    },
  },
};