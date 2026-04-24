import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp;
  const confirmationNumber = submission?.response?.confirmationNumber || '';

  const studentName = {
    first:
      data?.studentAndPriorCertification?.studentFirstName || '',
    last:
      data?.studentAndPriorCertification?.studentLastName || '',
  };

  const submissionAlertContent = (
    <p>
      Thank you for submitting your enrollment change certification. We will
      review your submission and make any necessary adjustments to your
      student's benefits. If we need more information, we will contact you at
      the email address you provided.
    </p>
  );

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={studentName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="You've submitted your enrollment change certification"
        content={submissionAlertContent}
        actions={<p />}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your enrollment change"
        item1Content="We'll review the change you reported and update the student's benefit payments accordingly."
        item1Actions={<p />}
        item2Header="We'll notify the student"
        item2Content="If there's an overpayment or adjustment to their benefits, we'll contact the student directly."
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