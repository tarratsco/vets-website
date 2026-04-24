import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = props => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp;
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const studentName = {
    first: data?.studentFirstName || '',
    last: data?.studentLastName || '',
  };

  const alertContent = (
    <>
      <p>
        Thank you for submitting your enrollment change certification. We have
        received your VA Form 22-1999b.
      </p>
      <p>
        VA will review your enrollment change and adjust benefit payments as
        appropriate. If we need additional information, we will contact you at
        the email address you provided.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Your confirmation number is:</strong> {confirmationNumber}
        </p>
      )}
    </>
  );

  return (
    <ConfirmationView
      formConfig={props.route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={studentName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="You've submitted your enrollment change certification"
        content={alertContent}
        actions={<p />}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your enrollment change"
        item1Content="VA will review the enrollment change details you submitted and calculate any benefit adjustments."
        item1Actions={<p />}
        item2Header="Benefit payments will be adjusted"
        item2Content="If a benefit adjustment is needed, VA will update payment amounts and notify the student directly."
      />
      <ConfirmationView.HowToContact />
      <ConfirmationView.GoBackLink />
      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
};

ConfirmationPage.propTypes = {
  form: PropTypes.shape({
    data: PropTypes.object,
    formId: PropTypes.string,
    submission: PropTypes.shape({
      response: PropTypes.shape({
        confirmationNumber: PropTypes.string,
      }),
      timestamp: PropTypes.instanceOf(Date),
    }),
  }),
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