import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Apply for a VA Clinical Position';
const SUBTITLE = 'VA Form 10-2850e';

const OMB_RES_BURDEN = 90;
const OMB_NUMBER = '2900-XXXX';
const OMB_EXP_DATE = '12/31/2026';

export const IntroductionPage = ({ route }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <p className="va-introtext">
        Use this form to apply for a healthcare professional clinical position
        at a VA Medical Center, including initial appointments, reappointments,
        transfers, and temporary or fee-basis appointments. This application
        initiates the VA credentialing and privileging process required by VHA
        Handbook 1100.19.
      </p>

      <SaveInProgressIntro
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your application"
        unauthStartText="Sign in to start your application"
        devOnly={{ forceShowFormControls: true }}
      />

      <h2 className="vads-u-margin-top--4">
        What to know before you fill out this form
      </h2>
      <p>
        Only licensed healthcare professionals applying for clinical positions
        at VA Medical Centers should complete this form. You will need to
        provide detailed information about your professional background,
        including licensure, education, employment history, and any adverse
        actions.
      </p>

      <va-accordion class="vads-u-margin-top--3">
        <va-accordion-item
          header="Documents you'll need to complete this form"
          id="doc-checklist"
        >
          <p>Before you start, gather the following documents:</p>
          <ul>
            <li>
              Current professional license(s) — copies of all licenses ever
              held
            </li>
            <li>DEA registration certificate (if applicable)</li>
            <li>Board certification certificate(s) (if applicable)</li>
            <li>
              Employment history for the past 10 years (employer names,
              addresses, dates)
            </li>
            <li>
              Contact information for at least 3 professional references
            </li>
            <li>
              Malpractice insurance certificate (current policy)
            </li>
            <li>
              Any documentation related to adverse licensure actions,
              malpractice claims, or criminal history (if applicable)
            </li>
            <li>
              Work authorization documents (if you are not a U.S. citizen)
            </li>
          </ul>
        </va-accordion-item>

        <va-accordion-item
          header="Privacy Act notice"
          id="privacy-notice"
        >
          <p>
            The information you provide on this form is protected under the
            Privacy Act of 1974 (5 U.S.C. 552a). It will be used to evaluate
            your qualifications for a VA clinical position and to conduct the
            background investigation and primary source verification required
            for VHA credentialing. Your Social Security Number is required for
            background investigation purposes.
          </p>
        </va-accordion-item>
      </va-accordion>

      <va-alert status="info" class="vads-u-margin-top--4">
        <p className="vads-u-margin-y--0">
          <strong>Sign in required:</strong> You must sign in with Login.gov or
          ID.me to complete this application. Your progress will be saved
          automatically so you can return where you left off.
        </p>
      </va-alert>

      <div className="omb-info--container vads-u-margin-top--4">
        <va-omb-info
          res-burden={OMB_RES_BURDEN}
          omb-number={OMB_NUMBER}
          exp-date={OMB_EXP_DATE}
        />
      </div>
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
  }).isRequired,
};

export default IntroductionPage;