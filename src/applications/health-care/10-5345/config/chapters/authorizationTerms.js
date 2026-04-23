import {
  authorizationExpirationUiSchema,
  authorizationExpirationSchema,
} from '../../pages/authorizationExpiration';
import {
  additionalInstructionsUiSchema,
  additionalInstructionsSchema,
} from '../../pages/additionalInstructions';
import {
  rightToRevokeUiSchema,
  rightToRevokeSchema,
} from '../../pages/rightToRevoke';

const authorizationTermsChapter = {
  title: 'Authorization Terms',
  pages: {
    authorizationExpiration: {
      path: 'authorization-expiration',
      title: 'Authorization expiration',
      uiSchema: authorizationExpirationUiSchema,
      schema: authorizationExpirationSchema,
    },
    additionalInstructions: {
      path: 'additional-instructions',
      title: 'Additional instructions',
      uiSchema: additionalInstructionsUiSchema,
      schema: additionalInstructionsSchema,
    },
    rightToRevoke: {
      path: 'right-to-revoke',
      title: 'Right to revoke',
      uiSchema: rightToRevokeUiSchema,
      schema: rightToRevokeSchema,
    },
  },
};

export default authorizationTermsChapter;