import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Interest Rate Reduction Refinancing Loan Worksheet';
const SUBTITLE = 'VA Form 26-8923';

const OMB_RES_BURDEN = 15;
const OMB_NUMBER = '2900-0386';
const OMB_EXP_DATE = '11/30/2027';

export default function IntroductionPage({ route }) {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <va-alert status="info" visible uswds>
        <p className="vads-u-margin-y--0">
          This tool is for use by VA-approved lending institutions completing an
          Interest Rate Reduction Refinancing Loan (IRRRL) worksheet. If you are
          a Veteran, please contact your lender for assistance.
        </p>
      </va-alert>

      <h2 className="vads-u-margin-top--3">What this tool does</h2>
      <p>
        Use this tool to compute the maximum loan amount for an IRRRL
        (VA-to-VA refinance). The tool performs all 18-line calculations
        required by VA Form 26-8923 (November 2024 version) and generates a
        completed PDF ready for officer signature and inclusion in your IRRRL
        closing package.
      </p>

      <h2>What you will need before you start</h2>
      <ul>
        <li>The VA loan number for the existing VA-guaranteed loan being refinanced</li>
        <li>
          The servicer payoff statement showing the existing VA loan balance
          (including any energy efficient improvement costs to be financed)
        </li>
        <li>The discount points percentage (if any)</li>
        <li>The origination fee percentage (not to exceed 1% per 38 CFR § 36.4313)</li>
        <li>
          The VA funding fee percentage (0.5% per 38 CFR § 36.4312, or 0% if the
          Veteran is exempt)
        </li>
        <li>Other allowable closing costs and prepaids</li>
        <li>
          Documentation of any funding fee exemption (if applicable), per VA
          Lender&apos;s Handbook
        </li>
      </ul>

      <va-process-list uswds>
        <va-process-list-item header="Enter loan identification information">
          Provide the VA loan number, your institution&apos;s name, and the
          certifying officer&apos;s name and title.
        </va-process-list-item>
        <va-process-list-item header="Complete Section I — Initial Computation">
          Enter the existing VA loan balance (Lines 1 and 2). The tool
          calculates Line 3 automatically.
        </va-process-list-item>
        <va-process-list-item header="Complete Section II — Preliminary Loan Amount">
          Enter fee percentages and other closing costs (Lines 5, 6, 7, 8).
          The tool computes all dollar amounts and the Line 9 preliminary total.
        </va-process-list-item>
        <va-process-list-item header="Review Section III — Final Computation">
          The tool performs the iterative recalculation (Lines 10–18) and
          displays the maximum loan amount on Line 18.
        </va-process-list-item>
        <va-process-list-item header="Certify and submit">
          Enter the worksheet date, confirm the certification, and submit to
          generate the completed PDF.
        </va-process-list-item>
        <va-process-list-item header="Print, sign, and include in closing package">
          Download the generated PDF, have an officer of your lending institution
          sign in ink, and include it in your IRRRL closing package.
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start the IRRRL worksheet"
        unauthStartText="Sign in to save your worksheet and return to it later"
        hideUnauthedStartLink={false}
        devOnly={{
          forceShowFormControls: true,
        }}
      />

      <va-additional-info trigger="Privacy Act Statement" uswds>
        <p>
          The information requested on this form is authorized by Title 38,
          United States Code. The responses you provide are considered
          confidential (38 U.S.C. 5701). This information may be disclosed
          outside the VA only if the disclosure is authorized under the Privacy
          Act, including the routine uses identified in the VA system of records,
          55VA26, published in the Federal Register. Your obligation to respond
          is required to obtain or retain benefits. VA uses the information to
          determine maximum loan amounts for Interest Rate Reduction Refinancing
          Loans under the VA Home Loan Guaranty program.
        </p>
        <p>
          <strong>OMB Control No. {OMB_NUMBER}</strong> — Respondent Burden:{' '}
          {OMB_RES_BURDEN} minutes — Expiration Date: {OMB_EXP_DATE}
        </p>
        <p>
          The Paperwork Reduction Act of 1995 requires us to notify you that
          this information collection is in accordance with the clearance
          requirements of section 3507 of the Paperwork Reduction Act of 1995.
          We may not collect this information, and you are not required to
          respond to this collection of information, unless it displays a
          currently valid OMB number.
        </p>
      </va-additional-info>

      <p className="vads-u-margin-top--2">
        <strong>Note:</strong> VA Form 26-8923 requires the signature of an
        officer of the lending institution, signed in ink. This digital tool
        generates a completed PDF that must be printed and signed before
        inclusion in the IRRRL closing package.
      </p>
    </article>
  );
}

IntroductionPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.shape({
      prefillEnabled: PropTypes.bool,
      saveInProgress: PropTypes.shape({
        messages: PropTypes.shape({}),
      }),
      savedFormMessages: PropTypes.shape({}),
    }),
    pageList: PropTypes.array,
  }),
};