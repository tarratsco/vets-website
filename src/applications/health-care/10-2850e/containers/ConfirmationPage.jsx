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
    <p>
      Thank you for submitting your application for a VA clinical position. We
      will route your application to the VA Medical Center you selected.
      {formattedSubmitDate
        ? ` Your application was submitted on ${formattedSubmitDate}.`
        : ''}
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
        content={submissionAlertContent}
        actions={<p />}
      />

      <div
        data-dd-privacy="mask"
        data-dd-action-name="confirmation summary"
      >
        <ConfirmationView.ChapterSectionCollection />
      </div>

      <ConfirmationView.PrintThisPage />

      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll route your application to the VA facility"
        item1Content="Your application will be sent to the credentialing office at the VA Medical Center you selected. They will contact you regarding next steps in the credentialing and privileging process."
        item1Actions={<p />}
        item2Header="Primary source verification will begin"
        item2Content="The VA credentialing office will verify your licenses, certifications, education, and employment history through primary source verification (PSV) as required by VHA Handbook 1100.19."
        item2Actions={<p />}
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