import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_RES_BURDEN = 15;
const OMB_NUMBER = '2900-0013';
const OMB_EXP_DATE = '05/31/2027';

export const IntroductionPage = ({ route }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle
        title="Apply for a United States burial flag"
        subTitle="VA Form 27-2008"
      />

      <p className="vads-u-font-size--lg vads-u-font-family--serif vads-u-font-weight--normal vads-u-line-height--4">
        Use this form to request a United States burial flag to drape the
        casket or accompany the urn of a deceased Veteran during burial
        services.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">What to know before you fill out this form</h2>
        <div>
          <p>
            You can submit this form without signing in. Sign in with
            Login.gov or ID.me to save your progress and pre-fill
            information from VA records.
          </p>
          <p>
            Gather these items before you start:
          </p>
          <ul>
            <li>
              DD Form 214 (Certificate of Release or Discharge from Active
              Duty) or other discharge documentation
            </li>
            <li>
              The Veteran's Social Security Number or VA file number
              (optional but helpful)
            </li>
            <li>
              Information about the burial location (cemetery name, city,
              and state)
            </li>
          </ul>
          <p>
            If you don't have the Veteran's DD Form 214, you can request it
            from the National Personnel Records Center (NPRC) at{' '}
            <a href="https://www.archives.gov/veterans/military-service-records">
              archives.gov/veterans/military-service-records
            </a>{' '}
            or call 1-86-NARA-NARA.
          </p>
        </div>
      </va-alert>

      <h2>Eligibility</h2>
      <p>
        VA may issue a burial flag for Veterans who served in the U.S. Armed
        Forces and were discharged under conditions other than dishonorable.
        This includes certain members of the Selected Reserve and some
        Veterans of the Philippine military.
      </p>

      <SaveInProgressIntro
        formConfig={formConfig}
        pageList={pageList}
        headingLevel={2}
        messages={formConfig.saveInProgress.messages}
        prefillEnabled={formConfig.prefillEnabled}
        downtime={formConfig.downtime}
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