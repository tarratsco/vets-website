// src/applications/education/22-1999/config/prefillTransformer.js
/**
 * prefillTransformer
 *
 * Maps the authenticated user's identity profile data from the platform
 * prefill response into the certifierInfo chapter fields.
 *
 * The authenticated user is a School Certifying Official, not the student/Veteran.
 * Prefill sources: Login.gov / ID.me authenticated session user object.
 */
export default function prefillTransformer(pages, formData, metadata, state) {
  const { userProfile } = state.user || {};
  const { userFullName = {}, email = '' } = userProfile || {};

  const prefilled = {
    ...formData,
    certifierInfo: {
      ...formData.certifierInfo,
      firstName: userFullName.first || '',
      lastName: userFullName.last || '',
      email: email || '',
    },
  };

  return {
    pages,
    formData: prefilled,
    metadata,
  };
}