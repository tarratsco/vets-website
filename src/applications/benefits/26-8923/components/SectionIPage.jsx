/**
 * SectionIPage — CustomPage for Section I (Lines 1–3)
 * Handles real-time computation of Line 3 = Line 1 - Line 2.
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setData } from 'platform/forms-system/src/js/actions';
import { focusElement } from 'platform/utilities/ui';
import ComputedLineDisplay from './ComputedLineDisplay';
import { computeIRRRLWorksheet, formatCurrency } from '../utils/irrrlCalculations';

function SectionIPage({ data, setFormData, goBack, goForward }) {
  const sectionI = data?.sectionI || {};

  const [line1, setLine1] = useState(
    sectionI.line1ExistingLoanBalance != null
      ? String(sectionI.line1ExistingLoanBalance)
      : '',
  );
  const [line2, setLine2] = useState(
    sectionI.line2CashPaymentFromVeteran != null
      ? String(sectionI.line2CashPaymentFromVeteran)
      : '0',
  );
  const [line1Error, setLine1Error] = useState('');
  const [line2Error, setLine2Error] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const line1Val = parseFloat(line1) || 0;
  const line2Val = parseFloat(line2) || 0;
  const line3Val = Math.max(0, line1Val - line2Val);
  const line2ExceedsLine1 = line2Val > line1Val && line1Val > 0;

  // Sync computed values to Redux
  useEffect(() => {
    if (line1Val > 0) {
      const computed = computeIRRRLWorksheet({
        line1ExistingLoanBalance: line1Val,
        line2CashPaymentFromVeteran: line2Val,
        line5DiscountPercent: data?.sectionII?.line5DiscountPercent || 0,
        line6OriginationFeePercent: data?.sectionII?.line6OriginationFeePercent || 0,
        line7FundingFeePercent: data?.sectionII?.line7FundingFeePercent != null
          ? data.sectionII.line7FundingFeePercent
          : 0.5,
        line8OtherClosingCosts: data?.sectionII?.line8OtherClosingCosts || 0,
      });

      setFormData({
        ...data,
        sectionI: {
          ...sectionI,
          line1ExistingLoanBalance: line1Val,
          line2CashPaymentFromVeteran: line2Val,
          line3Total: computed.line3Total,
        },
        sectionII: {
          ...data?.sectionII,
          line4CarryForward: computed.line4CarryForward,
          line5DollarAmount: computed.line5DollarAmount,
          line6DollarAmount: computed.line6DollarAmount,
          line7DollarAmount: computed.line7DollarAmount,
          line9PreliminaryTotal: computed.line9PreliminaryTotal,
        },
        sectionIII: {
          ...data?.sectionIII,
          line10CarryForward: computed.line10CarryForward,
          line11DiscountOnLine10: computed.line11DiscountOnLine10,
          line12Subtotal: computed.line12Subtotal,
          line13SubtractLine5: computed.line13SubtractLine5,
          line14Subtotal: computed.line14Subtotal,
          line15SubtractLine7: computed.line15SubtractLine7,
          line16Subtotal: computed.line16Subtotal,
          line17FinalFundingFee: computed.line17FinalFundingFee,
          line18MaxLoanAmount: computed.line18MaxLoanAmount,
        },
      });
    }
  }, [line1Val, line2Val]); // eslint-disable-line react-hooks/exhaustive-deps

  const validateLine1 = useCallback(
    value => {
      const num = parseFloat(value);
      if (!value || isNaN(num) || num <= 0) {
        return 'Line 1 is required. Enter the existing VA loan balance in dollars and cents.';
      }
      if (num > 9999999.99) {
        return 'Enter an amount no greater than $9,999,999.99.';
      }
      return '';
    },
    [],
  );

  const validateLine2 = useCallback(
    (value, l1) => {
      const num = parseFloat(value);
      if (value === '' || isNaN(num) || num < 0) {
        return 'Enter a dollar amount for Line 2. Enter 0 if no cash payment is being made.';
      }
      const l1Num = parseFloat(l1) || 0;
      if (num > l1Num && l1Num > 0) {
        return `The cash payment from the Veteran (Line 2) cannot exceed the existing VA loan balance (Line 1: ${formatCurrency(l1Num)}).`;
      }
      return '';
    },
    [],
  );

  const handleSubmit = () => {
    setSubmitted(true);
    const err1 = validateLine1(line1);
    const err2 = validateLine2(line2, line1);
    setLine1Error(err1);
    setLine2Error(err2);
    if (err1 || err2) {
      focusElement('.usa-input-error, [error]');
      return;
    }
    goForward(data);
  };

  return (
    <div className="vads-u-margin-y--2">
      <h1>Section I &mdash; Initial computation</h1>

      <va-additional-info
        trigger="What costs can be added to the existing loan balance?"
        uswds
      >
        <p>
          You may add the cost of energy efficient improvements being financed
          into the new loan. This amount is combined with the existing loan
          balance on Line 1. Do not add other closing costs here; those are
          entered on Line 8.
        </p>
      </va-additional-info>

      <div className="vads-u-margin-top--2">
        <va-number-input
          label="Line 1: Existing VA loan balance (plus cost of energy efficient improvements)"
          hint="Enter the outstanding balance of the existing VA-guaranteed loan being refinanced, from the servicer payoff statement. If energy efficient improvements are being financed into the new loan, add those costs to this amount."
          name="line1ExistingLoanBalance"
          id="line1ExistingLoanBalance"
          inputmode="decimal"
          currency
          min="0.01"
          max="9999999.99"
          value={line1}
          required
          error={submitted && line1Error ? line1Error : undefined}
          onInput={e => {
            setLine1(e.target.value);
            if (submitted) {
              setLine1Error(validateLine1(e.target.value));
            }
          }}
          onBlur={e => {
            const err = validateLine1(e.target.value);
            setLine1Error(err);
          }}
          uswds
        />
      </div>

      <div className="vads-u-margin-top--2">
        <va-number-input
          label="Line 2: Cash payment from Veteran (amount to subtract)"
          hint="If the Veteran is making a cash payment toward the loan, enter that amount here. Enter 0 if no cash payment is being made."
          name="line2CashPaymentFromVeteran"
          id="line2CashPaymentFromVeteran"
          inputmode="decimal"
          currency
          min="0"
          value={line2}
          required
          error={submitted && line2Error ? line2Error : (line2ExceedsLine1 ? `Cash payment cannot exceed the existing loan balance on Line 1 (${formatCurrency(line1Val)}).` : undefined)}
          onInput={e => {
            setLine2(e.target.value);
            if (submitted) {
              setLine2Error(validateLine2(e.target.value, line1));
            }
          }}
          onBlur={e => {
            const err = validateLine2(e.target.value, line1);
            setLine2Error(err);
          }}
          uswds
        />
      </div>

      <div className="vads-u-margin-top--3 vads-u-border-top--1px vads-u-border-color--gray-light vads-u-padding-top--2">
        <ComputedLineDisplay
          lineLabel="Line 3: Total (Line 1 minus Line 2)"
          value={line2ExceedsLine1 ? 0 : line3Val}
          isTotal
          ariaLabel={`Line 3 total, calculated automatically: ${formatCurrency(line2ExceedsLine1 ? 0 : line3Val)}`}
        />
        {line2ExceedsLine1 && (
          <p className="vads-u-color--secondary vads-u-margin-top--1">
            Line 3 cannot be negative. Reduce Line 2 to an amount equal to or
            less than Line 1.
          </p>
        )}
      </div>

      <div className="vads-u-margin-top--4 vads-u-display--flex vads-u-justify-content--space-between">
        <va-button secondary onClick={goBack} text="Back" uswds />
        <va-button
          onClick={handleSubmit}
          text="Continue"
          disabled={line2ExceedsLine1}
          uswds
        />
      </div>
    </div>
  );
}

SectionIPage.propTypes = {
  data: PropTypes.object,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  setFormData: PropTypes.func,
};

const mapStateToProps = state => ({
  data: state.form?.data,
});

const mapDispatchToProps = {
  setFormData: setData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionIPage);