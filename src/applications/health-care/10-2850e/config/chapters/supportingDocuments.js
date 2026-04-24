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
      path: 'document-upload/licenses',
      title: 'Professional license documents',
      uiSchema: licenseDocumentsUiSchema,
      schema: licenseDocumentsSchema,
    },
    deaCertificate: {
      path: 'document-upload/dea-certificate',
      title: 'DEA certificate',
      depends: formData =>
        formData?.deaRegistration?.deaApplicable === 'yes-current',
      uiSchema: deaCertificateUiSchema,
      schema: deaCertificateSchema,
    },
    boardCertDocuments: {
      path: 'document-upload/board-certifications',
      title: 'Board certification documents',
      depends: formData =>
        Array.isArray(formData?.boardCertifications) &&
        formData.boardCertifications.length > 0,
      uiSchema: boardCertDocumentsUiSchema,
      schema: boardCertDocumentsSchema,
    },
    malpracticeInsurance: {
      path: 'document-upload/malpractice-insurance',
      title: 'Malpractice insurance certificate',
      uiSchema: malpracticeInsuranceUiSchema,
      schema: malpracticeInsuranceSchema,
    },
    adverseHistoryDocs: {
      path: 'document-upload/adverse-history-docs',
      title: 'Adverse history documents',
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
      path: 'document-upload/other',
      title: 'Other documents',
      uiSchema: otherDocumentsUiSchema,
      schema: otherDocumentsSchema,
    },
  },
};