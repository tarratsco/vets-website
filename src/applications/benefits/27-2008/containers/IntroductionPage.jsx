import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Apply for a burial flag';
const SUBTITLE = 'VA Form 27-2008';

const OMB_RES_BURDEN = 15;
const OMB_NUMBER = '2900-0013';
const OMB_EXP_DATE = '05/31/2027';

export default function IntroductionPage({ route }) {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <p className="vads-u-font-size--lg">
        Use this form to apply for a United States burial flag to drape over
        the casket, urn, or place of interment of a deceased Veteran.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">What to know before you apply</h2>
        <div>
          <p>
            You may be eligible to receive a burial flag if you are the
            next-of-kin, a funeral director, a Veterans Service Organization
            (VSO) representative, or a close friend of the Veteran with no
            living next-of-kin available.
          </p>
          <p>
            Only one flag may be issued for each deceased Veteran.
          </p>
        </div>
      </va-alert>

      <h2 className="vads-u-margin-top--3">What you'll need to apply</h2>
      <ul>
        <li>
          The Veteran's DD Form 214 (Certificate of Release or Discharge from
          Active Duty) or other official discharge documentation
        </li>
        <li>The Veteran's Social Security Number or VA file number (optional)</li>
        <li>Dates of the Veteran's military service</li>
        <li>Date and place of burial</li>
        <li>Name and address of the person who will receive the flag</li>
      </ul>

      <h2>Who can apply</h2>
      <p>Any of the following may apply:</p>
      <ul>
        <li>Next-of-kin (surviving spouse, child, parent, sibling, or other relative)</li>
        <li>Funeral director or funeral home representative</li>
        <li>Veterans Service Organization (VSO) representative or other authorized representative</li>
        <li>Close friend of the Veteran when no next-of-kin is available</li>
      </ul>

      <p>
        <strong>Note:</strong> You can complete this form without signing in to
        VA.gov. However, signing in lets you save your progress and pre-fill
        some information from your VA profile.
      </p>

      <SaveInProgressIntro
        formConfig={formConfig}
        pageList={pageList}
        startText="Start your application"
        unauthStartText="Start your application without signing in"
        messages={formConfig.saveInProgress.messages}
        prefillEnabled={formConfig.prefillEnabled}
        downtime={formConfig.downtime}
        devOnly={{ forceShowFormControls: true }}
      />

      <p className="vads-u-margin-top--4">
        <strong>OMB Control No. {OMB_NUMBER}</strong>
        <br />
        <strong>Respondent Burden:</strong> {OMB_RES_BURDEN} minutes
        <br />
        <strong>Expiration Date:</strong> {OMB_EXP_DATE}
      </p>
      <p>
        <a href="https://www.va.gov/find-forms/about-form-27-2008/">
          Download VA Form 27-2008 (PDF)
        </a>{' '}
        if you prefer to submit by mail or in person.
      </p>
    </article>
  );
}

IntroductionPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.shape({
      prefillEnabled: PropTypes.bool,
      saveInProgress: PropTypes.shape({
        messages: PropTypes.object,
      }),
      downtime: PropTypes.object,
    }),
    pageList: PropTypes.array,
  }),
};