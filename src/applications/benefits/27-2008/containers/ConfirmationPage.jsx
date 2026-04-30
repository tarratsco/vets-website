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

  const submissionAlertContent = (
    <>
      <p>
        We've received your application for a burial flag for{' '}
        {veteranFirstName} {veteranLastName}. We'll review your application and
        contact you if we need additional information.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Your confirmation number is {confirmationNumber}.</strong>
        </p>
      )}
    </>
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
        content={submissionAlertContent}
        actions={<p />}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="VA reviews your application"
        item1Content="We'll review your application and the discharge documentation you provided. If we need more information, we'll contact you."
        item1Actions={<p />}
        item2Header="Flag is issued"
        item2Content="If the Veteran is eligible, the National Cemetery Administration (NCA) Field Programs office will coordinate issuance of the burial flag."
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