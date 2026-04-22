import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConfirmationView } from 'platform/forms-system/src/js/components/ConfirmationView';
import { formatDateLong } from 'platform/utilities/date';

export function ConfirmationPage({ route }) {
  const form = useSelector(state => state.form || {});
  const { submission, data } = form;
  const submitDate = submission?.timestamp || '';
  const formattedSubmitDate = submitDate ? formatDateLong(submitDate) : '';

  const confirmationNumber =
    submission?.response?.confirmationNumber ||
    submission?.response?.attributes?.confirmationNumber ||
    submission?.response?.attributes?.guid ||
    '';

  const lenderName = data?.lenderInformation?.lenderName || '';
  const veteranName = data?.veteranBorrowerInformation?.veteranFullName || {};

  const alertContent = (
    <>
      <p>
        Thank you for submitting your VA appraisal request. VA Loan Guaranty
        Service will assign an appraiser and contact the property access contact
        you provided to schedule the inspection.
      </p>
      {confirmationNumber && (
        <p>
          <strong>Confirmation number:</strong> {confirmationNumber}
        </p>
      )}
      {lenderName && (
        <p>
          <strong>Submitted by:</strong> {lenderName}
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
        title={`You've submitted your VA appraisal request${
          formattedSubmitDate ? ` on ${formattedSubmitDate}` : ''
        }`}
        content={alertContent}
        actions={<p />}
      />

      <div data-dd-privacy="mask" data-dd-action-name="confirmation summary">
        <ConfirmationView.ChapterSectionCollection />
      </div>

      <ConfirmationView.PrintThisPage />

      <ConfirmationView.WhatsNextProcessList
        item1Header="VA assigns an appraiser"
        item1Content="VA Loan Guaranty Service will assign a VA-approved appraiser from the panel for the property's Regional Loan Center (RLC) jurisdiction."
        item1Actions={<p />}
        item2Header="Appraisal inspection is scheduled"
        item2Content="The appraiser will contact the property access person you provided to schedule the inspection. Standard appraisals are completed within 10 business days. Rural markets may take longer."
        item2Actions={<p />}
        item3Header="Notice of Value (NOV) is issued"
        item3Content="After the inspection, VA will issue a Notice of Value (NOV) to the lender. The NOV establishes the reasonable value of the property for loan guaranty purposes."
      />

      <ConfirmationView.HowToContact />
      <ConfirmationView.GoBackLink />
      <ConfirmationView.NeedHelp />
    </ConfirmationView>
  );
}

ConfirmationPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.object,
  }),
};

export default ConfirmationPage;