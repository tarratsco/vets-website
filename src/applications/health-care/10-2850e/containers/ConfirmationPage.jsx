import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const applicantName = {
    first: data?.personalInformation?.firstName || '',
    last: data?.personalInformation?.lastName || '',
  };

  const submissionAlertContent = (
    <>
      <p>
        Thank you for submitting your application for a VA clinical position. We
        have received your application and will review it.
      </p>
      <p>
        The VA Medical Center credentialing office will contact you regarding
        next steps, including primary source verification of your credentials and
        scheduling a credentials committee review.
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
      submitterName={applicantName}
      devOnly={{
        showButtons: true,
      }}
    >
      <ConfirmationView.SubmissionAlert
        title="You've submitted your VA clinical position application"
        content={submissionAlertContent}
        actions={<p />}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="The VA Medical Center credentialing office will review your submitted application and supporting documents. Primary source verification of your licenses, certifications, and credentials will be conducted."
        item1Actions={<p />}
        item2Header="You'll be contacted for next steps"
        item2Content="A credentialing coordinator will contact you with information about the credentials committee review process and any additional documentation needed."
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