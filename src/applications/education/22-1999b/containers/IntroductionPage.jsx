import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

import { TITLE, SUBTITLE } from '../constants';

const OMB_RES_BURDEN = 20;
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

      <p className="vads-u-font-size--lg">
        Use this form if you are a School Certifying Official (SCO) to report
        an enrollment change or termination for a student using GI Bill
        education benefits.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">Before you begin</h2>
        <p>
          You must be signed in as a School Certifying Official to use this
          form. Have your VA Facility Code and the original VA Form 22-1999
          certification details ready before you start.
        </p>
      </va-alert>

      <h2>What this form does</h2>
      <p>
        VA Form 22-1999b lets you report changes to a student&apos;s enrollment
        that affect their GI Bill benefits, including:
      </p>
      <ul>
        <li>Full termination of enrollment</li>
        <li>Withdrawal from one or more courses</li>
        <li>Reduction in credit hours</li>
        <li>Corrections to a previously submitted VA Form 22-1999</li>
      </ul>

      <h2>What you need to complete this form</h2>
      <va-process-list>
        <va-process-list-item header="Your institution information">
          Your VA Facility Code (8-digit number assigned by VA). Your
          institution name and address will be pre-filled from VA records.
        </va-process-list-item>
        <va-process-list-item header="Student information">
          The student&apos;s full name and Social Security number or VA File
          Number. The GI Bill benefit chapter they are using.
        </va-process-list-item>
        <va-process-list-item header="Original certification details">
          The enrollment dates, credit hours, and enrollment type from the
          original VA Form 22-1999 you are amending.
        </va-process-list-item>
        <va-process-list-item header="Change details">
          The type of change, the effective date, and the reason for the
          change. Supporting documentation may be required for corrections.
        </va-process-list-item>
      </va-process-list>

      <SaveInProgressIntro
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your enrollment change certification"
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
        messages: PropTypes.object,
      }),
    }),
    pageList: PropTypes.array,
  }).isRequired,
};

export default IntroductionPage;