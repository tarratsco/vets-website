/**
 * Custom validation functions for VA Form 10-5345
 */

/**
 * Validates that at least one record type has been selected.
 * Used as a custom form-level validation.
 *
 * @param {object} errors - rjsf errors object
 * @param {object} formData - current form data
 */
export const validateAtLeastOneRecordType = (errors, formData) => {
  const recordTypes = formData?.recordTypes || {};
  const generalTypes = [
    'clinicalNotes',
    'labResults',
    'imagingRadiology',
    'medicationHistory',
    'dischargeSummaries',
    'operativeReports',
    'pathologyReports',
    'consultationReports',
    'immunizationRecords',
    'vitalSigns',
    'hivAidsRecords',
    'geneticInformation',
    'other',
  ];

  const hasAnySelected = generalTypes.some(type => recordTypes[type] === true);

  if (!hasAnySelected) {
    errors.recordTypes.addError(
      'Please select at least one record type to release.',
    );
  }
};

/**
 * Validates that at least one purpose of disclosure has been selected.
 *
 * @param {object} errors - rjsf errors object
 * @param {object} formData - current form data
 */
export const validateAtLeastOnePurpose = (errors, formData) => {
  const purposes = formData?.purposeOfDisclosure || {};
  const purposeTypes = [
    'personalReview',
    'continuityOfCare',
    'legalProceedings',
    'insurance',
    'socialSecurityDisability',
    'vaDisabilityClaimSupport',
    'employmentSecurityClearance',
    'other',
  ];

  const hasAnySelected = purposeTypes.some(type => purposes[type] === true);

  if (!hasAnySelected) {
    errors.purposeOfDisclosure.addError(
      'Please select at least one purpose for this disclosure.',
    );
  }
};

/**
 * Validates that the expiration date is in the future.
 *
 * @param {object} errors
 * @param {object} formData
 */
export const validateFutureExpirationDate = (errors, formData) => {
  const { expirationType, expirationDate } =
    formData?.authorizationExpiration || {};

  if (expirationType === 'specific_date' && expirationDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(`${expirationDate}T00:00:00`);

    if (expDate <= today) {
      errors.authorizationExpiration.expirationDate.addError(
        'The expiration date must be a future date.',
      );
    }
  }
};

/**
 * Validates that the record end date is on or after the start date.
 *
 * @param {object} errors
 * @param {object} formData
 */
export const validateDateRange = (errors, formData) => {
  const { rangeType, startDate, endDate } = formData?.recordDateRange || {};

  if (rangeType === 'specific_dates' && startDate && endDate) {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (end < start) {
      errors.recordDateRange.endDate.addError(
        'The end date must be on or after the start date.',
      );
    }
  }
};