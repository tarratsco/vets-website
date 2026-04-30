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

  const veteranFirstName = form?.data?.veteranInformation?.firstName || '';
  const veteranLastName = form?.data?.veteranInformation?.lastName || '';

  const alertContent = (
    <div>
      <p>
        Thank you for submitting your application for a United States burial
        flag.
      </p>
      <p>
        We've received your application and will process it according to VA
        burial flag issuance procedures. NCA Field Programs will review your
        application and contact you if additional information is needed.
      </p>
      {veteranFirstName && veteranLastName && (
        <p>
          <strong>Veteran:</strong> {veteranFirstName} {veteranLastName}
        </p>
      )}
      {confirmationNumber && (
        <p>
          <strong>Confirmation number:</strong> {confirmationNumber}
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
        item1Content="NCA Field Programs will review your application. If we need more information, we'll contact you."
        item1Actions={<p />}
        item2Header="We'll process the flag issuance"
        item2Content="Once approved, a burial flag will be issued through the appropriate channel."
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