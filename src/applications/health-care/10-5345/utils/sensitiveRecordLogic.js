/**
 * Utility functions for sensitive record type conditional logic
 */

const SENSITIVE_TYPES = [
  'substanceUseTreatment',
  'psychotherapyNotes',
  'hivAidsRecords',
  'geneticInformation',
];

/**
 * Returns true if any sensitive record type is selected.
 * Used as the `depends` function for the sensitiveRecords page.
 *
 * @param {object} formData
 * @returns {boolean}
 */
export const hasSensitiveRecordTypes = formData =>
  SENSITIVE_TYPES.some(type => formData?.recordTypes?.[type] === true);

/**
 * Returns true if the user has selected record types that cannot
 * be released on this form (42 CFR Part 2 / psychotherapy notes).
 * Used to gate form submission.
 *
 * @param {object} formData
 * @returns {boolean}
 */
export const hasProhibitedRecordTypes = formData => {
  const { substanceUseTreatment, psychotherapyNotes } =
    formData?.recordTypes || {};
  return substanceUseTreatment === true || psychotherapyNotes === true;
};

/**
 * Returns the list of sensitive types that have been selected.
 *
 * @param {object} formData
 * @returns {string[]}
 */
export const getSelectedSensitiveTypes = formData =>
  SENSITIVE_TYPES.filter(type => formData?.recordTypes?.[type] === true);