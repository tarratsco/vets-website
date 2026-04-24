import { MITIGATING_REASON_CODES } from '../constants';

/**
 * Returns true when (today − effectiveDateOfChange) > 30 days
 * @param {string} effectiveDateOfChange - ISO 8601 date string YYYY-MM-DD
 * @returns {boolean}
 */
export const isLateSubmission = effectiveDateOfChange => {
  if (!effectiveDateOfChange) return false;
  const effective = new Date(effectiveDateOfChange);
  const today = new Date();
  const diffDays = Math.floor((today - effective) / (1000 * 60 * 60 * 24));
  return diffDays > 30;
};

/**
 * Returns true when change type requires last date of attendance
 */
export const isTerminationOrWithdrawal = typeOfChange =>
  typeOfChange === 'full_termination' ||
  typeOfChange === 'partial_withdrawal';

/**
 * Returns true when change type requires updated enrollment details
 */
export const isReductionOrPartialWithdrawal = typeOfChange =>
  typeOfChange === 'credit_hour_reduction' ||
  typeOfChange === 'partial_withdrawal';

/**
 * Returns true when mitigating circumstances screen should appear
 */
export const requiresMitigatingCircumstances = (typeOfChange, reasonForChange) =>
  typeOfChange !== 'correction' &&
  MITIGATING_REASON_CODES.includes(reasonForChange);

/**
 * Returns true when supporting documentation screen should appear
 */
export const requiresSupportingDocumentation = (typeOfChange, mitigatingCircumstancesKnown) =>
  typeOfChange === 'correction' ||
  mitigatingCircumstancesKnown === 'yes';