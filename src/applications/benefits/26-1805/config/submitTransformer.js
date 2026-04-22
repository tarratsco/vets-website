/**
 * Submit transformer for VA Form 26-1805
 *
 * Maps the platform-forms-system form data shape to the vets-api
 * /v0/lgy/appraisal_requests expected payload format.
 *
 * Called by the form engine as `transformForSubmit(formConfig, form)`.
 */

/**
 * Removes undefined/null values from an object recursively.
 * @param {object} obj
 * @returns {object}
 */
function removeEmpty(obj) {
  if (obj === null || obj === undefined) return undefined;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(removeEmpty).filter(v => v !== undefined);

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const cleaned = removeEmpty(value);
    if (cleaned !== undefined && cleaned !== null && cleaned !== '') {
      acc[key] = cleaned;
    }
    return acc;
  }, {});
}

/**
 * Transform formData to vets-api payload.
 * @param {object} formConfig
 * @param {object} form - full Redux form state: { data, pages, ... }
 * @returns {string} - JSON string of the transformed payload
 */
export default function submitTransformer(formConfig, form) {
  const { data } = form;

  const {
    irrrlScreening,
    lenderInformation,
    veteranBorrowerInformation,
    loanTransactionType,
    propertyInformation,
    accessAndTiming,
  } = data;

  // Determine which conditional sections to include
  const propertyType = propertyInformation?.propertyType;
  const constructionType = propertyInformation?.constructionType;

  const propertyInformationPayload = {
    propertyAddress: propertyInformation?.propertyAddress,
    propertyType,
    constructionType,
    propertyDetails: propertyInformation?.propertyDetails,
    priorVaAppraisal: propertyInformation?.priorVaAppraisal,
    // Conditional sections — only include if the relevant page was shown
    ...(propertyType === 'condo' && {
      condoProjectDetails: propertyInformation?.condoProjectDetails,
    }),
    ...(propertyType === 'manufactured_home' && {
      manufacturedHomeDetails: propertyInformation?.manufacturedHomeDetails,
    }),
    ...(constructionType === 'proposed_new_construction' && {
      newConstructionDetails: propertyInformation?.newConstructionDetails,
    }),
  };

  // Map lenderType enum value back from display form (no transform needed — stored as enum value)
  const payload = {
    formId: '26-1805',
    irrrlScreening: {
      loanTransactionPreScreen: irrrlScreening?.loanTransactionPreScreen,
      irrrlAppraisalRequired: irrrlScreening?.irrrlAppraisalRequired,
    },
    lenderInformation: {
      lenderName: lenderInformation?.lenderName,
      vaLenderID: lenderInformation?.vaLenderID,
      lenderType: lenderInformation?.lenderType,
      lenderAddress: lenderInformation?.lenderAddress,
      lenderPOCName: lenderInformation?.lenderPOCName,
      lenderPOCPhone: lenderInformation?.lenderPOCPhone,
      lenderPOCEmail: lenderInformation?.lenderPOCEmail,
    },
    veteranBorrowerInformation: {
      veteranFullName: veteranBorrowerInformation?.veteranFullName,
      veteranSSN: veteranBorrowerInformation?.veteranSSN,
      veteranDOB: veteranBorrowerInformation?.veteranDOB,
      coeNumber: veteranBorrowerInformation?.coeNumber || null,
      survivingSpouse: veteranBorrowerInformation?.survivingSpouse,
    },
    loanTransactionType: {
      transactionType: loanTransactionType?.transactionType,
      estimatedValue: loanTransactionType?.estimatedValue,
      loanFeatures: loanTransactionType?.loanFeatures,
    },
    propertyInformation: propertyInformationPayload,
    accessAndTiming: {
      propertyAccessContact: accessAndTiming?.propertyAccessContact,
      appraisalTiming: accessAndTiming?.appraisalTiming,
    },
    lenderAttestation: {
      attestationAccepted: true,
    },
  };

  return JSON.stringify(removeEmpty(payload));
}