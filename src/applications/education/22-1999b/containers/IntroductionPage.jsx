import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Report an enrollment change or termination';
const SUBTITLE = 'VA Form 22-1999b';

const ombInfo = {
  resBurden: '15',
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
        Use this form if you are a School Certifying Official (SCO) who needs
        to report a change or termination to a previously submitted enrollment
        certification (VA Form 22-1999).
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">Sign in to save your work</h2>
        <p>
          Sign in with your Login.gov or ID.me account to save your progress
          and return to this form later. You must be an authenticated School
          Certifying Official to use this form.
        </p>
      </va-alert>

      <h2>What to know before you fill out this form</h2>
      <p>
        This form is for School Certifying Officials only. You will need the
        following information to complete this form:
      </p>

      <va-process-list>
        <va-process-list-item header="Institution information">
          Your VA Facility Code (8-digit number assigned by VA), institution
          name and address.
        </va-process-list-item>
        <va-process-list-item header="Student information">
          The student-Veteran&apos;s full name and Social Security number or VA
          File Number, and the GI Bill benefit chapter they are using.
        </va-process-list-item>
        <va-process-list-item header="Prior certification details">
          The original certification period dates, credit hours, and enrollment
          type from the VA Form 22-1999 you are amending.
        </va-process-list-item>
        <va-process-list-item header="Change details">
          The type of change, effective date, reason for the change, and any
          supporting documentation.
        </va-process-list-item>
      </va-process-list>

      <va-summary-box>
        <h3 slot="headline">Estimated completion time</h3>
        <p>
          Depending on the complexity of the enrollment change, this form takes
          approximately 15 minutes to complete.
        </p>
      </va-summary-box>

      <SaveInProgressIntro
        formId={formConfig.formId}
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
        messages: PropTypes.shape({}),
      }),
      formId: PropTypes.string,
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