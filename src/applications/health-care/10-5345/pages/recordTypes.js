/**
 * @module pages/recordTypes
 * @description Select categories of health information to be released
 */
import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const GENERAL_RECORD_OPTIONS = {
  clinicalNotes: 'Clinical notes and progress notes',
  labResults: 'Laboratory test results',
  imagingRadiology: 'Imaging and radiology reports and images',
  medicationHistory: 'Medication history and prescription records',
  dischargeSummaries: 'Discharge and transfer summaries',
  operativeReports: 'Operative and procedure reports',
  pathologyReports: 'Pathology reports',
  consultationReports: 'Consultation and referral reports',
  immunizationRecords: 'Immunization and vaccination records',
  vitalSigns: 'Vital signs and biometric measurements',
};

const SENSITIVE_RECORD_OPTIONS = {
  hivAidsRecords: 'HIV/AIDS test results and treatment records',
  geneticInformation: 'Genetic test results and genetic counseling notes',
  substanceUseTreatment:
    'Substance use disorder / drug and alcohol treatment records (42 CFR Part 2)',
  psychotherapyNotes:
    'Psychotherapy process notes (45 CFR 164.508(a)(2))',
};

export const recordTypesUiSchema = {
  'ui:title': 'Types of records to release',
  recordTypes: {
    'ui:title': 'Select the categories of health information to be released',
    'ui:description':
      'Select all that apply. You must select at least one record type. Note: Some record types have additional legal requirements and will require acknowledgment on the next screen.',
    ...checkboxGroupUI({
      title: 'General health records',
      labels: GENERAL_RECORD_OPTIONS,
    }),
    'view:sensitiveHeader': {
      'ui:title': 'Sensitive record types',
      'ui:description': () => (
        <va-alert status="warning" visible>
          <span slot="headline">
            Special notice regarding sensitive record types
          </span>
          <p>
            The following record types have additional legal protections.
            Selecting these types will require you to acknowledge special
            requirements on the next screen.
          </p>
          <p>
            <strong>
              Substance use disorder records (42 CFR Part 2) and psychotherapy
              process notes (45 CFR 164.508(a)(2)) cannot be released using
              this form.
            </strong>{' '}
            You will be informed of this and asked to deselect these types
            before proceeding.
          </p>
        </va-alert>
      ),
    },
    ...checkboxGroupUI({
      title: 'Sensitive health records',
      labels: SENSITIVE_RECORD_OPTIONS,
    }),
    otherDescription: {
      'ui:title': 'Describe other records (required if "Other" is selected)',
      'ui:widget': 'textarea',
      'ui:options': {
        expandUnder: 'other',
        rows: 3,
      },
      'ui:required': formData =>
        formData?.recordTypes?.other === true,
    },
  },
};

export const recordTypesSchema = {
  type: 'object',
  properties: {
    recordTypes: {
      type: 'object',
      properties: {
        clinicalNotes: { type: 'boolean' },
        labResults: { type: 'boolean' },
        imagingRadiology: { type: 'boolean' },
        medicationHistory: { type: 'boolean' },
        dischargeSummaries: { type: 'boolean' },
        operativeReports: { type: 'boolean' },
        pathologyReports: { type: 'boolean' },
        consultationReports: { type: 'boolean' },
        immunizationRecords: { type: 'boolean' },
        vitalSigns: { type: 'boolean' },
        substanceUseTreatment: { type: 'boolean' },
        psychotherapyNotes: { type: 'boolean' },
        hivAidsRecords: { type: 'boolean' },
        geneticInformation: { type: 'boolean' },
        other: { type: 'boolean' },
        otherDescription: {
          type: 'string',
          maxLength: 200,
        },
      },
    },
  },
};