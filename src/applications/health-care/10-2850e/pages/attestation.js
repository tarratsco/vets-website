import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ATTESTATION_LABELS = {
  certifiesAccuracy:
    'I certify that the information I have provided in this application is true, accurate, and complete to the best of my knowledge and belief. I understand that any false, fictitious, or fraudulent statement or representation on this application may be grounds for not hiring me or, if I am hired, for dismissal from my VA position.',
  authorizesBackgroundInvestigation:
    'I authorize the Department of Veterans Affairs and its authorized agents to conduct a background investigation, including a National Agency Check with Inquiries (NACI) or equivalent investigation, and to verify any information I have provided on this application through primary source verification with licensing boards, employers, educational institutions, and other relevant entities.',
  authorizesReleaseOfInformation:
    'I authorize all persons, employers, licensing boards, educational institutions, professional references, insurance companies, and government agencies referenced in this application to release any information requested in connection with my application for VA employment, credentialing, or clinical privileging.',
  acknowledgesNpdbQuery:
    'I understand that the Department of Veterans Affairs is required to query the National Practitioner Data Bank (NPDB) in connection with this application for appointment and at each subsequent reappointment, and that the results of those queries will be reviewed by the VA credentialing authority.',
};

const ATTESTATION_KEYS = Object.keys(ATTESTATION_LABELS);

export const attestationUiSchema = {
  attestation: {
    'ui:title': 'Attestation and electronic signature',
    attestationCheckboxes: checkboxGroupUI({
      title: 'Please read and confirm each of the following statements',
      hint: 'You must check all boxes to submit your application.',
      required: true,
      labels: ATTESTATION_LABELS,
      errorMessages: {
        required: 'You must confirm all attestation statements to submit.',
      },
    }),
    electronicSignatureName: textUI({
      title: 'Type your full legal name to sign this application electronically',
      hint: 'By typing your name, you are signing this application with a legally valid electronic signature. Enter your name exactly as you entered it in the Personal Information section.',
      errorMessages: {
        required: 'Please enter your full legal name as your electronic signature.',
      },
    }),
    signatureDate: currentOrPastDateUI({
      title: 'Date of signature',
      errorMessages: {
        required: 'Please enter the date of your signature.',
        futureDate: 'Signature date cannot be in the future.',
      },
    }),
  },
};

export const attestationSchema = {
  type: 'object',
  required: ['attestation'],
  properties: {
    attestation: {
      type: 'object',
      required: [
        'attestationCheckboxes',
        'electronicSignatureName',
        'signatureDate',
      ],
      properties: {
        attestationCheckboxes: checkboxGroupSchema(ATTESTATION_KEYS),
        electronicSignatureName: {
          type: 'string',
          minLength: 2,
          maxLength: 150,
        },
        signatureDate: currentOrPastDateSchema,
      },
    },
  },
};