import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_RES_BURDEN = 30;
const OMB_NUMBER = '2900-XXXX';
const OMB_EXP_DATE = '12/31/2026';

export const IntroductionPage = ({ route, userIdVerified, userLoggedIn }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle
        title="Request a Government Headstone or Marker"
        subTitle="VA Form 40-1330M"
      />

      <p className="vads-u-font-size--lg">
        Use this form to request a government-furnished headstone or marker for
        an active duty service member or qualifying National Guard or Reserve
        member who died in the line of duty.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">Before you start</h2>
        <div>
          <p>
            This form is for service members who died while on active duty or
            qualifying National Guard or Reserve service. If the service member
            was discharged before death, use VA Form 40-1330 instead.
          </p>
        </div>
      </va-alert>

      <h2>What you need to complete this form</h2>
      <p>You may need these documents:</p>
      <ul>
        <li>
          <strong>Death certificate</strong> — an official copy
        </li>
        <li>
          <strong>DD Form 1300</strong> (Report of Casualty) — for active duty
          deaths
        </li>
        <li>
          <strong>NGB Form 22</strong> or equivalent Guard/Reserve service
          record — for Guard/Reserve deaths
        </li>
        <li>
          <strong>Authorization document</strong> — if you are not the next of
          kin
        </li>
      </ul>

      <h2>What happens after you submit</h2>
      <p>
        The National Cemetery Administration (NCA) will review your request and
        contact you if they need additional information. Processing times vary.
      </p>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your request"
        unauthStartText="Sign in to start your request"
        hideUnauthedStartLink={false}
        devOnly={{ forceShowFormControls: true }}
      />

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
      saveInProgress: PropTypes.shape({
        messages: PropTypes.shape({}),
      }),
      savedFormMessages: PropTypes.shape({}),
    }),
    pageList: PropTypes.array,
  }).isRequired,
  userIdVerified: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  userIdVerified: isLOA3(state),
  userLoggedIn: isLoggedIn(state),
});

export default connect(mapStateToProps)(IntroductionPage);