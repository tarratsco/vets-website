import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission } = form;
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const applicantName = form?.data?.applicant?.name || {};

  const alertContent = (
    <p>
      Thank you for submitting your request for a government headstone or
      marker. We will review your request and contact you if we need additional
      information. NCA will process your request and notify you when it has been
      approved.
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
        content={alertContent}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="NCA will review your request"
        item1Content="The National Cemetery Administration will review your request. If they need more information, they will contact you using the information you provided."
        item2Header="Your headstone or marker will be fabricated"
        item2Content="After NCA approves your request, it will be sent to a fabrication contractor. Delivery to the cemetery typically takes several weeks after approval."
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