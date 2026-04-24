import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseHistoryUiSchema = {
  licensesAndCredentials: {
    'ui:title': 'Adverse licensure and privilege history',
    licenseActionHistory: radioUI({
      title:
        'Do you have pending action, or have you ever had any license, certification, or registration to practice (including DEA certificate) revoked, suspended, denied, restricted, or placed on a probationary status, or have you ever voluntarily relinquished a license, certification, or registration in lieu of formal action?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "This question applies to both your current health profession and any prior health profession. If 'Yes,' you will be required to provide a detailed explanation on the next page.",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
    clinicalPrivilegeActionHistory: radioUI({
      title:
        'Do you have pending action, or have you ever had clinical privileges at any health care institution or agency revoked, suspended, denied, restricted, limited, or placed on a probationary status, or have you ever voluntarily relinquished clinical privileges in lieu of formal action?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "Clinical privileges include the right to perform specific clinical procedures or provide patient care at a health care institution. If 'Yes,' you will be required to provide a detailed explanation on the next page.",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
  },
};

export const adverseHistorySchema = {
  type: 'object',
  properties: {
    licensesAndCredentials: {
      type: 'object',
      required: ['licenseActionHistory', 'clinicalPrivilegeActionHistory'],
      properties: {
        licenseActionHistory: radioSchema(['Y', 'N']),
        clinicalPrivilegeActionHistory: radioSchema(['Y', 'N']),
      },
    },
  },
};