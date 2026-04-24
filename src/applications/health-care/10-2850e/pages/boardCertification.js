import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const certStatusValues = ['current', 'pending', 'lapsed', 'revoked'];

export const boardCertificationUiSchema = {
  boardCertifications: {
    'ui:title': 'Board Certifications',
    'ui:description':
      'List all board certifications you hold or have held. Leave this section blank if you have no board certifications.',
    'ui:options': {
      itemName: 'Certification',
      viewField: ({ formData }) =>
        `${formData.certifyingBoard || 'Certification'} — ${formData.specialty || ''}`,
    },
    items: {
      certifyingBoard: textUI({
        title: 'Certifying board or organization',
        hint:
          'For example: American Nurses Credentialing Center (ANCC), National Board of Certification and Recertification for Nurse Anesthetists (NBCRNA)',
        errorMessages: { required: 'Please enter the certifying board name.' },
      }),
      specialty: textUI({
        title: 'Specialty or subspecialty certified',
        errorMessages: { required: 'Please enter the specialty.' },
      }),
      certificationNumber: textUI({
        title: 'Certification number (if applicable)',
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
      },
      certificationStatus: radioUI({
        title: 'Current status of this certification',
        labels: {
          current: 'Current and active',
          pending: 'Initial certification pending (exam scheduled or results awaited)',
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
          hideIf: (formData, index) => {
            const certs = formData?.boardCertifications;
            if (!certs || !certs[index]) return true;
            return certs[index].certificationStatus !== 'pending';
          },
        },
      },
      statusExplanation: {
        ...textareaUI({
          title: 'Explain the lapsed or revoked status',
          charcount: true,
        }),
        'ui:options': {
          hideIf: (formData, index) => {
            const certs = formData?.boardCertifications;
            if (!certs || !certs[index]) return true;
            const status = certs[index].certificationStatus;
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
          specialty: { type: 'string', maxLength: 200 },
          certificationNumber: { type: 'string', maxLength: 50 },
          initialCertificationDate: currentOrPastDateSchema,
          expirationDate: currentOrPastDateSchema,
          certificationStatus: radioSchema(certStatusValues),
          anticipatedCertificationDate: currentOrPastDateSchema,
          statusExplanation: { type: 'string', maxLength: 1000 },
        },
      },
    },
  },
};