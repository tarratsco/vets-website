/**
 * SectionIIIPage — CustomPage for Section III (Lines 10–18)
 * All values are read-only computed from Sections I and II.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ComputedLineDisplay from './ComputedLineDisplay';
import { formatCurrency } from '../utils/irrrlCalculations';

function SectionIIIPage({ data, goBack, goForward }) {
  const sectionI = data?.sectionI || {};
  const sectionII = data?.sectionII || {};
  const sectionIII = data?.sectionIII || {};

  const sectionsComplete =
    sectionI.line1ExistingLoanBalance != null &&
    sectionII.line5DiscountPercent != null &&
    sectionII.line6OriginationFeePercent != null &&
    sectionII.line7FundingFeePercent != null &&
    sectionII.line8OtherClosingCosts != null;

  const isMissing = !sectionsComplete;

  const line18 = sectionIII.line18MaxLoanAmount;
  const roundingDiff = data?.roundingDifferential || 0;
  const showRoundingWarning = roundingDiff >= 50;

  return (
    <div className="vads-u-margin-y--2">
      <h1>Section III &mdash; Final computation</h1>

      <va-additional-info
        trigger="Why does this section recalculate values from Section II?"
        uswds
      >
        <p>
          Section III performs an iterative recalculation to determine the true
          maximum loan amount. This is necessary because the VA funding fee
          (Line 7) is calculated as a percentage of the loan amount &mdash; but
          when the funding fee is financed into the loan, it increases the loan
          amount, which in turn increases the funding fee. Lines 10&ndash;18
          resolve this circularity mathematically. The final figure on Line 18
          is the maximum amount that may be originated without disbursing cash
          to the Veteran. All arithmetic is computed automatically from your
          Section I and Section II entries.
        </p>
      </va-additional-info>

      {isMissing && (
        <va-alert status="error" visible uswds>
          <p className="vads-u-margin-y--0">
            Section III cannot be computed because required values in Section I
            or Section II are missing or invalid. Return to the previous
            sections to complete all required fields.
          </p>
        </va-alert>
      )}

      <div className="vads-u-margin-top--2">
        <ComputedLineDisplay
          lineLabel="Line 10: Total carried forward from Line 9"
          value={sectionIII.line10CarryForward || 0}
          isMissing={isMissing}
          ariaLabel={`Line 10, carried forward from Line 9: ${formatCurrency(sectionIII.line10CarryForward || 0)}`}
        />
        <ComputedLineDisplay
          lineLabel="Line 11: Discount percentage applied to Line 10 (computed)"
          value={sectionIII.line11DiscountOnLine10 || 0}
          isMissing={isMissing}
          ariaLabel={`Line 11, discount percentage applied to Line 10: ${formatCurrency(sectionIII.line11DiscountOnLine10 || 0)}`}
        />
        <ComputedLineDisplay
          lineLabel="Line 12: Subtotal (Line 10 plus Line 11)"
          value={sectionIII.line12Subtotal || 0}
          isMissing={isMissing}
          ariaLabel={`Line 12 subtotal: ${formatCurrency(sectionIII.line12Subtotal || 0)}`}
        />
        <ComputedLineDisplay
          lineLabel="Line 13: Subtract discount amount from Line 5"
          value={sectionIII.line13SubtractLine5 || 0}
          isMissing={isMissing}
          ariaLabel={`Line 13: Subtract discount amount from Line 5 \u2014 ${formatCurrency(sectionIII.line13SubtractLine5 || 0)} subtracted`}
        />
        <ComputedLineDisplay
          lineLabel="Line 14: Subtotal (Line 12 minus discount)"
          value={sectionIII.line14Subtotal || 0}
          isMissing={isMissing}
          ariaLabel={`Line 14 subtotal: ${formatCurrency(sectionIII.line14Subtotal || 0)}`}
        />
        <ComputedLineDisplay
          lineLabel="Line 15: Subtract VA funding fee amount from Line 7"
          value={sectionIII.line15SubtractLine7 || 0}
          isMissing={isMissing}
          ariaLabel={`Line 15: Subtract VA funding fee amount from Line 7 \u2014 ${formatCurrency(sectionIII.line15SubtractLine7 || 0)} subtracted`}
        />
        <ComputedLineDisplay
          lineLabel="Line 16: Subtotal (base for final funding fee calculation)"
          value={sectionIII.line16Subtotal || 0}
          isMissing={isMissing}
          ariaLabel={`Line 16 subtotal, base for final funding fee calculation: ${formatCurrency(sectionIII.line16Subtotal || 0)}`}
        />
        <ComputedLineDisplay
          lineLabel="Line 17: VA funding fee based on Line 16 (computed)"
          value={sectionIII.line17FinalFundingFee || 0}
          isMissing={isMissing}
          ariaLabel={`Line 17, final VA funding fee: ${formatCurrency(sectionIII.line17FinalFundingFee || 0)}`}
        />
      </div>

      {!isMissing && line18 != null && (
        <>
          <div
            className="vads-u-margin-top--3"
            role="region"
            aria-label="Line 18 Maximum Loan Amount \u2014 this is the computed result of this worksheet"
          >
            <va-summary-box uswds>
              <h3 slot="headline">Line 18: Maximum loan amount</h3>
              <p>
                <strong
                  aria-label={`Maximum loan amount: ${formatCurrency(line18)}. This amount must always be rounded down.`}
                >
                  {formatCurrency(line18)}
                </strong>
              </p>
              <p>
                Maximum loan amount may be rounded off, but MUST ALWAYS BE
                ROUNDED DOWN to avoid cash to the Veteran. Round-off amounts of
                less than $50 do not require recomputation.
              </p>
            </va-summary-box>
          </div>

          <va-alert status="warning" visible uswds>
            <p className="vads-u-margin-y--0">
              <strong>Important:</strong> The loan amount you originate must not
              exceed this maximum. Rounding must always be DOWN (never up). If
              rounding results in an adjustment of $50 or more, recompute from
              Line 1. A loan amount exceeding this maximum will result in cash
              being disbursed to the Veteran, which is prohibited for an IRRRL.
            </p>
          </va-alert>

          {showRoundingWarning && (
            <va-alert status="warning" visible uswds>
              <p className="vads-u-margin-y--0">
                The rounding adjustment on Line 18 is{' '}
                {formatCurrency(roundingDiff)}, which equals or exceeds $50.
                Per the form&apos;s rounding rule, amounts of $50 or more require
                recomputation. The system has automatically applied the correct
                round-down. Please verify Line 18 reflects the correct maximum
                loan amount before proceeding.
              </p>
            </va-alert>
          )}
        </>
      )}

      <div className="vads-u-margin-top--4 vads-u-display--flex vads-u-justify-content--space-between">
        <va-button secondary onClick={goBack} text="Back" uswds />
        <va-button
          onClick={() => goForward(data)}
          text="Continue"
          disabled={isMissing}
          uswds
        />
      </div>
    </div>
  );
}

SectionIIIPage.propTypes = {
  data: PropTypes.object,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
};

const mapStateToProps = state => ({
  data: state.form?.data,
});

export default connect(mapStateToProps)(SectionIIIPage);