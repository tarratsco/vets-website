/**
 * @module pages/representativeAuthUpload
 * @description Upload legal documentation establishing representative authority
 * Conditional — shown only when requestorType !== 'veteran'
 */
import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ACCEPTED_FILE_TYPES = 'pdf,jpg,jpeg,png';
const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const representativeAuthUploadUiSchema = {
  'ui:title': 'Upload your authorization documents',
  'ui:description': () => (
    <div>
      <va-alert status="warning" visible>
        <h2 slot="headline">Required documentation</h2>
        <div>
          <p>
            You must upload at least one legal document that establishes your
            authority to request records on behalf of the Veteran. Accepted
            documents include:
          </p>
          <ul>
            <li>Court-appointed legal guardianship order</li>
            <li>Healthcare power of attorney instrument</li>
            <li>HIPAA personal representative documentation</li>
            <li>VA fiduciary appointment letter</li>
            <li>VSO/accreditation letter</li>
            <li>Next-of-kin documentation (for deceased Veterans)</li>
          </ul>
          <p>
            <strong>File requirements:</strong> PDF, JPG, or PNG. Maximum{' '}
            {MAX_FILE_SIZE_MB} MB per file.
          </p>
        </div>
      </va-alert>
    </div>
  ),
  representative: {
    uploadedDocuments: fileInputUI({
      title: 'Upload authorization document',
      hint:
        'Upload a PDF, JPG, or PNG of your legal authorization document. Maximum file size: 20 MB.',
      fileUploadUrl: '/v0/upload_supporting_evidence',
      fileTypes: ACCEPTED_FILE_TYPES.split(','),
      maxSize: MAX_FILE_SIZE_BYTES,
      minSize: 1,
      buttonText: 'Upload authorization document',
      addAnotherLabel: 'Add another document',
      errorMessages: {
        required: 'Please upload at least one authorization document.',
        size: `File size must be less than ${MAX_FILE_SIZE_MB} MB.`,
        fileType: 'File must be a PDF, JPG, or PNG.',
      },
    }),
  },
};

export const representativeAuthUploadSchema = {
  type: 'object',
  properties: {
    representative: {
      type: 'object',
      properties: {
        uploadedDocuments: fileInputSchema,
      },
    },
  },
};