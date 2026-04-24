export const MITIGATING_REASON_CODES = [
  'voluntary_withdrawal',
  'medical',
  'personal_family_emergency',
  'non_punitive_grade',
];

/**
 * Returns true when type of change is full termination or partial withdrawal.
 * Controls display of last-date-of-attendance page.
 * @param {string} typeOfChange
 * @returns {boolean}
 */
export function isTerminationOrWithdrawal(typeOfChange) {
  return (
    typeOfChange === 'full_termination' ||
    typeOfChange === 'partial_withdrawal'
  );
}

/**
 * Returns true when type of change is credit hour reduction or partial withdrawal.
 * Controls display of updated-enrollment-details page.
 * @param {string} typeOfChange
 * @returns {boolean}
 */
export function isReductionOrPartialWithdrawal(typeOfChange) {
  return (
    typeOfChange === 'credit_hour_reduction' ||
    typeOfChange === 'partial_withdrawal'
  );
}

/**
 * Returns true when the effective date of change is more than 30 days before today.
 * Controls display of timeliness-acknowledgment page.
 * @param {string} effectiveDateOfChange ISO 8601 date string
 * @returns {boolean}
 */
export function isLateSubmission(effectiveDateOfChange) {
  if (!effectiveDateOfChange) return false;
  const effective = new Date(`${effectiveDateOfChange}T00:00:00`);
  const today = new Date();
  const diffDays = Math.floor((today - effective) / (1000 * 60 * 60 * 24));
  return diffDays > 30;
}

/**
 * Returns true when the reason for change triggers the mitigating circumstances page.
 * @param {string} reasonForChange
 * @returns {boolean}
 */
export function hasMitigatingReasonCode(reasonForChange) {
  return MITIGATING_REASON_CODES.includes(reasonForChange);
}

/**
 * Returns true when the supporting documentation page should be required.
 * @param {object} formData
 * @returns {boolean}
 */
export function requiresSupportingDocumentation(formData) {
  return formData.typeOfChange === 'correction';
}

/**
 * Returns true when the supporting documentation page should be displayed.
 * @param {object} formData
 * @returns {boolean}
 */
export function showSupportingDocumentation(formData) {
  return (
    formData.typeOfChange === 'correction' ||
    formData.mitigatingCircumstancesKnown === 'yes' ||
    isLateSubmission(formData.effectiveDateOfChange)
  );
}