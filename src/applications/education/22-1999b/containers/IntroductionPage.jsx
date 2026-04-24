import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

import { FORM_TITLE, FORM_SUBTITLE } from '../constants';

const ombInfo = {
  resBurden: '15',
  ombNumber: '2900-0278',
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
      <FormTitle title={FORM_TITLE} subTitle={FORM_SUBTITLE} />

      <p className="vads-u-font-size--lg">
        Use this form if you are a School Certifying Official (SCO) reporting
        an enrollment change or termination for a student using GI Bill
        education benefits.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">Before you start</h2>
        <p>
          You must be signed in as a School Certifying Official to use this
          form. Have the original VA Form 22-1999 certification information
          available before you begin.
        </p>
      </va-alert>

      <h2 className="vads-u-margin-top--3">What this form is for</h2>
      <p>
        VA Form 22-1999b allows School Certifying Officials to report the
        following enrollment changes for students receiving GI Bill benefits:
      </p>
      <ul>
        <li>Full termination of enrollment</li>
        <li>Partial withdrawal from one or more courses</li>
        <li>Reduction in credit hours</li>
        <li>Correction to a previously submitted certification</li>
      </ul>

      <h2>What information you need</h2>
      <va-process-list>
        <va-process-list-item header="Your institution information">
          Your VA Facility Code, institution name, and your contact information
          as the School Certifying Official.
        </va-process-list-item>
        <va-process-list-item header="Student information">
          The student-Veteran&apos;s full name, Social Security number or VA
          File Number, and the GI Bill benefit chapter they are using.
        </va-process-list-item>
        <va-process-list-item header="Original certification details">
          The enrollment period dates, credit hours, and enrollment type from
          the original VA Form 22-1999 you are amending.
        </va-process-list-item>
        <va-process-list-item header="Change details">
          The type of change, effective date, and any supporting information
          required for the change type you are reporting.
        </va-process-list-item>
      </va-process-list>

      <div className="vads-u-margin-top--4">
        <SaveInProgressIntro
          prefillEnabled={formConfig.prefillEnabled}
          messages={formConfig.saveInProgress.messages}
          pageList={pageList}
          startText="Start your enrollment change certification"
          unauthStartText="Sign in to start your enrollment change certification"
          hideUnauthedStartLink={false}
          devOnly={{ forceShowFormControls: true }}
        />
      </div>

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
  }),
  userIdVerified: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  userIdVerified: isLOA3(state),
  userLoggedIn: isLoggedIn(state),
});

export default connect(mapStateToProps)(IntroductionPage);