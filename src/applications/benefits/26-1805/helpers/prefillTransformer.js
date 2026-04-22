/**
 * Prefill transformer for VA Form 26-1805
 *
 * Maps the prefill response from the vets-api (sourced from VA profile / MPI)
 * to the form data shape expected by platform-forms-system.
 *
 * This transformer handles the authenticated Veteran session case where
 * some Veteran borrower information may be pre-populated from the
 * authenticated user's VA profile.
 *
 * @param {object} pages - page list from formConfig
 * @param {object} formData - current form data
 * @param {object} metadata - prefill metadata from vets-api
 * @param {object} state - Redux state
 * @returns {{ formData: object, metadata: object }}
 */
export default function prefillTransformer(pages, formData, metadata, state) {
  // The prefill response from vets-api for LGY forms may include
  // Veteran identity information sourced from MPI.
  // Map it into the veteranBorrowerInformation structure.

  const prefilled = { ...formData };

  // If the API returns a top-level `veteran` object (MPI prefill shape),
  // map it into our nested schema structure.
  if (formData.veteran) {
    const { veteran } = formData;

    prefilled.veteranBorrowerInformation = {
      ...(prefilled.veteranBorrowerInformation || {}),
      veteranFullName: veteran.fullName || prefilled.veteranBorrowerInformation?.veteranFullName,
      veteranSSN: veteran.ssn || prefilled.veteranBorrowerInformation?.veteranSSN,
      veteranDOB: veteran.dob || prefilled.veteranBorrowerInformation?.veteranDOB,
    };

    // Remove the top-level veteran key — it's been mapped
    delete prefilled.veteran;
  }

  return {
    formData: prefilled,
    metadata,
  };
}