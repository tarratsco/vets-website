/**
 * Custom validation functions for VA Form 26-8923
 */

/**
 * Validates the lender certification date.
 * - Must not be more than 30 days in the past.
 * - Must not be more than 7 days in the future.
 */
export function validateLenderCertificationDate(errors, fieldData) {
  if (!fieldData) return;

  const enteredDate = new Date(`${fieldData}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const sevenDaysAhead = new Date(today);
  sevenDaysAhead.setDate(today.getDate() + 7);

  if (isNaN(enteredDate.getTime())) return;

  if (enteredDate < thirtyDaysAgo) {
    errors.addError(
      'Date cannot be more than 30 days in the past. If your worksheet date is correct, contact the VA Regional Loan Center.',
    );
  } else if (enteredDate > sevenDaysAhead) {
    errors.addError(
      'Date cannot be more than 7 days in the future.',
    );
  }
}