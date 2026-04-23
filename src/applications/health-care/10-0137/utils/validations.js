/**
 * Custom validation functions for VA Form 10-0137
 */

/**
 * CL-12: Ensures at least one phone number is provided for the Veteran.
 */
export function validateAtLeastOnePhone(errors, fieldData) {
  const { veteranHomePhone, veteranWorkPhone, veteranMobilePhone } =
    fieldData || {};
  if (!veteranHomePhone && !veteranWorkPhone && !veteranMobilePhone) {
    errors.addError(
      'Please enter at least one phone number (home, work, or mobile)',
    );
  }
}

/**
 * CL-12: Ensures at least one phone number is provided for the primary agent.
 */
export function validateAtLeastOneAgentPhone(errors, fieldData) {
  const { homePhone, workPhone, mobilePhone } = fieldData || {};
  if (!homePhone && !workPhone && !mobilePhone) {
    errors.addError(
      'Please enter at least one phone number for your Health Care Agent',
    );
  }
}

/**
 * CL-12: Ensures at least one phone number is provided for the alternate agent.
 */
export function validateAtLeastOneAlternateAgentPhone(errors, fieldData) {
  const { homePhone, workPhone, mobilePhone } = fieldData || {};
  if (!homePhone && !workPhone && !mobilePhone) {
    errors.addError(
      'Please enter at least one phone number for your Alternate Health Care Agent',
    );
  }
}

/**
 * Validates that the veteran attestation checkbox is checked.
 */
export function validateVeteranAttestation(errors, fieldValue) {
  if (!fieldValue) {
    errors.addError(
      'You must certify that this form accurately describes your preferences before submitting',
    );
  }
}

/**
 * Validates the veteran signature date is not in the future.
 */
export function validateSignatureDate(errors, fieldValue) {
  if (!fieldValue) return;
  const signatureDate = new Date(`${fieldValue}T00:00:00`);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (signatureDate > today) {
    errors.addError(
      'Please enter a valid date. The date cannot be in the future.',
    );
  }
}

/**
 * CL-05: Validates that Witness 1 has confirmed all eligibility requirements.
 */
export function validateWitness1Eligibility(errors, fieldData) {
  if (!fieldData?.eligibilityConfirmed) {
    errors.eligibilityConfirmed.addError(
      'You must confirm all statements to serve as a witness for this advance directive',
    );
  }
}

/**
 * CL-06: Validates that Witness 2 has confirmed all eligibility requirements.
 */
export function validateWitness2Eligibility(errors, fieldData) {
  if (!fieldData?.eligibilityConfirmed) {
    errors.eligibilityConfirmed.addError(
      'You must confirm all statements to serve as a witness for this advance directive',
    );
  }
}

/**
 * CL-07: Validates Witness 1's name does not match the Veteran's name.
 */
export function validateWitnessNotVeteran(errors, fieldData, formData) {
  const veteranFirst = (formData?.veteranFullName?.first || '').toLowerCase().trim();
  const veteranLast = (formData?.veteranFullName?.last || '').toLowerCase().trim();
  const veteranFullName = `${veteranFirst} ${veteranLast}`.trim();

  const witnessName = (fieldData?.name || '').toLowerCase().trim();
  const witnessSignature = (fieldData?.signatureName || '').toLowerCase().trim();

  if (
    witnessName === veteranFullName ||
    witnessSignature === veteranFullName
  ) {
    errors.name.addError(
      'The patient cannot serve as their own witness. Please have a qualifying person serve as Witness 1.',
    );
  }
}

/**
 * CL-06: Validates Witness 2's name is different from Witness 1.
 */
export function validateWitness2DistinctFromWitness1(errors, fieldData, formData) {
  const witness1Name = (formData?.witness1?.signatureName || '')
    .toLowerCase()
    .trim();
  const witness2Name = (fieldData?.signatureName || '').toLowerCase().trim();

  if (witness1Name && witness2Name && witness1Name === witness2Name) {
    errors.signatureName.addError(
      'Witness 2 must be a different person from Witness 1. Please enter a different name.',
    );
  }
}

/**
 * CL-06: Validates Witness 2's name does not match the Veteran's name.
 */
export function validateWitness2NotVeteran(errors, fieldData, formData) {
  const veteranFirst = (formData?.veteranFullName?.first || '').toLowerCase().trim();
  const veteranLast = (formData?.veteranFullName?.last || '').toLowerCase().trim();
  const veteranFullName = `${veteranFirst} ${veteranLast}`.trim();

  const witness2Name = (fieldData?.signatureName || '').toLowerCase().trim();

  if (veteranFullName && witness2Name && witness2Name === veteranFullName) {
    errors.signatureName.addError(
      'The person named as your Health Care Agent, a beneficiary, or the patient cannot serve as a witness. Please have a different person serve as Witness 2.',
    );
  }
}