import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Report an enrollment change';
const SUBTITLE = 'VA Form 22-1999b';

const OMB_RES_BURDEN = 20;
const OMB_NUMBER = '2900-XXXX';
const OMB_EXP_DATE = '12/31/2027';

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
        Use this form if you are a School Certifying Official (SCO) reporting a
        change to a previously submitted enrollment certification (VA Form
        22-1999) for a student using GI Bill education benefits.
      </p>

      <h2 className="vads-u-margin-top--3">
        What to know before you fill out this form
      </h2>

      <ul>
        <li>
          You must be signed in as an authenticated School Certifying Official
          to use this form.
        </li>
        <li>
          Have the original VA Form 22-1999 certification details available,
          including the certification dates, credit hours, and enrollment type.
        </li>
        <li>
          Report enrollment changes as soon as possible. Changes reported more
          than 30 days after the effective date may result in an overpayment for
          your student.
        </li>
        <li>
          You can report reductions in credit hours, partial withdrawals, full
          terminations of enrollment, or corrections to previously submitted
          certifications.
        </li>
      </ul>

      <h2>What information you'll need</h2>
      <ul>
        <li>Your VA Facility Code</li>
        <li>Your contact information (name, phone, email)</li>
        <li>The student's name and Social Security number or VA File Number</li>
        <li>
          The GI Bill benefit chapter under which the student was certified
        </li>
        <li>
          The original certification dates, credit hours, and enrollment type
        </li>
        <li>The effective date of the enrollment change</li>
        <li>The reason for the change</li>
      </ul>

      <va-alert status="info" uswds>
        <p slot="headline">
          If you currently use VAONCE to submit enrollment certifications
        </p>
        <p>
          VAONCE remains the primary system for enrollment certifications. This
          digital form provides an alternative submission path. Contact your VA
          Education Liaison Representative if you have questions about which
          system to use.
        </p>
      </va-alert>

      <SaveInProgressIntro
        headingLevel={2}
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
      savedFormMessages: PropTypes.shape({}),
      saveInProgress: PropTypes.shape({
        messages: PropTypes.shape({}),
      }),
    }),
    pageList: PropTypes.array,
  }).isRequired,
};

export default IntroductionPage;