import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

import { TITLE, SUBTITLE } from '../constants';

const ombInfo = {
  resBurden: '15',
  ombNumber: '2900-0702',
  expDate: '09/30/2026',
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

      <p className="vads-u-font-size--lg vads-u-font-family--serif vads-u-font-weight--normal vads-u-line-height--4">
        Use this form as a School Certifying Official (SCO) to report a change
        or termination of a student-Veteran's enrollment under GI Bill education
        benefits.
      </p>

      <h2 className="vads-u-margin-top--3">What to know before you start</h2>
      <p>
        Only a School Certifying Official (SCO) at an approved VA educational
        institution may complete this form. You must be signed in with an
        identity-verified account to proceed.
      </p>

      <ul>
        <li>
          Use this form to amend a previously submitted VA Form 22-1999
          (Enrollment Certification).
        </li>
        <li>
          Report changes within 30 days of the effective date when possible.
          Late submissions may result in an overpayment for your student.
        </li>
        <li>
          Have the original VA Form 22-1999 certification dates and credit hours
          on hand before you begin.
        </li>
        <li>
          You may upload supporting documents such as withdrawal notices or
          medical documentation (PDF, JPG, or PNG; max 25 MB per file, 3 files).
        </li>
      </ul>

      <h2>What happens after you submit</h2>
      <va-process-list uswds>
        <va-process-list-item header="We receive your enrollment change certification">
          <p>
            We review the information you provided and match it to the
            student-Veteran's record.
          </p>
        </va-process-list-item>
        <va-process-list-item header="We adjust the student's benefits">
          <p>
            Based on the change you reported, VA will recalculate the
            student's benefit payments. If an overpayment occurred, VA will
            notify the student directly.
          </p>
        </va-process-list-item>
        <va-process-list-item header="You receive a confirmation">
          <p>
            After submission, you will see a confirmation number on screen.
            Save or print this page for your records.
          </p>
        </va-process-list-item>
      </va-process-list>

      <va-alert status="info" uswds>
        <h2 slot="headline">Sign in to save your progress</h2>
        <p>
          If you sign in to VA.gov before starting this form, you can save your
          work and return to complete it within 60 days.
        </p>
      </va-alert>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your enrollment change certification"
        unauthStartText="Sign in to start your enrollment change certification"
        hideUnauthedStartLink={false}
        devOnly={{ forceShowFormControls: true }}
      />

      <va-omb-info
        res-burden={ombInfo.resBurden}
        omb-number={ombInfo.ombNumber}
        exp-date={ombInfo.expDate}
        uswds
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