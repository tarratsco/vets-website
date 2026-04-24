import { MITIGATING_REASON_CODES } from '../constants';

export const isLateSubmission = effectiveDateOfChange => {
  if (!effectiveDateOfChange) return false;
  const effective = new Date(effectiveDateOfChange);
  if (Number.isNaN(effective.getTime())) return false;
  const today = new Date();
  const diffDays = Math.floor((today - effective) / (1000 * 60 * 60 * 24));
  return diffDays > 30;
};

export const isTerminationOrWithdrawal = typeOfChange =>
  typeOfChange === 'full_termination' || typeOfChange === 'partial_withdrawal';

export const isReductionOrPartialWithdrawal = typeOfChange =>
  typeOfChange === 'credit_hour_reduction' ||
  typeOfChange === 'partial_withdrawal';

export const requiresMitigatingCircumstances = (formData = {}) => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange;
  const reasonForChange =
    formData?.enrollmentChangeDetails?.reasonForChange;
  return (
    typeOfChange !== 'correction' &&
    MITIGATING_REASON_CODES.includes(reasonForChange)
  );
};

export const requiresLateSubmissionExplanation = (formData = {}) => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange;
  const effectiveDate =
    formData?.enrollmentChangeDetails?.effectiveDateOfChange;
  return typeOfChange !== 'correction' && isLateSubmission(effectiveDate);
};

export const requiresSupportingDocumentation = (formData = {}) => {
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange;
  const mitigatingKnown =
    formData?.enrollmentChangeDetails?.mitigatingCircumstances
      ?.mitigatingCircumstancesKnown;
  return typeOfChange === 'correction' || mitigatingKnown === 'yes';
};