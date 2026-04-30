import { transformForSubmit } from 'platform/forms-system/src/js/helpers';

export function burialFlagTransform(formConfig, form) {
  const transformedData = transformForSubmit(formConfig, form);
  const formData = JSON.parse(transformedData);

  return JSON.stringify({
    burialFlagApplication: {
      veteranFirstName: formData.veteranInformation?.firstName,
      veteranMiddleName: formData.veteranInformation?.middleName,
      veteranLastName: formData.veteranInformation?.lastName,
      veteranMaidenOrOtherName: formData.veteranInformation?.maidenOrOtherName,
      vaFileNumber: formData.veteranInformation?.vaFileNumber,
      veteranSocialSecurityNumber: formData.veteranInformation?.socialSecurityNumber,
      militaryServiceNumber: formData.veteranInformation?.militaryServiceNumber,
      branchOfService: formData.serviceInformation?.branchOfService,
      dateEnteredActiveDuty: formData.serviceInformation?.dateEnteredActiveDuty,
      dateReleasedFromActiveDuty:
        formData.serviceInformation?.dateReleasedFromActiveDuty,
      veteranDateOfBirth: formData.veteranInformation?.dateOfBirth,
      veteranDateOfDeath: formData.veteranInformation?.dateOfDeath,
      dateOfBurial: formData.veteranInformation?.dateOfBurial,
      placeOfBurialCemeteryName:
        formData.veteranInformation?.placeOfBurialCemeteryName,
      placeOfBurialCity: formData.veteranInformation?.placeOfBurialCity,
      placeOfBurialState: formData.veteranInformation?.placeOfBurialState,
      documentationAvailable: formData.eligibility?.documentationAvailable,
      dischargeCharacter: formData.eligibility?.dischargeCharacter,
      reserveGuardCriteria: formData.eligibility?.reserveGuardCriteria,
      flagRecipientFullName: formData.flagRecipient?.recipientFullName,
      flagRecipientRelationship: formData.flagRecipient?.recipientRelationship,
      flagRecipientRelationshipOther:
        formData.flagRecipient?.recipientRelationshipOther,
      flagRecipientAddressLine1: formData.flagRecipient?.recipientAddressLine1,
      flagRecipientAddressLine2: formData.flagRecipient?.recipientAddressLine2,
      flagRecipientCity: formData.flagRecipient?.recipientCity,
      flagRecipientState: formData.flagRecipient?.recipientState,
      flagRecipientZip: formData.flagRecipient?.recipientZip,
      flagRecipientPhone: formData.flagRecipient?.recipientPhone,
      remarks: formData.remarks,
      applicantFirstName: formData.applicant?.firstName,
      applicantMiddleName: formData.applicant?.middleName,
      applicantLastName: formData.applicant?.lastName,
      applicantAddressLine1: formData.applicant?.addressLine1,
      applicantAddressLine2: formData.applicant?.addressLine2,
      applicantCity: formData.applicant?.city,
      applicantState: formData.applicant?.state,
      applicantZip: formData.applicant?.zip,
      applicantRelationshipToVeteran: formData.applicant?.relationshipToVeteran,
      applicantRelationshipOther: formData.applicant?.relationshipToVeteranOther,
      dateSigned: formData.dateSigned,
      applicantType: formData.applicantType,
      ineligibilityFlagged: formData.metadata?.ineligibilityFlagged,
      reserveGuardIneligibilityWarning:
        formData.metadata?.reserveGuardIneligibilityWarning,
      documentUploads: formData.documents?.dd214Upload,
    },
  });
}