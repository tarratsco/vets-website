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
        Use this form to apply for a clinical position at a VA Medical Center or
        to complete your credentialing and privileging application. This form is
        for healthcare professionals seeking initial appointment, reappointment,
        transfer credentialing, or temporary/fee-basis appointments.
      </p>

      <h2 className="vads-u-font-size--h3 vads-u-margin-top--3">
        What to know before you fill out this form
      </h2>
      <ul>
        <li>
          You must be signed in with a verified Login.gov or ID.me account to
          complete this form.
        </li>
        <li>
          You will need to provide information about all professional licenses
          ever held, employment history for the past 10 years, and at least 3
          professional references.
        </li>
        <li>
          You must answer all adverse history disclosure questions completely and
          accurately.
        </li>
        <li>
          Gathering all required documents before you start will help you
          complete the form more efficiently.
        </li>
      </ul>

      <va-accordion>
        <va-accordion-item header="Documents you'll need to complete this form">
          <p>Before you start, gather the following documents:</p>
          <ul>
            <li>Current professional license(s) — copies of all licenses</li>
            <li>DEA registration certificate (if applicable)</li>
            <li>Board certification certificate(s) (if applicable)</li>
            <li>Employment history for the past 10 years</li>
            <li>Professional references (at least 3)</li>
            <li>Malpractice insurance certificate</li>
            <li>
              Work authorization documents (if you are not a U.S. citizen)
            </li>
            <li>Graduate degree and postgraduate training information</li>
          </ul>
        </va-accordion-item>
      </va-accordion>

      <va-alert status="info" class="vads-u-margin-top--3">
        <p className="vads-u-margin-y--0">
          <strong>Note:</strong> This form collects sensitive personal
          information including your Social Security Number, malpractice history,
          criminal history, and professional licensure information. All
          information is encrypted and stored securely.
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
  }),
};

export default IntroductionPage;