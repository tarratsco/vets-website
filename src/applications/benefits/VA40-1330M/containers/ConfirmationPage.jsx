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

  const applicantName = form?.data?.applicant?.name || {};

  const submissionAlertContent = (
    <p>
      Thank you for submitting your request for a government headstone or
      marker. We will review your request and contact you if we need additional
      information. Processing times vary; NCA will contact you with an update.
    </p>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={applicantName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your headstone or marker request has been submitted"
        content={submissionAlertContent}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your request"
        item1Content="NCA will review your request. If we need more information, we'll contact you using the contact information you provided."
        item2Header="Your headstone or marker will be fabricated and delivered"
        item2Content="After NCA approves your request, it will be sent to a fabrication contractor. Delivery to the cemetery typically takes additional weeks. NCA will notify the cemetery when delivery is expected."
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

export default ConfirmationPage;