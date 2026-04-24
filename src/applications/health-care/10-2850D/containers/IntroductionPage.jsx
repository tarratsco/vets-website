import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Health Professions Trainee Data Collection Form';
const SUBTITLE = 'VA Form 10-2850D';

const ombInfo = {
  resBurden: '30',
  ombNumber: '2900-0205',
  expDate: '05/31/2026',
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
        Use this form to provide your personal, professional, and credential
        information as a health professions trainee applying for a clinical
        training appointment at a VA facility.
      </p>

      {userLoggedIn && !userIdVerified && (
        <va-alert status="warning" visible>
          <h2 slot="headline">Identity verification required</h2>
          <p>
            You must verify your identity with Login.gov before you can complete
            and submit this form. Your application contains sensitive personal
            information including your Social Security number and professional
            license details.
          </p>
          <va-link href="/verify" text="Verify your identity with Login.gov" />
        </va-alert>
      )}

      <h2 className="vads-u-margin-top--3">What to know before you start</h2>
      <p>
        You will need the following information to complete this form:
      </p>
      <ul>
        <li>Your Social Security number</li>
        <li>Your current mailing address and contact information</li>
        <li>
          Information about your VA training facility, including the city, state,
          and your expected training start and end dates
        </li>
        <li>
          All current and prior health professional licenses, certifications, and
          DEA registrations in any state or jurisdiction
        </li>
        <li>Your complete education history after high school</li>
        <li>
          Information about any internships, residencies, or fellowships you have
          completed or are currently enrolled in
        </li>
        <li>
          If you are not a U.S. citizen, your immigration and visa documents
        </li>
        <li>
          If you graduated from an international medical school, your ECFMG
          certificate number and date
        </li>
      </ul>

      <va-additional-info trigger="Who should complete this form?">
        <p>
          This form is for health professions trainees seeking appointment to a
          clinical training program at a VA medical facility. Trainees include
          medical students, residents, fellows, nursing students, pharmacy
          students, social work students, and other health profession students in
          graduate or professional programs affiliated with VA.
        </p>
      </va-additional-info>

      <va-process-list>
        <va-process-list-item header="Sign in or create an account">
          You must be signed in with a Login.gov account verified to Identity
          Assurance Level 2 (IAL2) to submit this form.
        </va-process-list-item>
        <va-process-list-item header="Complete all sections of the form">
          Provide your personal information, military status, citizenship,
          licenses and credentials, education history, training history, and
          responses to additional certification questions.
        </va-process-list-item>
        <va-process-list-item header="Certify and authorize">
          Review and sign two separate electronic acknowledgments: your trainee
          certification and your authorization for release of information.
        </va-process-list-item>
        <va-process-list-item header="Review and submit">
          Review all of your answers and submit your application. You will
          receive a confirmation number.
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start the Health Professions Trainee application"
        devOnly={{ forceShowFormControls: true }}
        unauthStartText="Sign in to start your application"
        hideUnauthedStartLink={false}
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