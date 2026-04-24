import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

const alertContent = confirmationNumber => (
  <>
    <p>
      Your Health Professions Trainee Data Collection Form (VA Form 10-2850D)
      has been submitted successfully.
    </p>
    {confirmationNumber && (
      <p>
        Your confirmation number is <strong>{confirmationNumber}</strong>. Please
        save this number for your records.
      </p>
    )}
    <p>
      The Designated Education Officer (DEO) at your VA training facility will
      be notified of your submission and will review your application.
    </p>
  </>
);

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const applicantName = {
    first: data?.applicantInformation?.firstName || '',
    last: data?.applicantInformation?.lastName || '',
  };

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      submitterName={applicantName}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="Application submitted"
        content={alertContent(confirmationNumber)}
        actions={<p />}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="VA reviews your application"
        item1Content="The Designated Education Officer (DEO) at your VA training facility will review your application and verify your qualifications against the Trainee Qualifications and Credentials Verification Letter (TQCVL)."
        item1Actions={<p />}
        item2Header="Medical Center Director approval"
        item2Content="The Medical Center Director (or equivalent) at your training facility must approve your appointment before you can begin training."
        item3Header="You will be contacted"
        item3Content="Your facility's education office will contact you regarding your appointment status. If you have questions, contact your VA training facility's education coordinator directly."
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
  return { form: state.form };
}

export default connect(mapStateToProps)(ConfirmationPage);