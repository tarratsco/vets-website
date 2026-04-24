import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { formatDateLong } from 'platform/utilities/date';
import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';

export const ConfirmationPage = ({ route }) => {
  const form = useSelector(state => state.form || {});
  const submission = form?.submission || {};
  const submitDate = submission?.timestamp || '';
  const formattedSubmitDate = submitDate ? formatDateLong(submitDate) : '';
  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    '';

  const formData = form?.data || {};
  const studentFirstName =
    formData?.studentAndPriorCertification?.studentFirstName || '';
  const studentLastName =
    formData?.studentAndPriorCertification?.studentLastName || '';
  const typeOfChange =
    formData?.enrollmentChangeDetails?.typeOfChange || '';
  const effectiveDate =
    formData?.enrollmentChangeDetails?.effectiveDateOfChange || '';

  const changeTypeLabels = {
    full_termination: 'Full termination of enrollment',
    partial_withdrawal: 'Withdrawal from one or more courses (partial)',
    credit_hour_reduction: 'Reduction in credit hours',
    correction: 'Correction to previously submitted certification',
  };

  const submissionAlertContent = (
    <>
      <p>
        Thank you for submitting your enrollment change certification. We have
        received your submission and will process it according to VA GI Bill
        program requirements.
      </p>
      {confirmationNumber && (
        <p>
          Your confirmation number is{' '}
          <strong>{confirmationNumber}</strong>.
        </p>
      )}
      <p>
        If your student may have received benefit payments they were not entitled
        to, VA will calculate any overpayment and notify the student directly.
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
        title={`You've submitted your enrollment change certification${
          formattedSubmitDate ? ` on ${formattedSubmitDate}` : ''
        }`}
        content={submissionAlertContent}
        actions={<p />}
      />

      {(studentFirstName || studentLastName || typeOfChange) && (
        <va-summary-box uswds>
          <h3 slot="headline">Submission summary</h3>
          {(studentFirstName || studentLastName) && (
            <p>
              <strong>Student:</strong> {studentFirstName} {studentLastName}
            </p>
          )}
          {typeOfChange && (
            <p>
              <strong>Change type:</strong>{' '}
              {changeTypeLabels[typeOfChange] || typeOfChange}
            </p>
          )}
          {effectiveDate && (
            <p>
              <strong>Effective date:</strong> {effectiveDate}
            </p>
          )}
        </va-summary-box>
      )}

      <ConfirmationView.WhatsNextProcessList
        item1Header="We'll review your enrollment change certification"
        item1Content="VA will match this report to the student's GI Bill record and recalculate benefit payments as needed."
        item1Actions={<p />}
        item2Header="We'll notify the student if there is an overpayment"
        item2Content="If the enrollment change results in an overpayment, VA will contact the student directly with information about repayment options."
      />
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