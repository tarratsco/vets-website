import PropTypes from 'prop-types';
import React from 'react';
import { connect, useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const studentName = {
    first: data?.studentFirstName || '',
    last: data?.studentLastName || '',
  };

  const typeOfChange = data?.typeOfChange || '';
  const effectiveDate = data?.effectiveDateOfChange || '';

  const alertContent = (
    <>
      <p>
        We&apos;ve received your enrollment change certification for{' '}
        {studentName.first} {studentName.last}.
      </p>
      <p>
        VA will review the change and update the student&apos;s benefit
        payments as appropriate. If we need more information, we will contact
        you.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Confirmation number:</strong> {confirmationNumber}
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
        title="You've submitted your enrollment change certification"
        content={alertContent}
        actions={<p />}
      />

      <va-summary-box>
        <h3 slot="headline">Submission summary</h3>
        <ul>
          {studentName.first && (
            <li>
              <strong>Student:</strong> {studentName.first} {studentName.last}
            </li>
          )}
          {typeOfChange && (
            <li>
              <strong>Type of change:</strong> {typeOfChange.replace(/_/g, ' ')}
            </li>
          )}
          {effectiveDate && (
            <li>
              <strong>Effective date:</strong> {effectiveDate}
            </li>
          )}
        </ul>
      </va-summary-box>

      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>

      <ConfirmationView.PrintThisPage />

      <ConfirmationView.WhatsNextProcessList
        item1Header="VA reviews your submission"
        item1Content="VA will review the enrollment change and update the student's GI Bill benefit payments. This typically takes 30 days."
        item1Actions={<p />}
        item2Header="Student receives notification"
        item2Content="If an overpayment or underpayment is identified, VA will notify the student directly by mail."
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