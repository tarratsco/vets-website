import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

const alertContent = (
  <p>
    Thank you for submitting your application for a United States burial flag.
    We will review your application and contact you if we need additional
    information. You will receive the burial flag through the funeral home or
    other appropriate authority.
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

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="You've submitted your burial flag application"
        content={alertContent}
        actions={<p />}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="We'll review your application and supporting documents. If we need more information, we'll contact you."
        item1Actions={<p />}
        item2Header="We'll process your burial flag request"
        item2Content="If your application is approved, we'll coordinate the issuance of a United States burial flag through NCA Field Programs."
      />
      <ConfirmationView.PrintThisPage />
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