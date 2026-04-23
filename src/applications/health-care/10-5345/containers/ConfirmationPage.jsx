import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

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

  const veteranData = form?.data?.veteran || {};
  const veteranName = {
    first: veteranData.firstName || '',
    last: veteranData.lastName || '',
  };

  const submissionAlertContent = (
    <>
      <p>
        Thank you for submitting your authorization to release medical records.
      </p>
      <p>
        We've sent your authorization to the Release of Information (ROI) office
        at the VA Medical Center(s) you identified. Processing time is typically
        20–30 business days. If you marked your request as urgent, it may be
        processed sooner.
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
      submitterName={veteranName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title={`You've submitted your medical records authorization${
          formattedSubmitDate ? ` on ${formattedSubmitDate}` : ''
        }`}
        content={submissionAlertContent}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll route your authorization to the ROI office"
        item1Content="Your authorization will be sent to the Release of Information office at the VA Medical Center(s) you identified."
        item2Header="The ROI office will process your request"
        item2Content="Processing time is typically 20–30 business days. The ROI office may contact you if additional information is needed."
        item3Header="Records will be released to your designated recipient"
        item3Content="Once processed, records will be released per your authorization instructions."
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

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(ConfirmationPage);