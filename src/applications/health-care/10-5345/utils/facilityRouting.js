/**
 * Utility functions for VA facility routing logic
 */

/**
 * Returns the primary enrolled facility from MPI/profile data.
 * Used to pre-populate the facility selector.
 *
 * @param {object} state - Redux state
 * @returns {{ facilityId: string, facilityName: string } | null}
 */
export const getPrimaryEnrolledFacility = state => {
  const facilities =
    state?.user?.profile?.facilities || [];

  if (!facilities.length) {
    return null;
  }

  // The primary enrolled facility is typically the first in the list
  const primary = facilities[0];

  return {
    facilityId: primary.facilityId || primary.stationId || '',
    facilityName: primary.facilityName || primary.name || '',
    isPrimary: true,
  };
};

/**
 * Formats a VA facility for display.
 *
 * @param {{ facilityId: string, facilityName: string }} facility
 * @returns {string}
 */
export const formatFacilityLabel = facility => {
  if (!facility) return '';
  const { facilityId, facilityName } = facility;
  return facilityId
    ? `${facilityName} (${facilityId})`
    : facilityName;
};