import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const alertContent = (
    <>
      <p>
        We&apos;ve received your VA Form 10-7959E &mdash; Claim for
        Miscellaneous Expenses.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Your confirmation number is:</strong> {confirmationNumber}
        </p>
      )}
      <p>
        Please save or print this page for your records. OIVC will review your
        claim and contact you if additional information is needed.
      </p>
    </>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your claim has been submitted"
        content={alertContent}
        actions={<p />}
      />
      <ConfirmationView.WhatsNextProcessList
        item1Header="OIVC will review your claim"
        item1Content="OIVC will verify your eligibility and the information you provided."
        item2Header="OIVC may contact you"
        item2Content="If additional information is needed, OIVC will contact you at the phone number or address you provided."
        item3Header="Reimbursement decision"
        item3Content="If your claim is approved, reimbursement will be made payable to the beneficiary (the patient)."
      />
      <div className="vads-u-margin-top--4">
        <h2 className="vads-u-font-size--h3">Contact OIVC</h2>
        <p>
          VHA Office of Integrated Veteran Care
          <br />
          P.O. Box 400, Spring City, PA 19475
          <br />
          Phone: 1-833-930-0816
          <br />
          Fax: 1-303-331-7807
        </p>
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.GoBackLink />
      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
};

ConfirmationPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.object,
  }),
};

export default ConfirmationPage;