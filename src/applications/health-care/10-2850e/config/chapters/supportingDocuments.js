import {
  licenseDocumentsUiSchema,
  licenseDocumentsSchema,
} from '../../pages/licenseDocuments';
import {
  deaCertificateUiSchema,
  deaCertificateSchema,
} from '../../pages/deaCertificate';
import {
  boardCertDocumentsUiSchema,
  boardCertDocumentsSchema,
} from '../../pages/boardCertDocuments';
import {
  malpracticeInsuranceUiSchema,
  malpracticeInsuranceSchema,
} from '../../pages/malpracticeInsurance';
import {
  adverseHistoryDocsUiSchema,
  adverseHistoryDocsSchema,
} from '../../pages/adverseHistoryDocs';
import {
  otherDocumentsUiSchema,
  otherDocumentsSchema,
} from '../../pages/otherDocuments';

export default {
  title: 'Supporting Documents',
  pages: {
    licenseDocuments: {
      path: 'document-upload-licenses',
      title: 'Upload professional licenses',
      uiSchema: licenseDocumentsUiSchema,
      schema: licenseDocumentsSchema,
    },
    deaCertificate: {
      path: 'document-upload-dea',
      title: 'Upload DEA certificate',
      depends: formData =>
        formData?.deaRegistration?.deaApplicable === 'yes-current',
      uiSchema: deaCertificateUiSchema,
      schema: deaCertificateSchema,
    },
    boardCertDocuments: {
      path: 'document-upload-board-certifications',
      title: 'Upload board certification documents',
      depends: formData =>
        Array.isArray(formData?.boardCertifications) &&
        formData.boardCertifications.length > 0,
      uiSchema: boardCertDocumentsUiSchema,
      schema: boardCertDocumentsSchema,
    },
    malpracticeInsurance: {
      path: 'document-upload-malpractice-insurance',
      title: 'Upload malpractice insurance certificate',
      uiSchema: malpracticeInsuranceUiSchema,
      schema: malpracticeInsuranceSchema,
    },
    adverseHistoryDocs: {
      path: 'document-upload-adverse-history',
      title: 'Upload adverse history documents',
      depends: formData =>
        formData?.adverseHistory?.adverseLicensureActions
          ?.hasAdverseLicensureActions === true ||
        formData?.adverseHistory?.malpracticeHistory
          ?.hasMalpracticeHistory === true ||
        formData?.adverseHistory?.clinicalPrivilegesAdverse
          ?.hasAdversePrivilegesHistory === true ||
        formData?.adverseHistory?.deaRegistrationAdverse
          ?.hasAdverseDeaHistory === true ||
        formData?.adverseHistory?.criminalHistory?.hasFelonyConviction ===
          true ||
        formData?.adverseHistory?.criminalHistory
          ?.hasMisdemeanorConviction === true,
      uiSchema: adverseHistoryDocsUiSchema,
      schema: adverseHistoryDocsSchema,
    },
    otherDocuments: {
      path: 'document-upload-other',
      title: 'Upload other documents',
      uiSchema: otherDocumentsUiSchema,
      schema: otherDocumentsSchema,
    },
  },
};