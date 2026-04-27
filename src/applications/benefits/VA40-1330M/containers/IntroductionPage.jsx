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
  resBurden: '15',
  ombNumber: '2900-0222',
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
        a service member who died while on active duty, or a National Guard or
        Reserve member who died under qualifying circumstances.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">Who can use this form</h2>
        <div>
          <p>This form is for:</p>
          <ul>
            <li>
              Service members who died while on active duty (Army, Navy, Air
              Force, Marine Corps, Space Force, Coast Guard)
            </li>
            <li>
              National Guard or Reserve members who died in the line of duty
              during active duty for training or inactive duty training, or who
              were entitled to retired pay
            </li>
          </ul>
          <p>
            <strong>Note:</strong> If the service member was discharged before
            death, use VA Form 40-1330 instead.
          </p>
        </div>
      </va-alert>

      <h2>What you'll need to complete this form</h2>
      <ul>
        <li>The service member's legal name, Social Security number, and dates of birth and death</li>
        <li>Military service information (branch, rank, service dates)</li>
        <li>Cemetery and grave location information</li>
        <li>A copy of the death certificate (upload required)</li>
        <li>
          For active duty: DD Form 1300 (Report of Casualty)
        </li>
        <li>
          For National Guard/Reserve: NGB Form 22 or equivalent service record
        </li>
      </ul>

      <h2>How long will this take?</h2>
      <p>
        This form takes approximately 15 minutes to complete. You can save your
        progress and return later if you need to gather documents.
      </p>

      {userLoggedIn && !userIdVerified && (
        <va-alert status="warning" visible>
          <h2 slot="headline">You need to verify your identity</h2>
          <p>
            To submit this form online, you need to verify your identity. This
            helps protect your information and the information of the deceased
            service member.
          </p>
        </va-alert>
      )}

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your request"
        devOnly={{ forceShowFormControls: true }}
      />

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
        messages: PropTypes.object,
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