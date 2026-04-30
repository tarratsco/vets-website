import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const RELATIONSHIP_OPTIONS = [
  'survivingSpouse',
  'child',
  'parent',
  'brotherOrSister',
  'uncleOrAunt',
  'nephewOrNiece',
  'cousinOrGrandparent',
  'friend',
  'other',
];

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

function validateOtherRelationship(errors, formData) {
  const relationship = formData?.flagRecipient?.recipientRelationship;
  const other = formData?.flagRecipient?.recipientRelationshipOther;
  if (relationship === 'other' && (!other || !other.trim())) {
    errors.flagRecipient.recipientRelationshipOther.addError(
      'Please describe the relationship to the deceased Veteran.',
    );
  }
}

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
      labels: RELATIONSHIP_LABELS,
      errorMessages: {
        required:
          'Please select the relationship of the person receiving the flag to the deceased Veteran.',
      },
    }),
    recipientRelationshipOther: textUI({
      title: 'Describe your relationship to the deceased Veteran',
      hint: 'Required when "Other" is selected above.',
      'ui:required': formData =>
        formData?.flagRecipient?.recipientRelationship === 'other',
    }),
  },
  'ui:validations': [validateOtherRelationship],
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
        recipientRelationship: selectSchema(RELATIONSHIP_OPTIONS),
        recipientRelationshipOther: {
          type: 'string',
          maxLength: 100,
        },
      },
    },
  },
};