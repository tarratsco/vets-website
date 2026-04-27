import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_RES_BURDEN = 90;
const OMB_NUMBER = '2900-0629';
const OMB_EXP_DATE = '05/31/2028';

export const IntroductionPage = ({ route, userLoggedIn, userIdVerified }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle
        title="Apply for extended care services"
        subTitle="VA Form 10-10EC"
      />

      <p className="vads-u-font-size--lg">
        Use this form to apply for VA extended care services and request an
        estimated monthly copayment based on your financial information.
      </p>

      <va-alert status="warning" visible>
        <h2 slot="headline">You must be enrolled in VA health care</h2>
        <p>
          You must be enrolled in VA health care before applying for extended
          care services. If you are not enrolled, please complete{' '}
          <a href="/health-care/apply-for-health-care-form-10-10ez/">
            VA Form 10-10EZ
          </a>{' '}
          first.
        </p>
      </va-alert>

      <va-alert status="info" visible class="vads-u-margin-top--2">
        <h2 slot="headline">10-calendar-day resubmission rule</h2>
        <p>
          Under 38 CFR 17.111, if your financial or household situation changes
          after you submit this form, you have 10 calendar days to resubmit
          updated information to avoid a change in your copayment amount.
        </p>
      </va-alert>

      <h2>What to gather before you start</h2>
      <va-process-list>
        <va-process-list-item header="Your personal information">
          <p>Your Social Security number (pre-filled from your VA profile)</p>
        </va-process-list-item>
        <va-process-list-item header="Insurance information">
          <p>
            Copies of all health insurance cards (including coverage through a
            spouse), Medicare card (Parts A &amp; B), and Medicaid card if
            applicable.
          </p>
        </va-process-list-item>
        <va-process-list-item header="Financial information">
          <p>
            Income, asset, and expense information for the current calendar year
            if you choose to provide financial details for an income-based
            copayment calculation.
          </p>
        </va-process-list-item>
        <va-process-list-item header="Power of attorney documents (if applicable)">
          <p>
            If someone is submitting this form on your behalf as an authorized
            POA representative, have the POA documentation ready to upload.
          </p>
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start the application"
        devOnly={{ forceShowFormControls: true }}
      />

      <p>
        <strong>Note:</strong> This form takes approximately {OMB_RES_BURDEN}{' '}
        minutes to complete.
      </p>

      <va-omb-info
        res-burden={OMB_RES_BURDEN}
        omb-number={OMB_NUMBER}
        exp-date={OMB_EXP_DATE}
      />
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
  userIdVerified: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  userLoggedIn: isLoggedIn(state),
  userIdVerified: isLOA3(state),
});

export default connect(mapStateToProps)(IntroductionPage);