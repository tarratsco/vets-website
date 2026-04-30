import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Apply for a United States flag for burial purposes';
const SUBTITLE = 'VA Form 27-2008';

const OMB_RES_BURDEN = 15;
const OMB_NUMBER = '2900-0013';
const OMB_EXP_DATE = '05/31/2027';

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
        Use this form to request a United States burial flag to drape over the
        casket or accompany the urn of a deceased Veteran during burial services.
      </p>

      <va-alert status="info" uswds>
        <h2 slot="headline">Who can apply</h2>
        <div>
          <p>You may apply if you are:</p>
          <ul>
            <li>
              Next-of-kin (surviving spouse, child, parent, sibling, or other
              relative)
            </li>
            <li>A funeral director or funeral home representative</li>
            <li>A Veterans Service Organization (VSO) representative</li>
            <li>
              A close friend of the Veteran when no living next-of-kin is
              available
            </li>
          </ul>
          <p>
            <strong>Note:</strong> You do not need to sign in to VA.gov to
            submit this form. Funeral directors and authorized representatives
            may submit without a VA.gov account.
          </p>
        </div>
      </va-alert>

      <h2>What to gather before you start</h2>
      <ul>
        <li>
          DD Form 214 (Certificate of Release or Discharge from Active Duty) or
          other official discharge documentation
        </li>
        <li>
          Veteran&apos;s full name, Social Security Number (optional), and VA
          file number (if available)
        </li>
        <li>Dates of military service and branch of service</li>
        <li>Date and place of burial</li>
        <li>
          Name and address of the person who will receive the flag (Item 14)
        </li>
      </ul>

      <h2>How this form works</h2>
      <va-process-list uswds>
        <va-process-list-item header="Enter Veteran information">
          Provide the Veteran&apos;s name, identification numbers, and dates of
          service, birth, death, and burial.
        </va-process-list-item>
        <va-process-list-item header="Confirm eligibility">
          Indicate whether documentation is available and the character of the
          Veteran&apos;s discharge.
        </va-process-list-item>
        <va-process-list-item header="Identify the flag recipient">
          Provide the name and address of the person who will receive the
          burial flag.
        </va-process-list-item>
        <va-process-list-item header="Submit your application">
          Review your information, certify accuracy, and submit online.
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your application"
        unauthStartText="Start your application without signing in"
        hideUnauthedStartLink={false}
        devOnly={{ forceShowFormControls: true }}
      />

      <va-omb-info
        res-burden={OMB_RES_BURDEN}
        omb-number={OMB_NUMBER}
        exp-date={OMB_EXP_DATE}
      />

      {userLoggedIn && !userIdVerified && (
        <va-alert status="warning" uswds>
          <h2 slot="headline">Verify your identity to save your progress</h2>
          <p>
            Sign in with a verified account to save your application and
            pre-fill information from VA records.
          </p>
        </va-alert>
      )}
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
  userLoggedIn: isLoggedIn(state),
  userIdVerified: isLOA3(state),
});

export default connect(mapStateToProps)(IntroductionPage);