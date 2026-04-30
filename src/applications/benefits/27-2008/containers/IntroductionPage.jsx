import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_RES_BURDEN = 15;
const OMB_NUMBER = '2900-0013';
const OMB_EXP_DATE = '05/31/2027';

const TITLE = 'Apply for a United States burial flag';
const SUBTITLE = 'VA Form 27-2008';

export const IntroductionPage = ({ route }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <p className="vads-u-font-size--lg vads-u-font-family--serif vads-u-font-weight--normal vads-u-line-height--4">
        Use this form to request a United States flag to drape the casket or
        accompany the urn of a deceased Veteran during burial services.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">Have these documents ready before you start</h2>
        <ul>
          <li>
            DD Form 214 (Certificate of Release or Discharge from Active Duty)
            or equivalent discharge documentation
          </li>
          <li>
            Veteran's Social Security Number or VA file number (optional but
            helpful)
          </li>
          <li>
            Date and place of burial or planned burial
          </li>
        </ul>
      </va-alert>

      <h2 className="vads-u-margin-top--3">Who can apply</h2>
      <p>
        You can apply for a burial flag if you are:
      </p>
      <ul>
        <li>A next-of-kin (surviving spouse, child, parent, sibling, or other relative)</li>
        <li>A funeral director or funeral home representative</li>
        <li>A Veterans Service Organization (VSO) representative</li>
        <li>A close friend of the Veteran with no living next-of-kin</li>
      </ul>

      <h2>Veteran eligibility</h2>
      <p>
        The deceased Veteran must have been discharged under conditions other
        than dishonorable. Veterans who served in certain capacities with the
        U.S. Public Health Service, NOAA, or the Selected Reserve may also
        qualify. See Section C of the form instructions for full eligibility
        criteria.
      </p>

      <p>
        <strong>Note for unauthenticated users:</strong> You can complete this
        form without signing in. This form takes approximately 15 minutes to
        complete. If you are not signed in, your progress will not be saved.
        Please complete the form in one session.
      </p>

      <SaveInProgressIntro
        formConfig={formConfig}
        pageList={pageList}
        startText="Start your application"
        headingLevel={2}
        messages={formConfig.saveInProgress.messages}
        prefillEnabled={formConfig.prefillEnabled}
        devOnly={{ forceShowFormControls: true }}
      />

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
      savedFormMessages: PropTypes.shape({}),
      saveInProgress: PropTypes.shape({
        messages: PropTypes.shape({}),
      }),
    }),
    pageList: PropTypes.array,
  }),
};

export default IntroductionPage;