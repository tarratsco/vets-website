import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLOA3, isLoggedIn } from 'platform/user/selectors';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

const TITLE =
  'Request for and Authorization to Release Medical Records or Health Information';
const SUBTITLE = 'VA Form 10-5345';

const OMB_RES_BURDEN = 15;
const OMB_NUMBER = '2900-0003';
const OMB_EXP_DATE = '09/30/2026';

export const IntroductionPage = ({ route, userLoggedIn, userIdVerified }) => {
  const { formConfig, pageList } = route;

  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <article className="schemaform-intro">
      <FormTitle title={TITLE} subTitle={SUBTITLE} />

      <p className="vads-u-font-size--lg">
        Use this form to authorize VA to release your medical records or health
        information to yourself or a third party. This is a HIPAA authorization
        under 45 CFR 164.508.
      </p>

      <va-alert status="info" visible>
        <h2 slot="headline">
          This form does not cover all types of records
        </h2>
        <div>
          <p>
            <strong>This form cannot be used to release:</strong>
          </p>
          <ul>
            <li>
              Substance use disorder treatment records protected under 42 CFR
              Part 2 (requires a separate, specialized authorization)
            </li>
            <li>
              Psychotherapy process notes (requires a separate authorization
              under 45 CFR 164.508(a)(2))
            </li>
          </ul>
          <p>
            If you need to release records for a VA disability compensation
            claim, use VA Form 21-4142 instead.
          </p>
        </div>
      </va-alert>

      <h2>What you'll need to complete this form</h2>
      <ul>
        <li>Veteran's full legal name</li>
        <li>Veteran's date of birth</li>
        <li>Last 4 digits of the Veteran's Social Security number</li>
        <li>
          The name and location of the VA Medical Center(s) holding the records
        </li>
        <li>
          If submitting on behalf of a Veteran: legal authorization documents
          (e.g., guardianship order, healthcare power of attorney)
        </li>
      </ul>

      <h2>What happens after you submit</h2>
      <p>
        Your authorization will be routed to the Release of Information (ROI)
        office at the VA Medical Center(s) you identify. Standard processing
        time is 20–30 business days. Urgent requests may be processed sooner.
      </p>

      <va-accordion>
        <va-accordion-item header="Your right to revoke this authorization">
          <p>
            You have the right to revoke this authorization at any time by
            submitting a written request to the VA Medical Center's Release of
            Information office. Revocation does not apply to disclosures already
            made in reliance on this authorization.
          </p>
        </va-accordion-item>
        <va-accordion-item header="How VA protects your health information">
          <p>
            VA protects your health information under HIPAA (45 CFR Parts 160
            and 164) and the Privacy Act (5 U.S.C. § 552a). Once your
            information is disclosed to a recipient outside VA, it may no longer
            be protected by federal privacy law.
          </p>
        </va-accordion-item>
      </va-accordion>

      {userLoggedIn ? (
        <SaveInProgressIntro
          headingLevel={2}
          prefillEnabled={formConfig.prefillEnabled}
          messages={formConfig.savedFormMessages}
          pageList={pageList}
          startText="Start the authorization form"
        />
      ) : (
        <va-alert status="continue" visible>
          <h2 slot="headline">Sign in to start your request</h2>
          <p>
            Sign in with your Login.gov or ID.me account to save your progress
            and pre-fill your information.
          </p>
          <va-button text="Sign in to start" />
        </va-alert>
      )}

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
    }),
    pageList: PropTypes.array,
  }).isRequired,
  userIdVerified: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  userLoggedIn: isLoggedIn(state),
  userIdVerified: isLOA3(state),
});

export default connect(mapStateToProps)(IntroductionPage);