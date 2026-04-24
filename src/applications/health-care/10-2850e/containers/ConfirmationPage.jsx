import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';
import { formatDateLong } from 'platform/utilities/date';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const formattedSubmitDate = submitDate ? formatDateLong(submitDate) : '';

  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const applicantName =
    form?.data?.personalInformation || {};

  const submitterName = applicantName
    ? {
        first: applicantName.firstName,
        middle: applicantName.middleName,
        last: applicantName.lastName,
      }
    : undefined;

  const alertContent = (
    <p>
      Thank you for submitting your application for a VA clinical position. We
      will review your credentialing application and contact you if we need
      additional information. The VA Medical Center Human Resources office will
      be in touch regarding next steps.
    </p>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={submitterName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title={`You've submitted your VA clinical position application${
          formattedSubmitDate ? ` on ${formattedSubmitDate}` : ''
        }`}
        content={alertContent}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="The VA Medical Center credentialing office will review your submitted application and verify your credentials through primary source verification."
        item2Header="We'll contact you about next steps"
        item2Content="If we need more information, we'll contact you at the email address or phone number you provided. Allow 4-6 weeks for the credentialing review process."
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