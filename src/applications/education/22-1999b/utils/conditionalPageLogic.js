import { MITIGATING_REASON_CODES, LATE_SUBMISSION_THRESHOLD_DAYS } from '../constants';

export const isTerminationOrWithdrawal = typeOfChange =>
  typeOfChange === 'full_termination' || typeOfChange === 'partial_withdrawal';

export const isReductionOrPartialWithdrawal = typeOfChange =>
  typeOfChange === 'credit_hour_reduction' ||
  typeOfChange === 'partial_withdrawal';

export const isLateSubmission = effectiveDateOfChange => {
  if (!effectiveDateOfChange) return false;
  const effective = new Date(`${effectiveDateOfChange}T00:00:00`);
  if (Number.isNaN(effective.getTime())) return false;
  const today = new Date();
  const diffDays = Math.floor(
    (today - effective) / (1000 * 60 * 60 * 24),
  );
  return diffDays > LATE_SUBMISSION_THRESHOLD_DAYS;
};

export const showMitigatingCircumstances = formData =>
  formData.typeOfChange !== 'correction' &&
  MITIGATING_REASON_CODES.includes(formData.reasonForChange);

export const showLastDateOfAttendance = formData =>
  isTerminationOrWithdrawal(formData.typeOfChange);

export const showUpdatedEnrollmentDetails = formData =>
  isReductionOrPartialWithdrawal(formData.typeOfChange);

export const showReasonForChange = formData =>
  formData.typeOfChange !== 'correction';

export const showCorrectionDetails = formData =>
  formData.typeOfChange === 'correction';

export const showTimelinessAcknowledgment = formData =>
  formData.typeOfChange !== 'correction' &&
  isLateSubmission(formData.effectiveDateOfChange);

export const showSupportingDocumentation = formData =>
  formData.typeOfChange === 'correction' ||
  formData.mitigatingCircumstancesKnown === 'yes';