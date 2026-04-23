/**
 * Prefill transformer for VA Form 10-5345.
 * Maps VA Profile / MPI data into the form's data shape.
 *
 * @param {object} pages - form page definitions
 * @param {object} formData - existing saved form data (may be empty)
 * @param {object} metadata - SiP metadata
 * @param {object} state - Redux state (contains profile data)
 * @returns {{ pages, formData, metadata }}
 */
const prefillTransformer = (pages, formData, metadata, state) => {
  const profile = state?.user?.profile || {};
  const vapContactInfo = profile?.vapContactInfo || {};
  const userFullName = profile?.userFullName || {};
  const dob = profile?.dob || '';

  const address = vapContactInfo?.mailingAddress || {};
  const phone =
    vapContactInfo?.homePhone?.phoneNumber ||
    vapContactInfo?.mobilePhone?.phoneNumber ||
    '';
  const email = vapContactInfo?.email?.emailAddress || '';

  const prefillData = {
    ...formData,
    veteran: {
      ...(formData.veteran || {}),
      firstName: userFullName.first || formData?.veteran?.firstName || '',
      middleName: userFullName.middle || formData?.veteran?.middleName || '',
      lastName: userFullName.last || formData?.veteran?.lastName || '',
      dateOfBirth: dob || formData?.veteran?.dateOfBirth || '',
      address: {
        street: address.addressLine1 || '',
        street2: address.addressLine2 || '',
        city: address.city || '',
        state: address.stateCode || '',
        postalCode: address.zipCode || '',
        country: address.countryCodeIso3 || 'USA',
      },
      phone: phone.replace(/\D/g, '') || '',
      email: email || '',
    },
  };

  return { pages, formData: prefillData, metadata };
};

export default prefillTransformer;