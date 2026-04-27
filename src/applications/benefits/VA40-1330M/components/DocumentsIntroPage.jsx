import React from 'react';
import PropTypes from 'prop-types';

const DocumentsIntroPage = ({ formData, goForward }) => {
  const isActiveDuty = formData?.serviceStatusAtDeath === 'activeDuty';

  return (
    <div>
      <h3>Documents you will need to upload</h3>
      <p>
        Based on your answers, you will need to upload the following documents
        to complete your request.
      </p>

      {isActiveDuty ? (
        <div>
          <h4>Required documents for Active Duty</h4>
          <ul>
            <li>Official death certificate</li>
            <li>DD Form 1300 (Report of Casualty)</li>
          </ul>
        </div>
      ) : (
        <div>
          <h4>
            {`Required documents for National Guard or Reserve`}
          </h4>
          <ul>
            <li>Official death certificate</li>
            <li>NGB Form 22 or equivalent Guard/Reserve service record</li>
          </ul>
        </div>
      )}

      <va-additional-info
        trigger="What if I don't have these documents yet?"
        uswds
      >
        <p>
          You can save your progress and return to this form when you have the
          required documents. Use the Save and finish later option on any page
          to save your work.
        </p>
      </va-additional-info>

      <va-alert status="info" visible>
        <p slot="headline">You can save and return later</p>
        <p>
          If you do not have all your documents ready, you can save your
          progress and return when you have them.
        </p>
      </va-alert>

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