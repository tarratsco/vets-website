import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { formatDateLong } from 'platform/utilities/date';
import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const formattedDate = submitDate ? formatDateLong(submitDate) : '';

  const submissionAlertContent = (
    <div>
      <p>
        Thank you for submitting your request for a government headstone or
        marker. The National Cemetery Administration (NCA) will review your
        request and contact you if they need additional information.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Your confirmation number: {confirmationNumber}</strong>
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
        title={`Your headstone or marker request has been submitted${
          formattedDate ? ` on ${formattedDate}` : ''
        }`}
        content={submissionAlertContent}
      />
      <ConfirmationView.ChapterSectionCollection />
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="NCA will review your request"
        item1Content="If NCA needs more information after reviewing your request, they will contact you using the information you provided."
        item1Actions={<p />}
        item2Header="Your headstone or marker will be delivered"
        item2Content="After NCA approves your request, it will be sent to a fabrication contractor and delivered to the cemetery. Installation at the cemetery is not included and is the responsibility of the cemetery."
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