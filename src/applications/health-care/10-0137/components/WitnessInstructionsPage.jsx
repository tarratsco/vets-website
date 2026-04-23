import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { focusElement, scrollToTop } from 'platform/utilities/ui';

/**
 * Screen 11 — Informational witness instructions page (no form fields).
 * This is a CustomPage component that renders verbatim disqualifier language
 * from Part IV-B of the PDF inside a warning alert and accordion.
 */
export default function WitnessInstructionsPage({ goBack, goForward }) {
  useEffect(() => {
    scrollToTop();
    focusElement('h1');
  }, []);

  return (
    <div>
      <h1>Witness instructions</h1>

      <p>
        This advance directive requires two witnesses who are present when you
        sign. Please read these instructions carefully before your witnesses
        complete their sections.
      </p>

      <va-alert
        status="warning"
        visible
        class="vads-u-margin-bottom--4"
        aria-label="Witness disqualification requirements"
      >
        <h2 slot="headline">
          Who cannot serve as a witness
        </h2>
        <p>Neither witness may, to the witness' knowledge:</p>
        <ul>
          <li>
            Be named as a beneficiary in the patient's estate
          </li>
          <li>
            Be appointed as health care agent in this advance directive
          </li>
          <li>
            Be financially responsible for the patient's care
          </li>
          <li>
            Be the designated third party who has signed the VA Advance
            Directive form at the direction of the patient and in the patient's
            presence
          </li>
        </ul>
      </va-alert>

      <va-accordion>
        <va-accordion-item header="Full witness attestation requirements">
          <p>
            Each witness must personally confirm that they meet all of the
            following requirements at the time they sign:
          </p>
          <ol>
            <li>
              I personally witnessed this advance directive being signed by the
              patient (or by another person at the direction and in the presence
              of the patient).
            </li>
            <li>
              I was not directed by the patient to sign the VA Advance Directive
              form on their behalf.
            </li>
            <li>
              I am not appointed as Health Care Agent in this advance directive.
            </li>
            <li>
              I am not financially responsible for the care of the patient.
            </li>
            <li>
              To the best of my knowledge, I am not named as a beneficiary in
              the patient's estate.
            </li>
          </ol>
          <p>
            If a witness cannot truthfully confirm all five statements, they
            must not sign this advance directive.
          </p>
        </va-accordion-item>
      </va-accordion>

      <div className="vads-u-margin-top--4">
        <p>
          <strong>
            After you have reviewed these requirements, continue to have each
            witness complete their section.
          </strong>
        </p>
        <p>
          Both witnesses should be present or available to confirm their
          attestation. Each witness will need to provide their full name,
          address, and typed signature.
        </p>
      </div>

      <div className="form-progress-buttons vads-u-margin-top--4">
        <va-button
          text="Back"
          secondary
          onClick={goBack}
          aria-label="Go back to your signature page"
        />
        <va-button
          text="Continue to Witness 1"
          onClick={goForward}
          aria-label="Continue to Witness 1 signature"
        />
      </div>
    </div>
  );
}

WitnessInstructionsPage.propTypes = {
  goBack: PropTypes.func,
  goForward: PropTypes.func,
};