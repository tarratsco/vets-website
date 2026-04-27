import React from 'react';
import PropTypes from 'prop-types';

export const DocumentsIntroPage = ({ formData, goForward }) => {
  const isActiveDuty = formData?.serviceStatusAtDeath === 'activeDuty';
  const isGuardReserve = formData?.serviceStatusAtDeath === 'guardOrReserve';

  return (
    <div>
      <h2>Documents you need to upload</h2>
      <p>
        Based on your answers, you will need to upload the following documents.
        You can save your progress and return later if you don't have them
        ready.
      </p>

      {isActiveDuty && (
        <va-alert status="info" uswds>
          <h3 slot="headline">Required documents for active duty</h3>
          <ul>
            <li>Official death certificate</li>
            <li>
              DD Form 1300 (Report of Casualty) — available from your Casualty
              Assistance Officer
            </li>
          </ul>
        </va-alert>
      )}

      {isGuardReserve && (
        <va-alert status="info" uswds>
          <h3 slot="headline">Required documents for National Guard or Reserve</h3>
          <ul>
            <li>Official death certificate</li>
            <li>
              NGB Form 22 or equivalent Guard/Reserve service record — available
              from your state Adjutant General office or Reserve unit
            </li>
          </ul>
        </va-alert>
      )}

      <va-accordion uswds>
        <va-accordion-item header="What if I don't have these documents yet?" uswds>
          <p>
            You can save your progress and return when you have the documents
            ready. Your information will be saved for 60 days.
          </p>
        </va-accordion-item>
        <va-accordion-item header="What file formats are accepted?" uswds>
          <p>
            We accept PDF, JPG, and PNG files up to 20 MB each. If you have a
            paper document, you can take a clear photo with your phone.
          </p>
        </va-accordion-item>
      </va-accordion>

      <div className="vads-u-margin-top--4">
        <va-button
          text="Continue"
          onClick={goForward}
          uswds
        />
      </div>
    </div>
  );
};

DocumentsIntroPage.propTypes = {
  formData: PropTypes.shape({
    serviceStatusAtDeath: PropTypes.string,
  }),
  goForward: PropTypes.func,
};

export default DocumentsIntroPage;