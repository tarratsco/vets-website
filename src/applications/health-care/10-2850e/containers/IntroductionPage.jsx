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
        Use this form to apply for a clinical position at a VA Medical Center,
        or to complete your credentialing and privileging application as a
        healthcare professional.
      </p>

      <h2 className="vads-u-margin-top--3">
        What to know before you fill out this form
      </h2>
      <p>
        This application collects your professional credentials, employment
        history, education, references, and disclosure information required for
        VA credentialing under VHA Handbook 1100.19.
      </p>

      <va-accordion>
        <va-accordion-item
          header="Documents you'll need to complete this form"
          id="doc-checklist"
        >
          <p>Before you start, gather the following documents:</p>
          <ul>
            <li>Current professional license(s) — copies of all licenses ever held</li>
            <li>DEA registration certificate (if applicable)</li>
            <li>Board certification certificate(s) (if applicable)</li>
            <li>Employment history for the past 10 years</li>
            <li>Professional references (at least 3)</li>
            <li>Malpractice insurance certificate</li>
            <li>Educational transcripts or diploma (if applicable)</li>
            <li>Work authorization documents (if applicable)</li>
          </ul>
        </va-accordion-item>
        <va-accordion-item
          header="Who can use this form"
          id="who-can-use"
        >
          <p>
            Licensed healthcare professionals applying for clinical positions at
            VA Medical Centers, including initial appointments, reappointments,
            transfers, and temporary or fee-basis appointments.
          </p>
        </va-accordion-item>
      </va-accordion>

      <va-alert status="info" visible>
        <p slot="headline">Sign in to save your progress</p>
        <p>
          This is a complex form with multiple sections. Sign in so you can
          save your work and return to it later. Your application will be saved
          for 60 days.
        </p>
      </va-alert>

      <SaveInProgressIntro
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your application"
        unauthStartText="Sign in to start your application"
        devOnly={{
          forceShowFormControls: true,
        }}
      />

      <div className="omb-info--container">
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
  }),
};

export default IntroductionPage;