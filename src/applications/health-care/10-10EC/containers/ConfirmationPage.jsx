import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const veteranName = data?.veteranFullName || {};

  const submissionAlertContent = (
    <div>
      <p>
        Thank you for submitting your application for extended care services.
        Your VA medical facility will review your submission and contact you
        with your estimated monthly copayment responsibility.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Your confirmation number is:</strong> {confirmationNumber}
        </p>
      )}
    </div>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={veteranName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your application has been submitted"
        content={submissionAlertContent}
        actions={<p />}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="Your facility receives your submission"
        item1Content="Your enrolled VA medical facility will receive your completed 10-10EC application."
        item1Actions={<p />}
        item2Header="Staff calculate your copayment"
        item2Content="VA billing staff will review your financial information and calculate your estimated monthly copayment amount."
        item2Actions={<p />}
        item3Header="You are contacted with your copayment amount"
        item3Content="Your VA medical facility will contact you with your estimated monthly copayment responsibility for extended care services."
      />
      <ConfirmationView.HowToContact />
      <ConfirmationView.GoBackLink />
      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
};

ConfirmationPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.object,
  }),
  form: PropTypes.shape({
    data: PropTypes.object,
    submission: PropTypes.shape({
      timestamp: PropTypes.string,
      response: PropTypes.shape({
        confirmationNumber: PropTypes.string,
      }),
    }),
  }),
};

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(ConfirmationPage);