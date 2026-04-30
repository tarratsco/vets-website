import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

function validateRemarksWhenNoDocumentation(errors, formData) {
  const noDoc =
    formData?.eligibility?.documentationAvailable === false;
  const remarks = formData?.remarks;
  if (noDoc && (!remarks || remarks.trim().length === 0)) {
    errors.remarks.addError(
      "Please explain in the Remarks field why documentation is not available and how you know the Veteran meets eligibility criteria.",
    );
  }
}

export const eligibilityDocumentationUiSchema = {
  eligibility: {
    documentationAvailable: yesNoUI({
      title:
        'Has documentation been presented or attached that shows the Veteran meets the eligibility criteria?',
      hint:
        "Documentation includes a copy of the Veteran's DD Form 214 (Certificate of Release or Discharge from Active Duty) or other official service records. See Section E of the form instructions.",
      labels: {
        Y: 'Yes \u2014 I am uploading documentation with this application',
        N: 'No \u2014 I do not have documentation available at this time',
      },
      errorMessages: {
        required: 'Please indicate whether documentation is available.',
      },
    }),
  },
  'ui:validations': [validateRemarksWhenNoDocumentation],
};

export const eligibilityDocumentationSchema = {
  type: 'object',
  required: ['eligibility'],
  properties: {
    eligibility: {
      type: 'object',
      required: ['documentationAvailable'],
      properties: {
        documentationAvailable: yesNoSchema,
      },
    },
  },
};