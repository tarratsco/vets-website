import PropTypes from 'prop-types';
import React from 'react';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import { useFeatureToggle } from 'platform/utilities/feature-toggles';

import formConfig from '../config/form';

export default function App({ location, children }) {
  const { useToggleValue, useToggleLoadingValue, TOGGLE_NAMES } =
    useFeatureToggle();

  const isLoadingFeatures = useToggleLoadingValue();
  const formEnabled = useToggleValue(
    TOGGLE_NAMES.advanceDirective10_0137Enabled,
  );

  if (isLoadingFeatures) {
    return (
      <div className="vads-u-margin-y--5">
        <va-loading-indicator
          label="Loading"
          message="Loading your advance directive form..."
          set-focus
        />
      </div>
    );
  }

  if (formEnabled === false) {
    return (
      <div className="vads-u-margin-y--5">
        <va-alert status="info" visible>
          <h2 slot="headline">Online form not yet available</h2>
          <p>
            The online VA Advance Directive form is not yet available. You can{' '}
            <a href="https://www.va.gov/find-forms/about-form-10-0137/">
              download VA Form 10-0137 (PDF)
            </a>{' '}
            to complete on paper.
          </p>
        </va-alert>
      </div>
    );
  }

  return (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};