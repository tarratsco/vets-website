import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Request a VA Appraisal';
const SUBTITLE = 'VA Form 26-1805';

const OMB_RES_BURDEN = 25;
const OMB_NUMBER = '2900-0050';
const OMB_EXP_DATE = '09/30/2026';

export function IntroductionPage({ route }) {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <va-alert
        status="info"
        visible
        aria-label="Important: Lender submission requirement"
      >
        <h2 slot="headline">This form is for VA-approved lenders only</h2>
        <p>
          This form is for VA-approved lenders submitting appraisal requests on
          behalf of Veteran borrowers. Veterans cannot independently submit this
          form. If you are a Veteran, contact your lender to initiate your VA
          appraisal.
        </p>
      </va-alert>

      <va-alert
        status="warning"
        visible
        class="vads-u-margin-top--2"
        aria-label="Warning: WebLGY lenders should use the WebLGY portal"
      >
        <h2 slot="headline">
          WebLGY-enabled lenders should use the WebLGY portal
        </h2>
        <p>
          If you are a WebLGY-enabled lender, submit appraisal requests through
          the{' '}
          <a
            href="https://weblgy.vba.va.gov"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebLGY Lender Portal
          </a>
          . This VA.gov form is for lenders who do not have WebLGY access.
          Submitting through both channels will create duplicate cases.
        </p>
      </va-alert>

      <h2 className="vads-u-margin-top--4">What this form is for</h2>
      <p>
        Use VA Form 26-1805 to request a determination of reasonable value
        (appraisal) for a property involved in a VA-guaranteed loan transaction.
        This form is submitted by VA-approved lenders on behalf of Veteran
        borrowers for purchase, cash-out refinance, IRRRL (with confirmed
        appraisal requirement), or new construction transactions.
      </p>

      <h2>What you'll need to complete this form</h2>
      <ul>
        <li>VA Lender ID number (7-digit, issued by VA Loan Guaranty Service)</li>
        <li>Veteran borrower's full name, Social Security Number, and date of birth</li>
        <li>Certificate of Eligibility (COE) number (if available)</li>
        <li>Subject property address and property type</li>
        <li>Loan transaction type and estimated property value</li>
        <li>Property access contact information</li>
        <li>Lender point of contact name, phone, and email</li>
      </ul>

      <va-process-list>
        <va-process-list-item header="Loan type screening">
          We'll first confirm whether your IRRRL transaction requires an
          appraisal or qualifies for a waiver.
        </va-process-list-item>
        <va-process-list-item header="Lender and Veteran information">
          Provide your lender details and the Veteran borrower's identifying
          information.
        </va-process-list-item>
        <va-process-list-item header="Property information">
          Enter the subject property address, type, and relevant characteristics.
        </va-process-list-item>
        <va-process-list-item header="Access and timing">
          Provide contact information for property access and any timing
          requirements.
        </va-process-list-item>
        <va-process-list-item header="Review and submit">
          Review all information and attest to its accuracy before submitting.
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your appraisal request"
      />

      <div className="omb-info--container vads-u-margin-top--4">
        <va-omb-info
          res-burden={OMB_RES_BURDEN}
          omb-number={OMB_NUMBER}
          exp-date={OMB_EXP_DATE}
        />
      </div>
    </article>
  );
}

IntroductionPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.shape({
      prefillEnabled: PropTypes.bool,
      saveInProgress: PropTypes.shape({
        messages: PropTypes.object,
      }),
      savedFormMessages: PropTypes.shape({}),
    }),
    pageList: PropTypes.array,
  }),
};

export default IntroductionPage;