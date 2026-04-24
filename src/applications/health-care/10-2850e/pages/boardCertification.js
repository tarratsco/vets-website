import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const boardCertificationUiSchema = {
  boardCertifications: {
    'ui:title': 'Board certifications',
    'ui:description':
      'List all board certifications you hold or have held. This section is optional if you do not hold any board certifications.',
    'ui:options': {
      itemName: 'Certification',
      viewField: ({ formData }) =>
        `${formData?.certifyingBoard || 'Board'} — ${formData?.specialty || ''}`,
    },
    items: {
      certifyingBoard: textUI({
        title: 'Certifying board or organization',
        hint: 'For example: ANCC, NBCRNA, ABMS, AANA',
        errorMessages: { required: 'Please enter the certifying board.' },
      }),
      certifyingBoardOther: textUI({
        title: 'Other certifying board name',
      }),
      specialty: textUI({
        title: 'Specialty or subspecialty certified',
        errorMessages: { required: 'Please enter your specialty.' },
      }),
      certificationNumber: textUI({
        title: 'Certification number',
      }),
      initialCertificationDate: currentOrPastDateUI({
        title: 'Date of initial certification',
        errorMessages: {
          required: 'Please enter the initial certification date.',
          futureDate: 'Initial certification date cannot be in the future.',
        },
      }),
      expirationDate: {
        ...currentOrPastDateUI({
          title: 'Certification expiration or recertification date',
          hint: 'If your certification does not expire, leave this blank.',
        }),
        'ui:required': () => false,
      },
      certificationStatus: radioUI({
        title: 'Current status of this certification',
        labels: {
          current: 'Current and active',
          pending: 'Initial certification pending',
          lapsed: 'Lapsed (not recertified by expiration date)',
          revoked: 'Revoked',
        },
        errorMessages: { required: 'Please select the certification status.' },
      }),
      anticipatedCertificationDate: {
        ...currentOrPastDateUI({
          title: 'Expected date of certification or exam date',
        }),
        'ui:options': {
          hideIf: (formData, index) =>
            formData?.boardCertifications?.[index]?.certificationStatus !== 'pending',
        },
      },
      statusExplanation: {
        ...textareaUI({
          title: 'Explain the lapsed or revoked status',
          charcount: true,
        }),
        'ui:options': {
          hideIf: (formData, index) => {
            const status = formData?.boardCertifications?.[index]?.certificationStatus;
            return status !== 'lapsed' && status !== 'revoked';
          },
        },
      },
    },
  },
};

export const boardCertificationSchema = {
  type: 'object',
  properties: {
    boardCertifications: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          certifyingBoard: { type: 'string', maxLength: 200 },
          certifyingBoardOther: { type: 'string', maxLength: 200 },
          specialty: { type: 'string', maxLength: 200 },
          certificationNumber: { type: 'string', maxLength: 50 },
          initialCertificationDate: currentOrPastDateSchema,
          expirationDate: currentOrPastDateSchema,
          certificationStatus: radioSchema(['current', 'pending', 'lapsed', 'revoked']),
          anticipatedCertificationDate: currentOrPastDateSchema,
          statusExplanation: { type: 'string', maxLength: 1000 },
        },
      },
    },
  },
};