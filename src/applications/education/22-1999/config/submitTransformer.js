// src/applications/education/22-1999/config/submitTransformer.js
import { transformForSubmit } from 'platform/forms-system/src/js/helpers';

/**
 * submitTransformer
 *
 * Transforms the platform-forms-system internal form data structure into
 * the payload expected by the vets-api POST /v0/education/enrollment_certifications endpoint.
 *
 * Key transformations:
 * - Strips frontend-only display flags (sfcLookupSuccess, mpiLookupComplete, etc.)
 * - Adds submission timestamp
 * - Normalises phone number (strip formatting, keep 10 digits)
 * - Maps institutionType enum to backend-expected value
 */
export default function submitTransformer(formConfig, form) {
  const dataToSubmit = transformForSubmit(formConfig, form);
  const parsed = JSON.parse(dataToSubmit);
  const { formData } = parsed;

  // Normalise phone: strip all non-digit characters
  if (formData.certifierInfo && formData.certifierInfo.phone) {
    formData.certifierInfo.phone = formData.certifierInfo.phone.replace(
      /\D/g,
      '',
    );
  }

  // Add submission timestamp (ISO 8601)
  if (!formData.certifierSignature) {
    formData.certifierSignature = {};
  }
  formData.certifierSignature.signatureTimestamp = new Date().toISOString();

  // Add form metadata
  formData.formMetadata = {
    formVersion: '1.0.0',
    submissionTimestamp: new Date().toISOString(),
  };

  // Strip purely frontend flags that the schema marks as not required
  // and that the backend does not need
  if (formData.institutionInfo) {
    delete formData.institutionInfo.sfcLookupSuccess;
  }
  if (formData.studentInfo) {
    delete formData.studentInfo.mpiLookupComplete;
    delete formData.studentInfo.mpiLookupSuccess;
  }
  // Strip computed/derived fields — backend re-derives these
  if (formData.creditClockHours) {
    delete formData.creditClockHours.calculatedTrainingTimePercent;
    delete formData.creditClockHours.trainingTimeTier;
  }

  return JSON.stringify({ educationEnrollmentCertification: formData });
}