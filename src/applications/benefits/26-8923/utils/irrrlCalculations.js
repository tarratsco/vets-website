/**
 * Computation engine for VA Form 26-8923 — IRRRL Worksheet
 * Computes all 18 lines from raw user inputs.
 * All monetary values are rounded to 2 decimal places at each step.
 * Line 18 is ALWAYS rounded DOWN (floor to nearest cent) per form note.
 *
 * This module is a pure utility with no side effects.
 */

/**
 * Rounds a value to 2 decimal places using a banker-safe method.
 * @param {number} value
 * @returns {number}
 */
function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Floors a value to the nearest cent (always rounds DOWN).
 * @param {number} value
 * @returns {number}
 */
function floorToCents(value) {
  return Math.floor(value * 100) / 100;
}

/**
 * Computes all 18 lines of VA Form 26-8923 from raw inputs.
 *
 * @param {Object} inputs
 * @param {number} inputs.line1ExistingLoanBalance
 * @param {number} inputs.line2CashPaymentFromVeteran
 * @param {number} inputs.line5DiscountPercent
 * @param {number} inputs.line6OriginationFeePercent
 * @param {number} inputs.line7FundingFeePercent
 * @param {number} inputs.line8OtherClosingCosts
 * @returns {Object} all computed line values plus roundingDifferential
 */
export function computeIRRRLWorksheet(inputs) {
  const {
    line1ExistingLoanBalance = 0,
    line2CashPaymentFromVeteran = 0,
    line5DiscountPercent = 0,
    line6OriginationFeePercent = 0,
    line7FundingFeePercent = 0.5,
    line8OtherClosingCosts = 0,
  } = inputs;

  // Section I
  const line3Total = round2(
    Math.max(0, line1ExistingLoanBalance - line2CashPaymentFromVeteran),
  );

  // Section II
  const line4CarryForward = line3Total;
  const line5DollarAmount = round2(
    line4CarryForward * (line5DiscountPercent / 100),
  );
  const line6DollarAmount = round2(
    line4CarryForward * (line6OriginationFeePercent / 100),
  );
  const line7DollarAmount = round2(
    line4CarryForward * (line7FundingFeePercent / 100),
  );
  const line9PreliminaryTotal = round2(
    line4CarryForward +
      line5DollarAmount +
      line6DollarAmount +
      line7DollarAmount +
      line8OtherClosingCosts,
  );

  // Section III
  const line10CarryForward = line9PreliminaryTotal;
  const line11DiscountOnLine10 = round2(
    line10CarryForward * (line5DiscountPercent / 100),
  );
  const line12Subtotal = round2(line10CarryForward + line11DiscountOnLine10);
  // line13 stores the discount dollar amount being subtracted (for display/PDF)
  const line13SubtractLine5 = line5DollarAmount;
  const line14Subtotal = round2(line12Subtotal - line5DollarAmount);
  // line15 stores the funding fee dollar amount being subtracted (for display/PDF)
  const line15SubtractLine7 = line7DollarAmount;
  const line16Subtotal = round2(line14Subtotal - line7DollarAmount);
  const line17FinalFundingFee = round2(
    line16Subtotal * (line7FundingFeePercent / 100),
  );
  const line18Raw = line16Subtotal + line17FinalFundingFee;

  // Always round DOWN — never round up. Math.floor to nearest cent.
  const line18MaxLoanAmount = floorToCents(line18Raw);

  // Rounding differential for the $50 recomputation warning
  const roundingDifferential = round2(line18Raw - line18MaxLoanAmount);

  return {
    line3Total,
    line4CarryForward,
    line5DollarAmount,
    line6DollarAmount,
    line7DollarAmount,
    line9PreliminaryTotal,
    line10CarryForward,
    line11DiscountOnLine10,
    line12Subtotal,
    line13SubtractLine5,
    line14Subtotal,
    line15SubtractLine7,
    line16Subtotal,
    line17FinalFundingFee,
    line18MaxLoanAmount,
    roundingDifferential,
  };
}

/**
 * Formats a number as US currency (e.g., $1,234.56)
 * @param {number|null|undefined} value
 * @returns {string}
 */
export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}