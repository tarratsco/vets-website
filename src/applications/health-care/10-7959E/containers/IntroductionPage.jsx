import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Claim for Miscellaneous Expenses';
const SUBTITLE = 'VA Form 10-7959E';

const OMB_RES_BURDEN = 10;
const OMB_NUMBER = '2900-0219';
const OMB_EXP_DATE = '12/31/2027';

export const IntroductionPage = ({ route }) => {
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
          This form is for beneficiaries of the Spina Bifida Health Care
          Benefits Program or the Children of Women Vietnam Veterans (CWVV)
          Program only.
        </p>
      </va-alert>

      <va-alert status="warning" visible uswds class="vads-u-margin-top--2">
        <p className="vads-u-margin-y--0">
          Receipts must be provided with this form to ensure proper payment.
          Failure to provide the requested information will result in a delay or
          denial of reimbursement.
        </p>
      </va-alert>

      <h2 className="vads-u-margin-top--3">What to know before you start</h2>
      <p>
        Use this form to claim reimbursement for travel, lodging, meals, and
        other miscellaneous expenses related to medical care under the Spina
        Bifida or CWVV programs.
      </p>

      <va-accordion uswds>
        <va-accordion-item header="Who is eligible to file this form?" uswds>
          <p>
            You may file this form if the patient is an eligible beneficiary
            enrolled in one of the following programs:
          </p>
          <ul>
            <li>Spina Bifida Health Care Benefits Program</li>
            <li>Children of Women Vietnam Veterans (CWVV) Program</li>
          </ul>
          <p>
            The qualifying Veteran parent (sponsor) must have served in a
            covered area and period of service as required by the applicable
            program.
          </p>
        </va-accordion-item>
        <va-accordion-item header="What to gather before you start" uswds>
          <ul>
            <li>
              Patient Social Security number and date of birth (the child
              beneficiary)
            </li>
            <li>Sponsor (qualifying Veteran) Social Security number</li>
            <li>Receipts for all non-POV expenses you are claiming</li>
            <li>
              Provider Tax ID number and provider signature if claiming travel
            </li>
            <li>
              Attendant name and relationship to patient if an attendant
              traveled with the patient
            </li>
          </ul>
        </va-accordion-item>
      </va-accordion>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your claim"
        unauthStartText="Sign in to start your claim"
        hideUnauthedStartLink
        devOnly={{ forceShowFormControls: true }}
      />

      <p className="vads-u-margin-top--4">
        <strong>Respondent burden:</strong> {OMB_RES_BURDEN} minutes.{' '}
        <strong>OMB Control No.:</strong> {OMB_NUMBER}.{' '}
        <strong>Expires:</strong> {OMB_EXP_DATE}.
      </p>
      <p>
        The information requested on this form is solicited under authority of
        38 U.S.C. &sect; 501 and &sect; 1805. The information you supply will
        be used to determine your eligibility for reimbursement of miscellaneous
        expenses. System of Records: 54VA16.
      </p>
    </article>
  );
};

IntroductionPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.shape({
      prefillEnabled: PropTypes.bool,
      savedFormMessages: PropTypes.shape({}),
      saveInProgress: PropTypes.shape({
        messages: PropTypes.object,
      }),
    }),
    pageList: PropTypes.array,
  }),
};

export default IntroductionPage;