import React from 'react';

/**
 * Alert shown at the top of the Personal Information page
 * when data has been pre-filled from VA Profile.
 */
export default function PrefillAlert() {
  return (
    <va-alert status="info" visible class="vads-u-margin-bottom--4">
      <h3 slot="headline">We've prefilled some of your information</h3>
      <p>
        We've prefilled some of your information from your VA profile. If any
        information looks incorrect, you can update it on this screen. Changes
        made here will not update your VA profile — to update your profile, go
        to{' '}
        <a href="https://www.va.gov/profile" target="_blank" rel="noreferrer">
          va.gov/profile
        </a>
        .
      </p>
    </va-alert>
  );
}