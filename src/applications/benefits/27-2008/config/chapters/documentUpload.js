import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

function isDocumentationRequired(formData) {
  return formData?.eligibility?.documentationAvailable === 'Y';
}

export const documentUploadUiSchema = {
  documents: {
    'ui:title': 'Upload discharge documentation',
    dd214Upload: fileInputMultipleUI({
      title: 'Upload discharge documentation (DD Form 214 or equivalent)',
      hint:
        'Accepted documents include: DD Form 214 (Certificate of Release or Discharge from Active Duty), WD AGO 53-55 (for World War II-era Veterans), or other official military discharge documents. Accepted file types: PDF, JPG, PNG. Maximum file size: 20 MB per file. You may upload up to 3 files.',
      required: isDocumentationRequired,
      errorMessages: {
        required:
          "Please upload a copy of the Veteran's discharge documentation.",
      },
    }),
  },
};

export const documentUploadSchema = {
  type: 'object',
  properties: {
    documents: {
      type: 'object',
      properties: {
        dd214Upload: fileInputMultipleSchema(),
      },
    },
  },
};