import {
  textUI,
  textSchema,
  checkboxUI,
  checkboxSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const attestationUiSchema = {
  attestation: {
    'ui:title': 'Attestation and Electronic Signature',
    'ui:description':
      'Please read each statement carefully and check each box to confirm your agreement before signing.',
    certifiesAccuracy: checkboxUI({
      title:
        'I certify that the information I have provided in this application is true, accurate, and complete to the best of my knowledge and belief. I understand that any false, fictitious, or fraudulent statement or representation on this application may be grounds for not hiring me or, if I am hired, for dismissal from my VA position.',
      errorMessages: {
        required:
          'You must certify the accuracy of your application to submit.',
      },
    }),
    authorizesBackgroundInvestigation: checkboxUI({
      title:
        'I authorize the Department of Veterans Affairs and its authorized agents to conduct a background investigation, including a National Agency Check with Inquiries (NACI) or equivalent investigation, and to verify any information I have provided on this application through primary source verification with licensing boards, employers, educational institutions, and other relevant entities.',
      errorMessages: {
        required:
          'You must authorize the background investigation to submit.',
      },
    }),
    authorizesReleaseOfInformation: checkboxUI({
      title:
        'I authorize all persons, employers, licensing boards, educational institutions, professional references, insurance companies, and government agencies referenced in this application to release any information requested in connection with my application for VA employment, credentialing, or clinical privileging.',
      errorMessages: {
        required:
          'You must authorize the release of information to submit.',
      },
    }),
    acknowledgesNpdbQuery: checkboxUI({
      title:
        'I understand that the Department of Veterans Affairs is required to query the National Practitioner Data Bank (NPDB) in connection with this application for appointment and at each subsequent reappointment, and that the results of those queries will be reviewed by the VA credentialing authority.',
      errorMessages: {
        required:
          'You must acknowledge the NPDB query to submit.',
      },
    }),
    electronicSignatureName: textUI({
      title: 'Type your full legal name to sign this application electronically',
      hint:
        'By typing your name, you are signing this application with a legally valid electronic signature. Enter your name exactly as it appears on your professional license.',
      errorMessages: {
        required: 'Please enter your full legal name as your electronic signature.',
      },
    }),
    signatureDate: currentOrPastDateUI({
      title: 'Date of signature',
      hint: 'Enter today\'s date.',
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
        'certifiesAccuracy',
        'authorizesBackgroundInvestigation',
        'authorizesReleaseOfInformation',
        'acknowledgesNpdbQuery',
        'electronicSignatureName',
        'signatureDate',
      ],
      properties: {
        certifiesAccuracy: checkboxSchema,
        authorizesBackgroundInvestigation: checkboxSchema,
        authorizesReleaseOfInformation: checkboxSchema,
        acknowledgesNpdbQuery: checkboxSchema,
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