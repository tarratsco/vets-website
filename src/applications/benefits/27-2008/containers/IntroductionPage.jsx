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
        title="Apply for a burial flag"
        subTitle="VA Form 27-2008"
      />

      <p className="vads-u-font-size--lg">
        Use this form to apply for a United States flag for burial purposes for
        a deceased Veteran or reservist who meets the eligibility criteria.
      </p>

      <va-alert status="info" uswds>
        <h2 slot="headline">Before you fill out this form</h2>
        <p>
          Gather the following information before you start:
        </p>
        <ul>
          <li>
            The Veteran's DD Form 214 (Certificate of Release or Discharge from
            Active Duty) or other discharge documentation
          </li>
          <li>The Veteran's Social Security Number or VA file number</li>
          <li>Dates of service (entry and release from active duty)</li>
          <li>Date and place of burial</li>
          <li>
            Name and address of the person who will receive the flag
          </li>
        </ul>
      </va-alert>

      <h2>Who can apply</h2>
      <p>
        You can apply if you are the next-of-kin (surviving spouse, child,
        parent, sibling, or other relative), a funeral director, a Veterans
        Service Organization (VSO) representative, or a close friend of the
        Veteran with no living next-of-kin.
      </p>

      <h2>Eligibility</h2>
      <p>
        A burial flag may be furnished to memorialize a Veteran who was
        discharged under conditions other than dishonorable. The flag is
        furnished to honor the memory of a Veteran's military service.
      </p>

      <va-process-list uswds>
        <va-process-list-item header="Prepare">
          Gather the Veteran's discharge documentation (DD Form 214), service
          dates, and information about the person who will receive the flag.
        </va-process-list-item>
        <va-process-list-item header="Apply">
          Complete this online form. You can save your progress and return
          later if you need to gather more information.
        </va-process-list-item>
        <va-process-list-item header="VA reviews your application">
          VA will review the application and discharge documentation to confirm
          eligibility. If we need additional information, we will contact you.
        </va-process-list-item>
        <va-process-list-item header="Receive the flag">
          If eligible, the burial flag will be issued through the National
          Cemetery Administration (NCA) Field Programs office.
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your application"
        unauthStartText="Start your application without signing in"
        hideUnauthedStartLink={false}
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
      saveInProgress: PropTypes.shape({
        messages: PropTypes.shape({}),
      }),
    }),
    pageList: PropTypes.array,
  }),
};

export default IntroductionPage;