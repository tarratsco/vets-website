import {
  requestorTypeUiSchema,
  requestorTypeSchema,
} from '../../pages/requestorType';
import {
  veteranIdentityUiSchema,
  veteranIdentitySchema,
} from '../../pages/veteranIdentity';
import {
  veteranContactUiSchema,
  veteranContactSchema,
} from '../../pages/veteranContact';
import {
  representativeInfoUiSchema,
  representativeInfoSchema,
} from '../../pages/representativeInfo';
import {
  representativeAuthUploadUiSchema,
  representativeAuthUploadSchema,
} from '../../pages/representativeAuthUpload';

const isRepresentative = formData => formData.requestorType !== 'veteran';

const requestorIdentityChapter = {
  title: 'Requestor Identity',
  pages: {
    requestorType: {
      path: 'requestor-type',
      title: 'Who is submitting this request?',
      uiSchema: requestorTypeUiSchema,
      schema: requestorTypeSchema,
    },
    veteranIdentity: {
      path: 'veteran-identity',
      title: 'Veteran identity',
      uiSchema: veteranIdentityUiSchema,
      schema: veteranIdentitySchema,
    },
    veteranContact: {
      path: 'veteran-contact',
      title: 'Veteran contact information',
      uiSchema: veteranContactUiSchema,
      schema: veteranContactSchema,
    },
    representativeInfo: {
      path: 'representative-info',
      title: 'Representative information',
      depends: isRepresentative,
      uiSchema: representativeInfoUiSchema,
      schema: representativeInfoSchema,
    },
    representativeAuthUpload: {
      path: 'representative-authorization-upload',
      title: 'Upload authorization documents',
      depends: isRepresentative,
      uiSchema: representativeAuthUploadUiSchema,
      schema: representativeAuthUploadSchema,
    },
  },
};

export default requestorIdentityChapter;