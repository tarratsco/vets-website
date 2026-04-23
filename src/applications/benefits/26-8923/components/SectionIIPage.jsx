/**
 * SectionIIPage — CustomPage for Section II (Lines 4–9)
 * Handles real-time computation of all Section II computed lines.
 */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setData } from 'platform/forms-system/src/js/actions';
import { focusElement } from 'platform/utilities/ui';
import ComputedLineDisplay from './ComputedLineDisplay';
import { computeIRRRLWorksheet, formatCurrency } from '../utils/irrrlCalculations';

function SectionIIPage({ data, setFormData, goBack, goForward }) {
  const sectionI = data?.sectionI || {};
  const sectionII = data?.sectionII || {};

  const line3Total = sectionI.line3Total || 0;
  const line4CarryForward = line3Total;

  const [line5Pct, setLine5Pct] = useState(
    sectionII.line5DiscountPercent != null
      ? String(sectionII.line5DiscountPercent)
      : '0',
  );
  const [line6Pct, setLine6Pct] = useState(
    sectionII.line6OriginationFeePercent != null
      ? String(sectionII.line6OriginationFeePercent)
      : '0',
  );
  const [line7Pct, setLine7Pct] = useState(
    sectionII.line7FundingFeePercent != null
      ? String(sectionII.line7FundingFeePercent)
      : '0.5',
  );
  const [line8, setLine8] = useState(
    sectionII.line8OtherClosingCosts != null
      ? String(sectionII.line8OtherClosingCosts)
      : '0',
  );

  const [line5Error, setLine5Error] = useState('');
  const [line6Error, setLine6Error] = useState('');
  const [line7Error, setLine7Error] = useState('');
  const [line8Error, setLine8Error] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const line5Val = parseFloat(line5Pct) || 0;
  const line6Val = parseFloat(line6Pct) || 0;
  const line7Val = parseFloat(line7Pct);
  const line7ValNum = isNaN(line7Val) ? 0.5 : line7Val;
  const line8Val = parseFloat(line8) || 0;

  const computed = computeIRRRLWorksheet({
    line1ExistingLoanBalance: sectionI.line1ExistingLoanBalance || 0,
    line2CashPaymentFromVeteran: sectionI.line2CashPaymentFromVeteran || 0,
    line5DiscountPercent: line5Val,
    line6OriginationFeePercent: Math.min(line6Val, 1.0),
    line7FundingFeePercent: Math.min(line7ValNum, 0.5),
    line8OtherClosingCosts: line8Val,
  });

  const line6Blocked = line6Val > 1.0;
  const line7Blocked = line7ValNum > 0.5;
  const line5Warning = line5Val > 2.0;
  const line7Exempt = line7ValNum === 0;

  // Sync to Redux on any input change
  useEffect(() => {
    if (!line6Blocked && !line7Blocked) {
      setFormData({
        ...data,
        sectionII: {
          ...sectionII,
          line4CarryForward: computed.line4CarryForward,
          line5DiscountPercent: line5Val,
          line5DollarAmount: computed.line5DollarAmount,
          line6OriginationFeePercent: line6Val,
          line6DollarAmount: computed.line6DollarAmount,
          line7FundingFeePercent: line7ValNum,
          line7DollarAmount: computed.line7DollarAmount,
          line8OtherClosingCosts: line8Val,
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
  }, [line5Val, line6Val, line7ValNum, line8Val]); // eslint-disable-line react-hooks/exhaustive-deps

  const validateLine5 = useCallback(value => {
    const num = parseFloat(value);
    if (value === '' || isNaN(num) || num < 0) {
      return 'Enter a percentage for discount points. Enter 0 if no discount points apply.';
    }
    return '';
  }, []);

  const validateLine6 = useCallback(value => {
    const num = parseFloat(value);
    if (value === '' || isNaN(num) || num < 0) {
      return 'Enter a percentage for the origination fee. Enter 0 if no origination fee applies.';
    }
    return '';
  }, []);

  const validateLine7 = useCallback(value => {
    const num = parseFloat(value);
    if (value === '' || isNaN(num) || num < 0) {
      return 'Enter a percentage for the VA funding fee.';
    }
    return '';
  }, []);

  const validateLine8 = useCallback(value => {
    const num = parseFloat(value);
    if (value === '' || isNaN(num) || num < 0) {
      return 'Enter a dollar amount for other allowable closing costs and prepaids. Enter 0 if there are none.';
    }
    return '';
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
    const e5 = validateLine5(line5Pct);
    const e6 = validateLine6(line6Pct);
    const e7 = validateLine7(line7Pct);
    const e8 = validateLine8(line8);
    setLine5Error(e5);
    setLine6Error(e6);
    setLine7Error(e7);
    setLine8Error(e8);

    if (e5 || e6 || e7 || e8 || line6Blocked || line7Blocked) {
      focusElement('[error], .irrrl-section-ii-error');
      return;
    }
    goForward(data);
  };

  const maxOriginationFeeAllowable = formatCurrency(line4CarryForward * 0.01);

  return (
    <div className="vads-u-margin-y--2">
      <h1>Section II &mdash; Preliminary loan amount</h1>

      {/* Line 4 — Carry Forward */}
      <div className="vads-u-margin-bottom--3">
        <ComputedLineDisplay
          lineLabel="Line 4: Total carried forward from Line 3"
          value={line4CarryForward}
          ariaLabel={`Line 4, carried forward from Line 3: ${formatCurrency(line4CarryForward)}`}
          isMissing={!sectionI.line1ExistingLoanBalance}
        />
      </div>

      {/* Line 5 — Discount Points */}
      <div className="vads-u-margin-bottom--2">
        <va-number-input
          label="Line 5: Discount points \u2014 percentage"
          hint="Enter the discount points as a percentage of Line 4. For example, enter 1.5 for 1.5%. Discount points generally may not exceed 2 points without special justification per 38 CFR \u00a7 36.4313."
          name="line5DiscountPercent"
          id="line5DiscountPercent"
          inputmode="decimal"
          min="0"
          max="99.999"
          value={line5Pct}
          required
          error={submitted && line5Error ? line5Error : undefined}
          onInput={e => {
            setLine5Pct(e.target.value);
            if (submitted) setLine5Error(validateLine5(e.target.value));
          }}
          onBlur={e => setLine5Error(validateLine5(e.target.value))}
          uswds
        />
        {line5Warning && (
          <va-alert status="warning" visible uswds slim>
            <p className="vads-u-margin-y--0">
              Discount points above 2% may require special justification per 38
              CFR &sect; 36.4313. Verify this amount complies with VA
              Lender&apos;s Handbook Chapter 8 guidance before proceeding.
            </p>
          </va-alert>
        )}
        <ComputedLineDisplay
          lineLabel="Line 5: Discount amount (computed)"
          value={computed.line5DollarAmount}
          ariaLabel={`Line 5 discount amount, computed: ${formatCurrency(computed.line5DollarAmount)}`}
        />
      </div>

      {/* Line 6 — Origination Fee */}
      <div className="vads-u-margin-bottom--2">
        <va-number-input
          label="Line 6: Origination fee \u2014 percentage"
          hint="Enter the origination fee as a percentage of Line 4. Per 38 CFR \u00a7 36.4313, the origination fee for an IRRRL may not exceed 1% of the loan amount."
          name="line6OriginationFeePercent"
          id="line6OriginationFeePercent"
          inputmode="decimal"
          min="0"
          value={line6Pct}
          required
          error={submitted && line6Error ? line6Error : undefined}
          onInput={e => {
            setLine6Pct(e.target.value);
            if (submitted) setLine6Error(validateLine6(e.target.value));
          }}
          onBlur={e => setLine6Error(validateLine6(e.target.value))}
          uswds
        />
        {line6Blocked && (
          <va-alert status="error" visible uswds className="irrrl-section-ii-error">
            <p className="vads-u-margin-y--0">
              The origination fee cannot exceed 1% of the loan amount per 38
              CFR &sect; 36.4313. The maximum allowable origination fee for
              this loan is {maxOriginationFeeAllowable}. Reduce the origination
              fee percentage before proceeding.
            </p>
          </va-alert>
        )}
        {!line6Blocked && (
          <ComputedLineDisplay
            lineLabel="Line 6: Origination fee amount (computed)"
            value={computed.line6DollarAmount}
            ariaLabel={`Line 6 origination fee amount, computed: ${formatCurrency(computed.line6DollarAmount)}`}
          />
        )}
      </div>

      {/* Line 7 — VA Funding Fee */}
      <div className="vads-u-margin-bottom--2">
        <va-number-input
          label="Line 7: VA funding fee \u2014 percentage"
          hint="The VA funding fee for an IRRRL is 0.5% per 38 CFR \u00a7 36.4312. This field is pre-filled with 0.5. Enter 0 only if the Veteran is exempt from the funding fee."
          name="line7FundingFeePercent"
          id="line7FundingFeePercent"
          inputmode="decimal"
          min="0"
          max="0.5"
          value={line7Pct}
          required
          error={submitted && line7Error ? line7Error : undefined}
          onInput={e => {
            setLine7Pct(e.target.value);
            if (submitted) setLine7Error(validateLine7(e.target.value));
          }}
          onBlur={e => setLine7Error(validateLine7(e.target.value))}
          uswds
        />
        {line7Blocked && (
          <va-alert status="error" visible uswds className="irrrl-section-ii-error">
            <p className="vads-u-margin-y--0">
              The VA funding fee for an IRRRL is 0.5% per 38 CFR &sect;
              36.4312. The funding fee percentage cannot exceed 0.5%. If you
              believe a different rate applies, contact the VA Regional Loan
              Center.
            </p>
          </va-alert>
        )}
        {line7Exempt && !line7Blocked && (
          <va-additional-info
            trigger="Funding fee exemption notice"
            uswds
          >
            <p>
              You have entered 0% for the VA funding fee. This is appropriate
              only if the Veteran is exempt from the VA funding fee &mdash; for
              example, because the Veteran has a service-connected disability
              rated at 10% or more, or the Veteran&apos;s surviving spouse is
              receiving Dependency and Indemnity Compensation (DIC). You must
              verify and document the Veteran&apos;s exemption status in the
              closing package. VA may independently verify exemption status.
            </p>
          </va-additional-info>
        )}
        <ComputedLineDisplay
          lineLabel="Line 7: VA funding fee amount (computed)"
          value={computed.line7DollarAmount}
          ariaLabel={`Line 7 VA funding fee amount, computed: ${formatCurrency(computed.line7DollarAmount)}`}
        />
      </div>

      {/* Line 8 — Other Closing Costs */}
      <div className="vads-u-margin-bottom--2">
        <va-number-input
          label="Line 8: Other allowable closing costs and prepaids"
          hint="Enter the total of all other allowable closing costs and prepaids not captured in Lines 5\u20137. Do not include costs not permitted by VA."
          name="line8OtherClosingCosts"
          id="line8OtherClosingCosts"
          inputmode="decimal"
          currency
          min="0"
          value={line8}
          required
          error={submitted && line8Error ? line8Error : undefined}
          onInput={e => {
            setLine8(e.target.value);
            if (submitted) setLine8Error(validateLine8(e.target.value));
          }}
          onBlur={e => setLine8Error(validateLine8(e.target.value))}
          uswds
        />
        <va-additional-info
          trigger="What closing costs are allowable for an IRRRL?"
          uswds
        >
          <p>
            Allowable closing costs for an IRRRL include (but may not be
            limited to): VA appraisal fee (if obtained), credit report fee,
            title search and title insurance, recording fees, transfer taxes,
            survey fee, hazard insurance premiums, and prepaid items such as
            property taxes and homeowners insurance. Non-allowable costs cannot
            be financed. See VA Pamphlet 26-7, Chapter 8.
          </p>
        </va-additional-info>
      </div>

      {/* Line 9 — Preliminary Total */}
      <div className="vads-u-margin-top--3 vads-u-border-top--1px vads-u-border-color--gray-light vads-u-padding-top--2">
        <ComputedLineDisplay
          lineLabel="Line 9: Preliminary total (total of Lines 4 through 8)"
          value={!line6Blocked && !line7Blocked ? computed.line9PreliminaryTotal : 0}
          isTotal
          ariaLabel={`Line 9 preliminary total, calculated automatically: ${formatCurrency(!line6Blocked && !line7Blocked ? computed.line9PreliminaryTotal : 0)}`}
        />
      </div>

      <div className="vads-u-margin-top--4 vads-u-display--flex vads-u-justify-content--space-between">
        <va-button secondary onClick={goBack} text="Back" uswds />
        <va-button
          onClick={handleSubmit}
          text="Continue"
          disabled={line6Blocked || line7Blocked}
          uswds
        />
      </div>
    </div>
  );
}

SectionIIPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionIIPage);