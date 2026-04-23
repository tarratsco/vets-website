import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const OMB_RES_BURDEN = 30;
const OMB_NUMBER = '2900-0556';
const OMB_EXP_DATE = '04/30/2027';

export const IntroductionPage = ({ route, userIdVerified, userLoggedIn }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle
        title="VA Advance Directive"
        subTitle="Durable Power of Attorney for Health Care and Living Will (VA Form 10-0137)"
      />

      <p className="vads-u-font-size--lg vads-u-font-family--serif vads-u-font-weight--normal vads-u-line-height--4">
        Use this form to document your health care preferences and, if you
        choose, appoint someone you trust to make health care decisions for you
        if you are ever unable to speak for yourself.
      </p>

      <va-alert status="info" visible class="vads-u-margin-bottom--4">
        <h2 slot="headline">This is an important legal document</h2>
        <p>
          This VA Advance Directive is valid at all VA health care facilities
          without notarization. If you need it to be legally binding outside VA,
          you may need to have it notarized separately. Take your time completing
          this form. You can save your progress and return at any time.
        </p>
      </va-alert>

      <h2>What this form covers</h2>
      <ul>
        <li>
          <strong>Part I:</strong> Your personal information
        </li>
        <li>
          <strong>Part II:</strong> Appointing a Health Care Agent (optional)
        </li>
        <li>
          <strong>Part III:</strong> Your Living Will — preferences for
          life-sustaining treatments and other care (optional)
        </li>
        <li>
          <strong>Part IV:</strong> Your signature and witness attestations
        </li>
      </ul>

      <va-additional-info trigger="What is an advance directive?">
        <p>
          An advance directive is a legal document that lets you record your
          health care wishes in advance. It guides medical professionals and
          family members when you can't speak for yourself due to illness or
          injury.
        </p>
        <p>
          This form includes two parts you can complete separately or together:
        </p>
        <ul>
          <li>
            A <strong>Durable Power of Attorney for Health Care</strong>, which
            lets you name someone to make decisions for you
          </li>
          <li>
            A <strong>Living Will</strong>, which lets you describe your
            preferences for specific treatments
          </li>
        </ul>
      </va-additional-info>

      <va-additional-info trigger="Who can complete this form?">
        <p>
          Any Veteran who receives care at VA health care facilities may
          complete this form. You must be at least 18 years old. You must be
          able to understand and communicate your health care preferences at the
          time you complete this form.
        </p>
      </va-additional-info>

      <va-additional-info trigger="What you'll need to complete this form">
        <ul>
          <li>Your VA-verified identity (sign in required)</li>
          <li>
            Contact information for anyone you want to appoint as your Health
            Care Agent (optional)
          </li>
          <li>
            Two witnesses who are present when you sign — neither witness can be
            your named Health Care Agent, a beneficiary of your estate, or
            financially responsible for your care
          </li>
        </ul>
      </va-additional-info>

      <va-additional-info trigger="Can't type your name or need accessibility help?">
        <p>
          If a physical impairment prevents you from completing this form
          digitally, please contact your VA care team for assistance. They can
          help you complete the paper form or provide other accommodations.
        </p>
        <p>
          You can also contact the VA at{' '}
          <va-telephone contact="8006982411" /> (TTY:{' '}
          <va-telephone contact="711" />
          ).
        </p>
      </va-additional-info>

      <h2>Privacy Act Statement</h2>
      <p>
        The information requested on this form is solicited under the authority
        of 38 C.F.R. §17.32. It is being collected to document your preferences
        for your health care in the event that you cannot speak for yourself
        anymore. The information you provide may be disclosed outside the VA as
        permitted by law. Possible disclosures include those that are described
        in the "routine uses" identified in the VA system of records 24VA10P2,
        Patient Medical Records-VA, published in the Federal Register in
        accordance with the Privacy Act of 1974.
      </p>

      {userLoggedIn && !userIdVerified && (
        <va-alert status="warning" visible class="vads-u-margin-bottom--4">
          <h2 slot="headline">Identity verification required</h2>
          <p>
            You need to verify your identity to complete this form. This form
            involves sensitive health information and requires a verified
            account.
          </p>
          <a href="/verify">Verify your identity</a>
        </va-alert>
      )}

      <SaveInProgressIntro
        headingLevel={2}
        prefillEnabled={formConfig.prefillEnabled}
        messages={formConfig.saveInProgress.messages}
        pageList={pageList}
        startText="Start your advance directive"
        unauthStartText="Sign in to start your advance directive"
        hideUnauthedStartLink={false}
        devOnly={{ forceShowFormControls: true }}
      />

      <p>
        <strong>OMB Control No. {OMB_NUMBER}</strong>
        <br />
        <strong>Estimated response time: {OMB_RES_BURDEN} minutes</strong>
        <br />
        <strong>OMB Expiration Date: {OMB_EXP_DATE}</strong>
      </p>
      <p>
        An agency may not conduct or sponsor, and a person is not required to
        respond to, a collection of information unless it displays a currently
        valid OMB control number. The OMB control number for this project is{' '}
        {OMB_NUMBER}, and it expires {OMB_EXP_DATE}. Public reporting burden
        for this collection of information is estimated to average{' '}
        {OMB_RES_BURDEN} minutes per respondent, per year, including the time
        for reviewing instructions and completing the form.
      </p>
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
      savedFormMessages: PropTypes.shape({}),
    }),
    pageList: PropTypes.array,
  }),
  userIdVerified: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  userIdVerified: isLOA3(state),
  userLoggedIn: isLoggedIn(state),
});

export default connect(mapStateToProps)(IntroductionPage);