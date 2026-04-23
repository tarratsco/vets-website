/**
 * Maps VA Profile / MVI data from the Redux state into formData
 * for the pre-filled Part I fields.
 */
export function prefillTransformer(pages, formData, metadata, state) {
  const profile = state?.user?.profile || {};
  const { userFullName = {}, dob = '' } = profile;
  const vet360 = profile.vet360ContactInformation || {};
  const {
    mailingAddress = {},
    homePhone = null,
    workPhone = null,
    mobilePhone = null,
  } = vet360;

  const buildPhone = phoneObj => {
    if (!phoneObj) return '';
    const area = phoneObj.areaCode || '';
    const number = phoneObj.phoneNumber || '';
    return area && number ? `${area}${number}` : '';
  };

  const prefillData = {
    veteranFullName: {
      first: userFullName.first || '',
      middle: userFullName.middle || '',
      last: userFullName.last || '',
    },
    veteranDateOfBirth: dob || '',
    veteranAddress: {
      street: mailingAddress.addressLine1 || '',
      city: mailingAddress.city || '',
      state: mailingAddress.stateCode || '',
      zipCode: mailingAddress.zipCode || '',
    },
    veteranHomePhone: buildPhone(homePhone),
    veteranWorkPhone: buildPhone(workPhone),
    veteranMobilePhone: buildPhone(mobilePhone),
  };

  return {
    pages,
    formData: { ...formData, ...prefillData },
    metadata,
  };
}