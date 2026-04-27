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

  const veteranFullName = form?.data?.veteranFullName || {};

  const submissionAlertContent = (
    <>
      <p>
        We have received your Application for Extended Care Services. Your local
        VA medical facility will review your submission and contact you with your
        estimated monthly copayment responsibility.
      </p>
      {confirmationNumber && (
        <p>
          Your confirmation number is{' '}
          <strong>{confirmationNumber}</strong>.
        </p>
      )}
    </>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={veteranFullName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Your application has been submitted"
        content={submissionAlertContent}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="VA facility reviews your submission"
        item1Content="Your local VA medical facility will receive your application and review your financial information."
        item2Header="Facility calculates your copayment"
        item2Content="Facility billing staff will calculate your estimated monthly copayment based on the information you provided."
        item3Header="You are notified of your copayment amount"
        item3Content="The facility will contact you with your estimated monthly copayment responsibility for extended care services."
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