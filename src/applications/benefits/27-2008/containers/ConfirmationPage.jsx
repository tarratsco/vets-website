import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

const alertContent = confirmationNumber => (
  <>
    <p>
      We&apos;ve received your application for a United States burial flag. We
      will review your application and route it to the NCA Field Programs
      Evidence Intake Center.
    </p>
    {confirmationNumber && (
      <p>
        Your confirmation number is{' '}
        <strong>{confirmationNumber}</strong>.
      </p>
    )}
    <p>
      If you uploaded discharge documentation, it has been included with your
      application. If you did not upload documentation, please be prepared to
      provide it upon request.
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

  const veteranName = {
    first: data?.veteranInformation?.firstName || '',
    last: data?.veteranInformation?.lastName || '',
  };

  return (
    <ConfirmationView
      formConfig={route?.formConfig}
      submitDate={submitDate}
      confirmationNumber={confirmationNumber}
      devOnly={{ showButtons: true }}
    >
      <ConfirmationView.SubmissionAlert
        title="You've submitted your application for a burial flag"
        content={alertContent(confirmationNumber)}
        actions={<p />}
      />
      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>
      <ConfirmationView.PrintThisPage />
      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your application"
        item1Content="We'll review the information you submitted and route your application to NCA Field Programs for processing."
        item1Actions={<p />}
        item2Header="VA will issue the burial flag"
        item2Content="Once approved, the burial flag will be issued through the appropriate channel. Contact your nearest VA regional office if you have questions."
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
  form: PropTypes.shape({
    data: PropTypes.object,
    submission: PropTypes.shape({
      response: PropTypes.shape({
        confirmationNumber: PropTypes.string,
      }),
      timestamp: PropTypes.string,
    }),
  }),
};

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(ConfirmationPage);