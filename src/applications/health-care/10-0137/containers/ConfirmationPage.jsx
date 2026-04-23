import PropTypes from 'prop-types';
import React from 'react';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';
import { formatDateLong } from 'platform/utilities/date';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const formattedSubmitDate = submitDate ? formatDateLong(submitDate) : '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const veteranName = data?.veteranFullName || {};
  const veteranFirstName = veteranName.first || '';
  const veteranLastName = veteranName.last || '';
  const veteranFullDisplay =
    veteranFirstName && veteranLastName
      ? `${veteranFirstName} ${veteranLastName}`
      : 'Veteran';

  const submissionAlertContent = (
    <>
      <p>
        Thank you, {veteranFullDisplay}. Your VA Advance Directive has been
        submitted
        {formattedSubmitDate ? ` on ${formattedSubmitDate}` : ''}.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Confirmation number:</strong> {confirmationNumber}
        </p>
      )}
      <p>
        Your form has been sent to your VA care team. They will add it to your
        VA health record within 3 business days.
      </p>
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
        title="Your advance directive has been submitted"
        content={submissionAlertContent}
        actions={<p />}
      />

      <div className="vads-u-margin-y--4">
        <va-additional-info trigger="What happens next">
          <p>
            Your advance directive has been sent to your VA care team. They will
            add it to your VA health record. This process typically takes up to
            3 business days.
          </p>
          <p>
            Once it's in your record, your care team will be able to reference
            your preferences whenever you receive care at a VA facility.
          </p>
        </va-additional-info>

        <va-additional-info
          trigger="How to update or revoke your advance directive"
          class="vads-u-margin-top--2"
        >
          <p>
            A newer completed and signed advance directive supersedes any prior
            advance directive. To update your preferences, simply complete a new
            VA Form 10-0137.
          </p>
          <p>
            You may also verbally revoke your advance directive by telling your
            VA clinician that you wish to revoke it. Your clinician will
            document this in your medical record.
          </p>
          <p>
            <a href="/health-care/advance-directive/introduction">
              Start a new advance directive
            </a>
          </p>
        </va-additional-info>

        <va-additional-info
          trigger="Using this form outside VA"
          class="vads-u-margin-top--2"
        >
          <p>
            This VA Advance Directive form is valid in VA facilities without
            being notarized. However, you may need to have it notarized to be
            legally binding outside the VA health care setting. State laws vary
            regarding the requirements for advance directives. Consult with a
            legal advisor or your state's health department for guidance on
            external use.
          </p>
        </va-additional-info>
      </div>

      <ConfirmationView.PrintThisPage />
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