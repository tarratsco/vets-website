import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export default function ConfirmationPage({ route }) {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const veteranName = form?.data?.veteranInformation
    ? `${form.data.veteranInformation.firstName || ''} ${form.data.veteranInformation.lastName || ''}`.trim()
    : '';

  const alertContent = (
    <div>
      <p>
        We've received your application for a burial flag
        {veteranName ? ` for ${veteranName}` : ''}.
      </p>
      <p>
        We'll review your application and contact the National Cemetery
        Administration (NCA) Field Programs Evidence Intake Center. You'll
        receive a confirmation email if you provided an email address.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Your confirmation number is:</strong>{' '}
          <strong>{confirmationNumber}</strong>
        </p>
      )}
    </div>
  );

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
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="We'll review the information you submitted and verify the Veteran's eligibility for a burial flag."
        item1Actions={<p />}
        item2Header="We'll route your application to NCA Field Programs"
        item2Content="Your application will be sent to the NCA Field Programs Evidence Intake Center in Janesville, WI for processing."
      />
      <ConfirmationView.HowToContact />
      <ConfirmationView.GoBackLink />
      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
}

ConfirmationPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.object,
  }),
};