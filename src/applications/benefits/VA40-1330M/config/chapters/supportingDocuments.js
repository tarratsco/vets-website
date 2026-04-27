import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Documents Intro Page ─────────────────────────────────────────────────────

export const documentsIntroUiSchema = {
  'view:documentsIntro': {
    'ui:description':
      'Based on your answers, you will need to upload the required documents listed below. You can save your progress and return later if you do not have all documents ready now.',
  },
};

export const documentsIntroSchema = {
  type: 'object',
  properties: {
    'view:documentsIntro': {
      type: 'object',
      properties: {},
    },
  },
};

// ─── Death Certificate ────────────────────────────────────────────────────────

export const deathCertificateUiSchema = {
  documents: {
    deathCertificate: fileInputUI({
      title: 'Upload a copy of the death certificate',
      hint:
        'Upload an official copy of the death certificate. Accepted file types: PDF, JPG, PNG. Maximum file size: 20 MB. If you have a paper certificate, you can take a clear photo with your phone.',
      required: true,
      errorMessages: {
        required: 'Please upload the death certificate.',
      },
    }),
  },
};

export const deathCertificateSchema = {
  type: 'object',
  required: ['documents'],
  properties: {
    documents: {
      type: 'object',
      required: ['deathCertificate'],
      properties: {
        deathCertificate: fileInputSchema(),
      },
    },
  },
};

// ─── DD Form 1300 (Active Duty path only) ────────────────────────────────────

export const ddForm1300UiSchema = {
  documents: {
    ddForm1300: fileInputUI({
      title: 'Upload the Report of Casualty (DD Form 1300)',
      hint:
        'DD Form 1300 is the official report of casualty issued by the service branch. Your Casualty Assistance Officer (CAO) can provide a copy. If you do not have it yet, you can save your progress and return when you have it.',
      required: true,
      errorMessages: {
        required: 'Please upload DD Form 1300 for an active duty submission.',
      },
    }),
  },
};

export const ddForm1300Schema = {
  type: 'object',
  required: ['documents'],
  properties: {
    documents: {
      type: 'object',
      required: ['ddForm1300'],
      properties: {
        ddForm1300: fileInputSchema(),
      },
    },
  },
};

// ─── NGB Form 22 (Guard/Reserve path only) ───────────────────────────────────

export const ngbForm22UiSchema = {
  documents: {
    ngbForm22: fileInputUI({
      title: 'Upload the Guard/Reserve separation or service record',
      hint:
        'For National Guard members, this is NGB Form 22 (Report of Separation and Record of Service). For Reserve members, an equivalent separation record is acceptable.',
      required: true,
      errorMessages: {
        required:
          'Please upload the Guard/Reserve service record for a Guard/Reserve submission.',
      },
    }),
  },
};

export const ngbForm22Schema = {
  type: 'object',
  required: ['documents'],
  properties: {
    documents: {
      type: 'object',
      required: ['ngbForm22'],
      properties: {
        ngbForm22: fileInputSchema(),
      },
    },
  },
};

// ─── Additional Documents ─────────────────────────────────────────────────────

export const additionalDocumentsUiSchema = {
  documents: {
    additionalDocuments: fileInputUI({
      title: 'Upload any additional supporting documents (optional)',
      hint:
        'You may upload up to 5 additional supporting documents such as prior service DD Form 214 or other supporting documentation.',
      required: false,
      errorMessages: {},
    }),
  },
};

export const additionalDocumentsSchema = {
  type: 'object',
  properties: {
    documents: {
      type: 'object',
      properties: {
        additionalDocuments: fileInputSchema(),
      },
    },
  },
};

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const supportingDocumentsPages = {
  documentsIntro: {
    path: 'supporting-documents/required-documents-intro',
    title: 'Documents you need to upload',
    uiSchema: documentsIntroUiSchema,
    schema: documentsIntroSchema,
  },
  deathCertificate: {
    path: 'supporting-documents/death-certificate',
    title: 'Death certificate',
    uiSchema: deathCertificateUiSchema,
    schema: deathCertificateSchema,
  },
  ddForm1300: {
    path: 'supporting-documents/dd-form-1300',
    title: 'Report of Casualty (DD Form 1300)',
    depends: formData => formData.serviceStatusAtDeath === 'activeDuty',
    uiSchema: ddForm1300UiSchema,
    schema: ddForm1300Schema,
  },
  ngbForm22: {
    path: 'supporting-documents/ngb-form-22',
    title: 'Guard/Reserve service record',
    depends: formData => formData.serviceStatusAtDeath === 'guardOrReserve',
    uiSchema: ngbForm22UiSchema,
    schema: ngbForm22Schema,
  },
  additionalDocuments: {
    path: 'supporting-documents/additional-documents',
    title: 'Additional documents (optional)',
    uiSchema: additionalDocumentsUiSchema,
    schema: additionalDocumentsSchema,
  },
};