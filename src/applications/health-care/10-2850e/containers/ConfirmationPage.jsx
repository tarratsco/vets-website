import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';
import { formatDateLong } from 'platform/utilities/date';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const formattedDate = submitDate ? formatDateLong(submitDate) : '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const applicantName = data?.personalInformation
    ? {
        first: data.personalInformation.firstName || '',
        last: data.personalInformation.lastName || '',
      }
    : {};

  const alertContent = (
    <p>
      Thank you for submitting your VA clinical position application
      {formattedDate ? ` on ${formattedDate}` : ''}. The VA Medical Center
      credentialing office will review your application and contact you if
      additional information is needed.
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
        title="Your application has been submitted"
        content={alertContent}
        actions={<p />}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="The VA Medical Center credentialing office will review all submitted information and verify your credentials through primary source verification."
        item1Actions={<p />}
        item2Header="We'll contact you about next steps"
        item2Content="The credentialing office will contact you regarding your application status and any additional requirements."
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