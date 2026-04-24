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

  const submissionAlertContent = (
    <>
      <p>
        Thank you for submitting your VA clinical position application. We have
        received your credentialing application and it will be reviewed by the
        VA Medical Center credentialing office.
      </p>
      {formattedSubmitDate && (
        <p>
          <strong>Date submitted:</strong> {formattedSubmitDate}
        </p>
      )}
      {confirmationNumber && (
        <p>
          <strong>Confirmation number:</strong> {confirmationNumber}
        </p>
      )}
    </>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={applicantName}
      devOnly={{
        showButtons: true,
      }}
    >
      <ConfirmationView.SubmissionAlert
        title={`Your application has been submitted${
          formattedSubmitDate ? ` on ${formattedSubmitDate}` : ''
        }`}
        content={submissionAlertContent}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="The VA Medical Center credentialing office will review your submitted application and supporting documents. They may contact you if additional information is needed."
        item2Header="Primary source verification will be conducted"
        item2Content="VA will verify your professional licenses, board certifications, education, and employment history through primary source verification. The National Practitioner Data Bank (NPDB) will also be queried."
        item3Header="You'll receive a credentialing decision"
        item3Content="The VAMC credentialing committee will review your file and make a recommendation. You'll be notified of the outcome through the contact information you provided."
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