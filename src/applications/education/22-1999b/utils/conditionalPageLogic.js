import { MITIGATING_REASON_CODES, LATE_SUBMISSION_THRESHOLD_DAYS } from '../constants';

/**
 * Returns true when the type of change is full termination or partial withdrawal
 * (screens that require last date of attendance)
 */
export const isTerminationOrWithdrawal = typeOfChange =>
  typeOfChange === 'full_termination' || typeOfChange === 'partial_withdrawal';

/**
 * Returns true when the type of change is credit hour reduction or partial withdrawal
 * (screens that require updated enrollment details)
 */
export const isReductionOrPartialWithdrawal = typeOfChange =>
  typeOfChange === 'credit_hour_reduction' ||
  typeOfChange === 'partial_withdrawal';

/**
 * Returns true when the effective date is more than 30 days before today
 */
export const isLateSubmission = effectiveDateOfChange => {
  if (!effectiveDateOfChange) return false;
  const effective = new Date(effectiveDateOfChange);
  if (Number.isNaN(effective.getTime())) return false;
  const today = new Date();
  const diffDays = Math.floor(
    (today - effective) / (1000 * 60 * 60 * 24),
  );
  return diffDays > LATE_SUBMISSION_THRESHOLD_DAYS;
};

/**
 * Returns true when the reason for change requires the mitigating circumstances screen
 */
export const requiresMitigatingCircumstances = reasonForChange =>
  MITIGATING_REASON_CODES.includes(reasonForChange);

/**
 * Page depends helper: show last date of attendance
 */
export const showLastDateOfAttendance = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  return isTerminationOrWithdrawal(typeOfChange);
};

/**
 * Page depends helper: show updated enrollment details
 */
export const showUpdatedEnrollmentDetails = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  return isReductionOrPartialWithdrawal(typeOfChange);
};

/**
 * Page depends helper: show reason for change
 */
export const showReasonForChange = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  return typeOfChange !== 'correction';
};

/**
 * Page depends helper: show mitigating circumstances
 */
export const showMitigatingCircumstances = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  const reasonForChange =
    formData?.enrollmentChangeDetails?.reasonForChange ||
    formData?.reasonForChange;
  return (
    typeOfChange !== 'correction' &&
    requiresMitigatingCircumstances(reasonForChange)
  );
};

/**
 * Page depends helper: show correction details
 */
export const showCorrectionDetails = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  return typeOfChange === 'correction';
};

/**
 * Page depends helper: show timeliness acknowledgment
 */
export const showTimelinessAcknowledgment = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  const effectiveDateOfChange =
    formData?.enrollmentChangeDetails?.effectiveDateOfChange ||
    formData?.effectiveDateOfChange;
  return (
    typeOfChange !== 'correction' && isLateSubmission(effectiveDateOfChange)
  );
};

/**
 * Page depends helper: show supporting documentation
 */
export const showSupportingDocumentation = formData => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange ||
    formData?.typeOfChange;
  const mitigatingCircumstancesKnown =
    formData?.enrollmentChangeDetails?.mitigatingCircumstances
      ?.mitigatingCircumstancesKnown ||
    formData?.mitigatingCircumstancesKnown;

  // Always show for correction (required) or when mitigating circumstances = yes
  // Also available as optional for all change types (never fully hidden)
  return (
    typeOfChange === 'correction' || mitigatingCircumstancesKnown === 'yes' || true
  );
};