import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE = 'Request a Government Headstone or Marker';
const SUBTITLE = 'VA Form 40-1330M';

const OMB_RES_BURDEN = 30;
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

      <p className="vads-u-font-size--lg vads-u-font-family--serif vads-u-font-weight--normal vads-u-line-height--4">
        Use this form to request a standard government-furnished headstone or
        marker for an eligible active duty service member, or a qualifying
        National Guard or Reserve member who died in the line of duty.
      </p>

      <va-alert status="info" uswds>
        <h2 slot="headline">Before you begin</h2>
        <p>
          This form is for service members who died while on active duty, or
          qualifying National Guard or Reserve members. If the service member
          was discharged before death, use{' '}
          <a href="/find-forms/about-form-40-1330/">VA Form 40-1330</a> instead.
        </p>
      </va-alert>

      <h2 className="vads-u-margin-top--3">What you'll need to apply</h2>
      <ul>
        <li>The service member's Social Security number</li>
        <li>Military service information (branch, rank, service dates)</li>
        <li>Cemetery name, address, and contact information</li>
        <li>An official copy of the death certificate</li>
        <li>
          For active duty: DD Form 1300 (Report of Casualty) from the service
          branch
        </li>
        <li>
          For National Guard or Reserve: NGB Form 22 or equivalent service
          record
        </li>
      </ul>

      <h2>Eligibility</h2>
      <va-accordion uswds>
        <va-accordion-item header="Active duty service members" uswds>
          <p>
            A service member who died while on active duty in the Army, Navy,
            Air Force, Marine Corps, Space Force, or Coast Guard may be eligible
            for a government-furnished headstone or marker.
          </p>
        </va-accordion-item>
        <va-accordion-item
          header="National Guard and Reserve members"
          uswds
        >
          <p>
            A National Guard or Reserve member may be eligible if they died in
            the line of duty while on active duty for training, died in the line
            of duty while on inactive duty for training, or were entitled to
            retired pay at the time of death.
          </p>
        </va-accordion-item>
      </va-accordion>

      <SaveInProgressIntro
        formConfig={formConfig}
        pageList={pageList}
        startText="Start your request"
        unauthStartText="Sign in to start your request"
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
  }).isRequired,
};

export default IntroductionPage;