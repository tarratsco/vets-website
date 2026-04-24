import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_RES_BURDEN = 60;
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
      <FormTitle
        title="Apply for a VA Clinical Position"
        subTitle="VA Form 10-2850e"
      />

      <p className="va-introtext">
        Use this form to apply for a clinical position at a VA Medical Center and
        to complete your credentialing and privileging application.
      </p>

      <h2 className="vads-u-margin-top--3">What to know before you start</h2>
      <p>
        You must be a licensed healthcare professional applying for a clinical
        position at a VA Medical Center. This form collects your professional
        credentials, employment history, references, and other information
        required by VHA credentialing standards.
      </p>

      <h3>Documents you&apos;ll need</h3>
      <ul>
        <li>Current professional license(s) — all states and jurisdictions</li>
        <li>DEA registration certificate (if applicable)</li>
        <li>Board certification certificate(s) (if applicable)</li>
        <li>Employment history for the past 10 years</li>
        <li>Names and contact information for at least 3 professional references</li>
        <li>Malpractice insurance certificate</li>
        <li>Education and postgraduate training records</li>
      </ul>

      <va-alert status="info" visible>
        <p className="vads-u-margin-y--0">
          <strong>Save your work:</strong> You can save this application and come
          back to finish it later. Your application will be saved for 60 days.
        </p>
      </va-alert>

      <SaveInProgressIntro
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your application"
        unauthStartText="Sign in to start your application"
        devOnly={{ forceShowFormControls: true }}
      />

      <p className="vads-u-margin-top--4">
        <strong>Note:</strong> You must sign in with a verified account (Login.gov
        IAL2 or ID.me IAL2) to submit this form.
      </p>

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
        messages: PropTypes.object,
      }),
      savedFormMessages: PropTypes.shape({}),
    }),
    pageList: PropTypes.array,
  }).isRequired,
};

export default IntroductionPage;