import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_NUMBER = '2900-XXXX';
const OMB_EXP_DATE = '12/31/2026';
const OMB_RES_BURDEN = 120;

export const IntroductionPage = ({ route }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle
        title="Apply for a VA Clinical Position"
        subTitle="VA Form 10-2850e"
      />

      <p className="vads-u-font-size--lg vads-u-font-family--serif vads-u-font-weight--normal vads-u-line-height--4">
        Use this form to apply for a clinical position at a VA Medical Center.
        You must be a licensed healthcare professional to complete this
        application.
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
        You will need to provide detailed information about your professional
        background, including your licenses, education, employment history, and
        professional references.
      </p>

      <va-accordion>
        <va-accordion-item header="Documents you'll need to complete this form">
          <p>Before you start, gather the following documents:</p>
          <ul>
            <li>Current professional license(s) — all states and jurisdictions</li>
            <li>DEA registration certificate (if applicable)</li>
            <li>Board certification certificate(s) (if applicable)</li>
            <li>Employment history for the past 10 years</li>
            <li>Contact information for at least 3 professional references</li>
            <li>Malpractice insurance certificate</li>
            <li>Education and training records</li>
          </ul>
        </va-accordion-item>
        <va-accordion-item header="Who can use this form">
          <p>
            This form is for licensed healthcare professionals applying for
            clinical positions at VA Medical Centers. You must:
          </p>
          <ul>
            <li>Hold an active professional license</li>
            <li>Be eligible to work in the United States</li>
            <li>Not be currently excluded from federal healthcare programs</li>
          </ul>
        </va-accordion-item>
      </va-accordion>

      <va-alert status="info" class="vads-u-margin-top--4">
        <p slot="headline">Sign in to save your progress</p>
        <p>
          You can save your application and return to finish it later. Sign in
          with your Login.gov or ID.me account to get started.
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
        messages: PropTypes.object,
      }),
    }),
    pageList: PropTypes.array,
  }),
};

export default IntroductionPage;