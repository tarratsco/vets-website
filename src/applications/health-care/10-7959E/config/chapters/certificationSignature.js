import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaCheckboxField from 'platform/forms-system/src/js/web-component-fields/VaCheckboxField';

const federalWarningDescription = (
  <va-alert status="warning" visible uswds>
    <h3 slot="headline">Federal law warning</h3>
    <p className="vads-u-margin-y--0">
      Federal Laws (18 USC and 1001) provide for criminal penalties for
      knowingly submitting or making any false, fictitious, or fraudulent
      statements or claims.
    </p>
  </va-alert>
);

const releaseStatement = (
  <p>
    <strong>Release of Medical Information:</strong> Signature in this section
    authorizes the patient&apos;s providers to release medical record
    documentation related to the services associated with this claim. This
    consent pertains to all medical records, including records related to
    treatment for psychological and psychiatric conditions, drug and alcohol
    abuse, acquired immune deficiency syndrome, human immunodeficiency virus
    infection, and sickle cell disease.
  </p>
);

export const certificationSignatureUiSchema = {
  'ui:description': federalWarningDescription,
  'ui:objectViewField': releaseStatement,
  certification: {
    'ui:title': 'Certification and Signature (Section IV)',
    acknowledged: {
      'ui:title':
        'I certify that the above information and attachments are correct and represent actual services, dates, and fees charged.',
      'ui:webComponentField': VaCheckboxField,
      'ui:required': () => true,
      'ui:errorMessages': {
        required:
          'You must check this box to certify your claim before submitting.',
      },
    },
    signature: textUI({
      title: 'Your signature (type your full name)',
      hint:
        "The form states 'type if electronic.' Enter your full legal name as your electronic signature.",
      errorMessages: {
        required: 'Please enter your full name as your electronic signature.',
      },
    }),
    date: currentOrPastDateUI({
      title: 'Date',
      hint: 'Format: MM/DD/YYYY. Enter today\'s date.',
      errorMessages: {
        required: 'Please enter the date you are signing.',
        pattern: 'Please enter a valid date.',
        futureDate: 'The signature date cannot be a future date.',
      },
    }),
  },
};

export const certificationSignatureSchema = {
  type: 'object',
  required: ['certification'],
  properties: {
    certification: {
      type: 'object',
      required: ['acknowledged', 'signature', 'date'],
      properties: {
        acknowledged: {
          type: 'boolean',
        },
        signature: {
          type: 'string',
          minLength: 1,
          maxLength: 60,
        },
        date: currentOrPastDateSchema,
      },
    },
  },
};