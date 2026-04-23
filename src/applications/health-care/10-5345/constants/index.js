/**
 * Application constants for VA Form 10-5345
 */

export const TITLE =
  'Request for and Authorization to Release Medical Records or Health Information';

export const SUBTITLE = 'VA Form 10-5345';

export const FORM_ID = '10-5345';

export const TRACKING_PREFIX = 'health-records-release-10-5345-';

export const ROOT_URL = '/health-records/release-information';

export const SUBMIT_URL_PATH = '/v0/form10_5345';

/** Requestor types */
export const REQUESTOR_TYPES = {
  VETERAN: 'veteran',
  LEGAL_GUARDIAN: 'legal_guardian',
  HEALTHCARE_POA: 'healthcare_poa',
  PERSONAL_REPRESENTATIVE: 'personal_representative',
  FIDUCIARY: 'fiduciary',
  VSO: 'vso',
  SURVIVING_FAMILY: 'surviving_family',
};

/** Record date range types */
export const DATE_RANGE_TYPES = {
  SPECIFIC_DATES: 'specific_dates',
  FIRST_TREATMENT_TO_PRESENT: 'first_treatment_to_present',
};

/** Authorization expiration types */
export const EXPIRATION_TYPES = {
  SPECIFIC_DATE: 'specific_date',
  EXPIRATION_EVENT: 'expiration_event',
};

/** Sensitive record types that require special handling */
export const SENSITIVE_RECORD_TYPES = [
  'substanceUseTreatment',
  'psychotherapyNotes',
  'hivAidsRecords',
  'geneticInformation',
];

/** Record types that CANNOT be released on this form */
export const PROHIBITED_RECORD_TYPES = [
  'substanceUseTreatment',
  'psychotherapyNotes',
];

/** Delivery format options */
export const DELIVERY_FORMATS = {
  PAPER: 'paper',
  CD_DVD: 'cd_dvd',
  ELECTRONIC_SECURE_EMAIL: 'electronic_secure_email',
  FAX: 'fax',
};