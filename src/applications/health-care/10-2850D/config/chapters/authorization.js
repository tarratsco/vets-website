import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const AUTH_LABELS = {
  authorizationInquiries:
    'I authorize VA to make lawful inquiries about me to current and previous employers, educational institutions, state licensing boards, professional liability insurance carriers, other professional organizations or persons, agencies, organizations, or institutions listed by me as references, and to any other sources which VA may deem appropriate or be referred by those contacted.',
  authorizationRelease:
    'I authorize lawful release of such information and copies of related records and documents to VA officials.',
  authorizationLiabilityRelease:
    'I release from liability all those who provide information to VA in good faith and without malice in response to such inquiries.',
  authorizationDisclose:
    'I authorize VA to lawfully disclose to such persons, employers, institutions, boards, or agencies identifying and other information about me to enable VA to make such inquiries.',
  authorizationShareAffiliated:
    'I authorize VA to lawfully share any information about me with the affiliated institution or training program official.',
};

export const authorizationUiSchema = {
  certification: {
    'ui:title': 'Authorization for release of information',
    'ui:description':
      'This authorization constitutes a separate electronic signature. Read each statement carefully before checking the box. This authorization allows VA to verify your credentials, background, and suitability for clinical training appointment.',
    authorizationClauses: checkboxGroupUI({
      title: 'Authorization for release of information',
      required: true,
      labels: AUTH_LABELS,
      errorMessages: {
        required:
          'You must acknowledge each authorization to submit your application.',
      },
    }),
  },
};

export const authorizationSchema = {
  type: 'object',
  properties: {
    certification: {
      type: 'object',
      required: ['authorizationClauses'],
      properties: {
        authorizationClauses: checkboxGroupSchema(Object.keys(AUTH_LABELS)),
      },
    },
  },
};
