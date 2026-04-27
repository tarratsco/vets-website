import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

const alertContent = (
  <p>
    Thank you for submitting your request for a government headstone or marker.
    The National Cemetery Administration (NCA) will review your request and
    contact you if they need additional information. Processing times vary.
    Please allow adequate time for NCA to process your request before following
    up.
  </p>
);

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const decedentName = form?.data?.decedent?.name || {};
  const submitterName = form?.data?.applicant?.name || {};

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={submitterName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your headstone or marker request has been submitted"
        content={alertContent}
        actions={<p />}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="NCA will review your request"
        item1Content="NCA will review your submitted information and supporting documents. They will contact you if they need additional information."
        item1Actions={<p />}
        item2Header="Your headstone or marker will be fabricated and delivered"
        item2Content="After NCA approves your request, it will be sent to a fabrication contractor. Delivery to the cemetery typically takes additional time after approval."
      />
      <ConfirmationView.HowToContact />
      <ConfirmationView.GoBackLink />
      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
};

ConfirmationPage.propTypes = {
  form: PropTypes.shape({
    data: PropTypes.object,
    formId: PropTypes.string,
    submission: PropTypes.shape({
      response: PropTypes.shape({
        confirmationNumber: PropTypes.string,
      }),
      timestamp: PropTypes.string,
    }),
  }),
  route: PropTypes.shape({
    formConfig: PropTypes.object,
  }),
};

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(ConfirmationPage);