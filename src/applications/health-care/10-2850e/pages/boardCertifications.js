import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const CERTIFICATION_STATUS_LABELS = {
  current: 'Current and active',
  pending: 'Initial certification pending (exam scheduled or results awaited)',
  lapsed: 'Lapsed (not recertified by expiration date)',
  revoked: 'Revoked',
};

export const boardCertificationsUiSchema = {
  boardCertifications: {
    'ui:title': 'Board certifications',
    'ui:description':
      'List all board certifications you hold or have held. If you have no board certifications, select Continue to proceed.',
    'ui:options': {
      itemName: 'Board certification',
      viewField: ({ formData }) =>
        `${formData.certifyingBoard || 'Certification'} — ${formData.specialty || ''}`,
    },
    items: {
      certifyingBoard: textUI({
        title: 'Certifying board or organization',
        hint:
          'For example: ANCC, NBCRNA, AANA. If your certifying organization is not listed, enter the name.',
        errorMessages: { required: 'Please enter the certifying board.' },
      }),
      specialty: textUI({
        title: 'Specialty or subspecialty certified',
        hint: 'For example: Critical Care Nursing, Nurse Anesthesia',
        errorMessages: { required: 'Please enter the specialty.' },
      }),
      certificationNumber: textUI({
        title: 'Certification number',
      }),
      initialCertificationDate: currentOrPastDateUI({
        title: 'Date of initial certification',
        errorMessages: {
          required: 'Please enter the initial certification date.',
          futureDate: 'Certification date cannot be in the future.',
        },
      }),
      expirationDate: currentOrPastDateUI({
        title: 'Certification expiration or recertification date',
        hint: 'If your certification does not expire, leave this blank.',
      }),
      certificationStatus: radioUI({
        title: 'Current status of this certification',
        labels: CERTIFICATION_STATUS_LABELS,
        errorMessages: {
          required: 'Please select the certification status.',
        },
      }),
      anticipatedCertificationDate: {
        ...currentOrPastDateUI({
          title: 'Expected date of certification or exam date',
        }),
        'ui:options': {
          hideIf: formData => !formData || formData.certificationStatus !== 'pending',
          expandUnder: 'certificationStatus',
        },
      },
      statusExplanation: {
        ...textareaUI({
          title: 'Explain the status of this certification',
          charcount: true,
        }),
        'ui:options': {
          hideIf: formData =>
            !formData ||
            (formData.certificationStatus !== 'lapsed' &&
              formData.certificationStatus !== 'revoked'),
          expandUnder: 'certificationStatus',
        },
      },
    },
  },
};

export const boardCertificationsSchema = {
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