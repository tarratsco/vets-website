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

const CERT_STATUS_LABELS = {
  current: 'Current and active',
  pending: 'Initial certification pending',
  lapsed: 'Lapsed (not recertified by expiration date)',
  revoked: 'Revoked',
};

export const boardCertificationsUiSchema = {
  boardCertifications: {
    'ui:title': 'Board certifications',
    'ui:description':
      'List all board certifications you hold or have held. If you have no board certifications, you may leave this section empty and continue.',
    'ui:options': {
      itemName: 'Certification',
      viewField: item =>
        `${item.certifyingBoard || 'Board'} — ${item.specialty || ''}`,
      keepInPageOnReview: true,
    },
    items: {
      certifyingBoard: textUI({
        title: 'Certifying board or organization',
        hint: 'For example: ANCC, NBCRNA, AANA, ABMS. If not listed, enter the full name.',
        errorMessages: { required: 'Please enter the certifying board.' },
      }),
      specialty: textUI({
        title: 'Specialty or subspecialty certified',
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
        labels: CERT_STATUS_LABELS,
        errorMessages: { required: 'Please select the certification status.' },
      }),
      anticipatedCertificationDate: currentOrPastDateUI({
        title: 'Expected date of certification',
        'ui:options': {
          hideIf: (formData, index) => {
            const certs = formData?.boardCertifications;
            if (!certs || !certs[index]) return true;
            return certs[index].certificationStatus !== 'pending';
          },
        },
      }),
      statusExplanation: textareaUI({
        title: 'Explain the lapsed or revoked status',
        'ui:options': {
          hideIf: (formData, index) => {
            const certs = formData?.boardCertifications;
            if (!certs || !certs[index]) return true;
            const status = certs[index].certificationStatus;
            return status !== 'lapsed' && status !== 'revoked';
          },
        },
      }),
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
          specialty: { type: 'string', maxLength: 200 },
          certificationNumber: { type: 'string', maxLength: 50 },
          initialCertificationDate: currentOrPastDateSchema,
          expirationDate: currentOrPastDateSchema,
          certificationStatus: radioSchema(Object.keys(CERT_STATUS_LABELS)),
          anticipatedCertificationDate: currentOrPastDateSchema,
          statusExplanation: { type: 'string', maxLength: 1000 },
        },
      },
    },
  },
};