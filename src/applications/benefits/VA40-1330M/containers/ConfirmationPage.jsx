import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

const alertContent = (
  <p>
    We have received your request for a government headstone or marker. The
    National Cemetery Administration (NCA) will review your request and contact
    you if additional information is needed. Please keep your confirmation
    number for your records.
  </p>
);

export const ConfirmationPage = props => {
  const form = useSelector(state => state.form || {});
  const { submission } = form;
  const submitDate = submission?.timestamp;
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const applicantName = form?.data?.applicant?.name || {};

  return (
    <ConfirmationView
      formConfig={props.route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={applicantName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your headstone or marker request has been submitted"
        content={alertContent}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="NCA will review your request"
        item1Content="The National Cemetery Administration will review your request and contact you if they need additional information."
        item1Actions={<p />}
        item2Header="Your headstone or marker will be fabricated and shipped"
        item2Content="After NCA approves your request, it will be sent to a fabrication contractor. Delivery to the cemetery will follow."
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
};

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(ConfirmationPage);