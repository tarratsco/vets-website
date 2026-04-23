import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';
import { formatDateLong } from 'platform/utilities/date';

export default function ConfirmationPage({ route }) {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const formattedDate = submitDate ? formatDateLong(submitDate) : '';

  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const line18MaxLoanAmount =
    submission?.response?.line18MaxLoanAmount ||
    form?.data?.line18MaxLoanAmount ||
    null;

  const nameOfLender = form?.data?.loanIdentification?.nameOfLender || '';
  const vaLoanNumber = form?.data?.loanIdentification?.vaLoanNumber || '';
  const pdfUrl = submission?.response?.pdfUrl || '';

  const formatCurrency = value => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const alertContent = (
    <>
      <p>
        Your VA Form 26-8923 worksheet has been generated
        {formattedDate ? ` on ${formattedDate}` : ''}.
      </p>
      <ul>
        {confirmationNumber && (
          <li>
            <strong>Confirmation number:</strong> {confirmationNumber}
          </li>
        )}
        {nameOfLender && (
          <li>
            <strong>Lender:</strong> {nameOfLender}
          </li>
        )}
        {vaLoanNumber && (
          <li>
            <strong>VA Loan Number:</strong> {vaLoanNumber}
          </li>
        )}
        {line18MaxLoanAmount !== null && (
          <li>
            <strong>Line 18 Maximum Loan Amount:</strong>{' '}
            {formatCurrency(line18MaxLoanAmount)}
          </li>
        )}
      </ul>
    </>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      devOnly={{
        showButtons: true,
      }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your VA Form 26-8923 worksheet has been generated"
        content={alertContent}
        actions={<p />}
      />

      {line18MaxLoanAmount !== null && (
        <va-summary-box uswds>
          <h3 slot="headline">Line 18: Maximum Loan Amount</h3>
          <p>
            <strong>{formatCurrency(line18MaxLoanAmount)}</strong>
          </p>
          {confirmationNumber && (
            <p>Confirmation Number: {confirmationNumber}</p>
          )}
          {formattedDate && <p>Date Generated: {formattedDate}</p>}
        </va-summary-box>
      )}

      {pdfUrl && (
        <p className="vads-u-margin-top--2">
          <a
            href={pdfUrl}
            aria-label="Download completed VA Form 26-8923, November 2024 version (PDF)"
          >
            Download completed VA Form 26-8923 (PDF)
          </a>
        </p>
      )}

      <h2>Next steps</h2>
      <va-process-list uswds>
        <va-process-list-item header="Print the downloaded PDF">
          Print the completed VA Form 26-8923 from the download link above.
        </va-process-list-item>
        <va-process-list-item header="Have an officer sign in ink">
          Have an authorized officer of your lending institution sign in ink in
          the signature block on the printed form.
        </va-process-list-item>
        <va-process-list-item header="Include in your IRRRL closing package">
          Include the signed worksheet in your IRRRL closing package submitted
          through WebLGY or your VA Regional Loan Center.
        </va-process-list-item>
        <va-process-list-item header="Retain a copy for your records">
          Keep a copy of the signed worksheet for your institution&apos;s records.
        </va-process-list-item>
      </va-process-list>

      <va-additional-info
        trigger="What if I need to change a value after generating the PDF?"
        uswds
      >
        <p>
          If any input values change before closing (for example, the existing
          loan balance from a new payoff statement), you must return to the
          worksheet, update the values, and generate a new PDF. Do not alter a
          generated PDF manually.
        </p>
        <p>
          <a href="/housing-assistance/home-loans/irrrl-worksheet">
            Start a new worksheet
          </a>
        </p>
      </va-additional-info>

      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
}

ConfirmationPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.object,
  }),
};