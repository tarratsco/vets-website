import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Request a Government Headstone or Marker';
const SUBTITLE = 'VA Form 40-1330M';

const ombInfo = {
  resBurden: '20',
  ombNumber: '2900-XXXX',
  expDate: '12/31/2026',
};

export const IntroductionPage = ({ route, userLoggedIn, userIdVerified }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <p className="vads-u-font-size--lg">
        Use this form to request a government-furnished headstone or marker for
        a service member who died while on active duty or qualifying National
        Guard or Reserve service.
      </p>

      <h2 className="vads-u-margin-top--3">Who can use this form?</h2>
      <p>
        This form is for requesting a headstone or marker when the service
        member died:
      </p>
      <ul>
        <li>While on active duty, <strong>or</strong></li>
        <li>
          While serving in the National Guard or Reserve under qualifying
          circumstances (died in the line of duty during active duty for
          training, inactive duty for training, or was entitled to retirement
          pay)
        </li>
      </ul>

      <va-alert status="info" visible>
        <h3 slot="headline">Is this the right form for you?</h3>
        <p>
          If the service member was discharged from service before death, use{' '}
          <a href="/find-forms/about-form-40-1330/">VA Form 40-1330</a> instead.
        </p>
      </va-alert>

      <h2 className="vads-u-margin-top--3">What you&apos;ll need</h2>
      <p>Please have the following information ready:</p>
      <ul>
        <li>Service member&apos;s personal information (name, SSN, dates)</li>
        <li>Military service information (branch, rank, service dates)</li>
        <li>Cemetery and burial location information</li>
        <li>Death certificate (upload required)</li>
        <li>
          DD Form 1300 (active duty) or NGB Form 22 (Guard/Reserve) — upload
          required
        </li>
      </ul>

      <p>
        You can save your progress and finish later. You&apos;ll need to sign in
        to save.
      </p>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your request"
        devOnly={{ forceShowFormControls: true }}
      >
        Sign in or create an account to save your progress.
      </SaveInProgressIntro>

      {userLoggedIn && !userIdVerified && (
        <va-alert status="warning" visible>
          <h3 slot="headline">Verify your identity to save your progress</h3>
          <p>
            You need to verify your identity before you can save this form. Go
            to your profile to verify your identity.
          </p>
        </va-alert>
      )}

      <va-omb-info
        res-burden={ombInfo.resBurden}
        omb-number={ombInfo.ombNumber}
        exp-date={ombInfo.expDate}
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