import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const certItemUiSchema = {
  certifyingBoard: textUI({
    title: 'Certifying board or organization',
    hint:
      'Enter the certifying board (e.g., ANCC, NBCRNA, AANA). If not listed, enter the full name.',
  }),
  specialty: textUI({
    title: 'Specialty or subspecialty certified',
  }),
  certificationNumber: textUI({
    title: 'Certification number',
  }),
  initialCertificationDate: currentOrPastDateUI({
    title: 'Date of initial certification',
  }),
  expirationDate: currentOrPastDateUI({
    title: 'Certification expiration or recertification date',
    hint: 'If your certification does not expire, leave this blank.',
  }),
  certificationStatus: radioUI({
    title: 'Current status of this certification',
    labels: {
      current: 'Current and active',
      pending: 'Initial certification pending',
      lapsed: 'Lapsed',
      revoked: 'Revoked',
    },
    errorMessages: {
      required: 'Please select a certification status.',
    },
  }),
  anticipatedCertificationDate: currentOrPastDateUI({
    title: 'Expected certification or exam date',
    'ui:options': {
      hideIf: (formData, index) => {
        const certs = formData?.boardCertifications;
        if (!certs || !certs[index]) return true;
        return certs[index].certificationStatus !== 'pending';
      },
    },
  }),
  statusExplanation: textareaUI({
    title: 'Explain the certification status',
    charcount: true,
    'ui:options': {
      hideIf: (formData, index) => {
        const certs = formData?.boardCertifications;
        if (!certs || !certs[index]) return true;
        const status = certs[index].certificationStatus;
        return status !== 'lapsed' && status !== 'revoked';
      },
    },
  }),
};

const certItemSchema = {
  type: 'object',
  properties: {
    certifyingBoard: { type: 'string', maxLength: 200 },
    specialty: { type: 'string', maxLength: 200 },
    certificationNumber: { type: 'string', maxLength: 50 },
    initialCertificationDate: currentOrPastDateSchema,
    expirationDate: currentOrPastDateSchema,
    certificationStatus: radioSchema(['current', 'pending', 'lapsed', 'revoked']),
    anticipatedCertificationDate: currentOrPastDateSchema,
    statusExplanation: { type: 'string', maxLength: 1000 },
  },
};

export const boardCertificationsUiSchema = {
  'ui:title': 'Board certifications',
  'ui:description':
    'List any board certifications you hold. If you do not hold any board certifications, select Continue.',
  boardCertifications: {
    'ui:options': {
      itemName: 'board certification',
      viewField: CertViewField,
      keepInPageOnReview: true,
    },
    items: certItemUiSchema,
  },
};

function CertViewField({ formData }) {
  return (
    <div>
      <strong>{formData.certifyingBoard}</strong> &mdash; {formData.specialty}
    </div>
  );
}

export const boardCertificationsSchema = {
  type: 'object',
  properties: {
    boardCertifications: {
      type: 'array',
      items: certItemSchema,
    },
  },
};