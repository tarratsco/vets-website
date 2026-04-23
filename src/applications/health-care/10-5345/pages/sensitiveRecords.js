/**
 * @module pages/sensitiveRecords
 * @description Sensitive record acknowledgments — HIPAA/42 CFR Part 2 notices
 * Conditional — shown only when sensitive record types are selected
 */
import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const sensitiveRecordsUiSchema = {
  'ui:title': 'Sensitive record types — important notices',
  sensitiveRecordsAcknowledgment: {
    'ui:title': 'Review and acknowledge sensitive record type notices',
    'ui:description': () => (
      <div>
        <va-alert status="warning" visible>
          <h2 slot="headline">
            Some record types you selected require special handling
          </h2>
          <div>
            <p>
              You have selected one or more sensitive record types. Please read
              the following notices carefully and indicate your understanding.
            </p>

            <h3>
              Substance use disorder records (42 CFR Part 2) — CANNOT be
              released on this form
            </h3>
            <p>
              Federal law (42 CFR Part 2) requires a separate, specialized
              authorization to release substance use disorder treatment records.
              These records{' '}
              <strong>cannot be released using VA Form 10-5345</strong>. You
              must deselect this record type before submitting this form. To
              request these records, contact your VA Medical Center's ROI office
              for the appropriate form.
            </p>

            <h3>
              Psychotherapy process notes (45 CFR 164.508(a)(2)) — CANNOT be
              released on this form
            </h3>
            <p>
              HIPAA regulations require a separate authorization specifically
              for psychotherapy process notes (session notes written by a mental
              health professional for their own use). These records{' '}
              <strong>cannot be released using VA Form 10-5345</strong>. You
              must deselect this record type before submitting. General mental
              health progress notes (as opposed to psychotherapy process notes)
              may be releasable — contact your ROI office for guidance.
            </p>

            <h3>HIV/AIDS records</h3>
            <p>
              HIV/AIDS test results and treatment records have special
              protections under many state laws. By including these records in
              your authorization, you are acknowledging that you understand the
              potential privacy implications of their release.
            </p>

            <h3>Genetic information (GINA)</h3>
            <p>
              Genetic test results and counseling notes are protected under the
              Genetic Information Nondiscrimination Act (GINA). By including
              these records, you acknowledge the potential implications of
              disclosing genetic information.
            </p>
          </div>
        </va-alert>
      </div>
    ),
    substanceUseDeclined: {
      'ui:title':
        'I understand that substance use disorder records under 42 CFR Part 2 cannot be released on this form. I will remove this record type from my selection.',
      'ui:widget': 'checkbox',
      'ui:required': formData =>
        formData?.recordTypes?.substanceUseTreatment === true,
    },
    psychotherapyDeclined: {
      'ui:title':
        'I understand that psychotherapy process notes cannot be released on this form. I will remove this record type from my selection.',
      'ui:widget': 'checkbox',
      'ui:required': formData =>
        formData?.recordTypes?.psychotherapyNotes === true,
    },
    hivAidsAcknowledged: {
      'ui:title':
        'I acknowledge the privacy implications of releasing my HIV/AIDS records and consent to their release.',
      'ui:widget': 'checkbox',
      'ui:required': formData =>
        formData?.recordTypes?.hivAidsRecords === true,
    },
    geneticInformationAcknowledged: {
      'ui:title':
        'I acknowledge the implications of releasing my genetic information under GINA and consent to its release.',
      'ui:widget': 'checkbox',
      'ui:required': formData =>
        formData?.recordTypes?.geneticInformation === true,
    },
  },
};

export const sensitiveRecordsSchema = {
  type: 'object',
  properties: {
    sensitiveRecordsAcknowledgment: {
      type: 'object',
      properties: {
        substanceUseDeclined: { type: 'boolean' },
        psychotherapyDeclined: { type: 'boolean' },
        hivAidsAcknowledged: { type: 'boolean' },
        geneticInformationAcknowledged: { type: 'boolean' },
      },
    },
  },
};