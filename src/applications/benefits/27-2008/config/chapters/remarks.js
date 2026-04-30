import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

function isRemarksRequired(formData) {
  const noDocumentation = formData?.eligibility?.documentationAvailable === 'N';
  const recipientIsFriend =
    formData?.flagRecipient?.recipientRelationship === 'friend';
  const recipientIsOther =
    formData?.flagRecipient?.recipientRelationship === 'other';
  const applicantIsCloseFriend = formData?.applicantType === 'closeFriend';
  const branchIsOther =
    Array.isArray(formData?.serviceInformation?.branchOfService) &&
    formData.serviceInformation.branchOfService.includes('other');

  return (
    noDocumentation ||
    recipientIsFriend ||
    recipientIsOther ||
    applicantIsCloseFriend ||
    branchIsOther
  );
}

function validateRemarks(errors, formData) {
  if (isRemarksRequired(formData) && !formData?.remarks) {
    errors.remarks.addError(
      "Please explain in the Remarks field why documentation is not available and how you know the Veteran meets eligibility criteria.",
    );
  }
}

export const remarksUiSchema = {
  remarks: textareaUI({
    title: 'Remarks',
    hint:
      "Use this field to provide any additional information. This field is required if you answered 'No' to the documentation question (Item 13) — explain why documentation is not available and describe how you know the deceased was a Veteran who meets eligibility criteria. Also use this field if the person receiving the flag is a friend with no next-of-kin available, or if there are other special circumstances.",
    charcount: true,
    'ui:required': isRemarksRequired,
    errorMessages: {
      required:
        "Please explain in the Remarks field why documentation is not available and how you know the Veteran meets eligibility criteria.",
    },
  }),
  'ui:validations': [validateRemarks],
};

export const remarksSchema = {
  type: 'object',
  properties: {
    remarks: {
      type: 'string',
      maxLength: 1500,
    },
  },
};