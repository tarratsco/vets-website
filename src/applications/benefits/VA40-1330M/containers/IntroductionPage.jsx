import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const ombInfo = {
  resBurden: '30',
  ombNumber: '2900-XXXX',
  expDate: '12/31/2026',
};

export const IntroductionPage = ({ route }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle
        title="Request a Government Headstone or Marker"
        subTitle="VA Form 40-1330M"
      />

      <p className="vads-u-font-size--lg">
        Use this form to request a government-furnished headstone or marker for
        a service member who died while on active duty, or a National Guard or
        Reserve member who died under qualifying circumstances.
      </p>

      <h2>What to know before you fill out this form</h2>
      <p>
        This form is for service members who died while on active duty or
        qualifying National Guard or Reserve service. If the service member was
        discharged before death, use VA Form 40-1330 instead.
      </p>

      <h3>Who can submit this request</h3>
      <ul>
        <li>Next of kin (family member)</li>
        <li>Funeral home director or staff member</li>
        <li>Cemetery official</li>
        <li>Personal representative or attorney-in-fact</li>
      </ul>

      <h3>What you&apos;ll need</h3>
      <p>
        Gather these documents before you start. You can save your progress and
        return later if you need to locate documents.
      </p>
      <ul>
        <li>Death certificate</li>
        <li>
          DD Form 1300 (Report of Casualty) — required for active duty
          submissions
        </li>
        <li>
          NGB Form 22 or equivalent — required for National Guard or Reserve
          submissions
        </li>
        <li>
          Authorization document if you are not the next of kin (funeral home,
          cemetery official, or personal representative)
        </li>
      </ul>

      <va-alert status="info" visible>
        <p slot="headline">Save your work as you go</p>
        <p>
          You can save your progress and finish later. You&apos;ll need to sign
          in to save your work.
        </p>
      </va-alert>

      <SaveInProgressIntro
        formConfig={formConfig}
        pageList={pageList}
        startText="Start your request"
        headingLevel={2}
        devOnly={{ forceShowFormControls: true }}
      />

      <va-omb-info
        res-burden={ombInfo.resBurden}
        omb-number={ombInfo.ombNumber}
        exp-date={ombInfo.expDate}
      />
    </article>
  );
};

IntroductionPage.propTypes = {
  route: PropTypes.shape({
    formConfig: PropTypes.shape({
      prefillEnabled: PropTypes.bool,
      savedFormMessages: PropTypes.shape({}),
    }),
    pageList: PropTypes.array,
  }),
};

export default IntroductionPage;