import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { DISCHARGE_CHARACTER_LABELS } from '../../constants';

export const dischargeCharacterUiSchema = {
  eligibility: {
    dischargeCharacter: radioUI({
      title:
        'Was the Veteran discharged from military service under conditions other than dishonorable?',
      hint:
        "Veterans with a dishonorable discharge are not eligible for a burial flag. If you are unsure of the discharge character, select 'I don't know' and we will provide guidance.",
      labels: DISCHARGE_CHARACTER_LABELS,
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
        dischargeCharacter: radioSchema(
          Object.keys(DISCHARGE_CHARACTER_LABELS),
        ),
      },
    },
  },
};