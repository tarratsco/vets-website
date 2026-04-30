import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const dischargeCharacterUiSchema = {
  eligibility: {
    dischargeCharacter: radioUI({
      title:
        'Was the Veteran discharged from military service under conditions other than dishonorable?',
      hint:
        'Veterans with a dishonorable discharge are not eligible for a burial flag. If you are unsure of the discharge character, select "I don\'t know" and we will provide guidance.',
      labels: {
        honorable:
          'Yes \u2014 the Veteran\'s discharge was under honorable or other-than-dishonorable conditions',
        dishonorable:
          'No \u2014 the Veteran received a dishonorable discharge',
        unknown: "I don't know the discharge character",
      },
      errorMessages: {
        required: "Please indicate the Veteran's discharge character.",
      },
    }),
  },
};

export const dischargeCharacterSchema = {
  type: 'object',
  required: ['eligibility'],
  properties: {
    eligibility: {
      type: 'object',
      required: ['dischargeCharacter'],
      properties: {
        dischargeCharacter: radioSchema([
          'honorable',
          'dishonorable',
          'unknown',
        ]),
      },
    },
  },
};