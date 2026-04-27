import { expect } from 'chai';
import {
  deathCertificateUiSchema,
  deathCertificateSchema,
  ddForm1300UiSchema,
  ddForm1300Schema,
  ngbForm22UiSchema,
  ngbForm22Schema,
  additionalDocumentsUiSchema,
  additionalDocumentsSchema,
} from './supportingDocuments';

describe('supportingDocuments chapter', () => {
  describe('deathCertificateSchema', () => {
    it('documents requires deathCertificate', () => {
      expect(
        deathCertificateSchema.properties.documents.required,
      ).to.include('deathCertificate');
    });
  });

  describe('deathCertificateUiSchema', () => {
    it('deathCertificate has required:true', () => {
      const fileInput = deathCertificateUiSchema.documents.deathCertificate;
      expect(fileInput['ui:options'].required).to.equal(true);
    });
  });

  describe('ddForm1300Schema', () => {
    it('documents requires ddForm1300', () => {
      expect(
        ddForm1300Schema.properties.documents.required,
      ).to.include('ddForm1300');
    });
  });

  describe('ddForm1300UiSchema', () => {
    it('ddForm1300 has required:true', () => {
      const fileInput = ddForm1300UiSchema.documents.ddForm1300;
      expect(fileInput['ui:options'].required).to.equal(true);
    });
  });

  describe('ngbForm22Schema', () => {
    it('documents requires ngbForm22', () => {
      expect(
        ngbForm22Schema.properties.documents.required,
      ).to.include('ngbForm22');
    });
  });

  describe('ngbForm22UiSchema', () => {
    it('ngbForm22 has required:true', () => {
      const fileInput = ngbForm22UiSchema.documents.ngbForm22;
      expect(fileInput['ui:options'].required).to.equal(true);
    });
  });

  describe('additionalDocumentsUiSchema', () => {
    it('additionalDocuments has required:false', () => {
      const fileInput = additionalDocumentsUiSchema.documents.additionalDocuments;
      expect(fileInput['ui:options'].required).to.equal(false);
    });
  });
});