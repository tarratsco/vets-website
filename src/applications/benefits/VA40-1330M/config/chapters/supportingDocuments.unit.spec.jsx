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
  describe('deathCertificateUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(deathCertificateUiSchema).to.be.an('object');
    });

    it('has deathCertificate field on documents', () => {
      expect(deathCertificateUiSchema.documents.deathCertificate).to.exist;
    });
  });

  describe('deathCertificateSchema', () => {
    it('exports a schema object', () => {
      expect(deathCertificateSchema).to.be.an('object');
    });

    it('requires deathCertificate', () => {
      const required = deathCertificateSchema.properties.documents.required;
      expect(required).to.include('deathCertificate');
    });
  });

  describe('ddForm1300UiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(ddForm1300UiSchema).to.be.an('object');
    });

    it('has ddForm1300 field on documents', () => {
      expect(ddForm1300UiSchema.documents.ddForm1300).to.exist;
    });
  });

  describe('ddForm1300Schema', () => {
    it('exports a schema object', () => {
      expect(ddForm1300Schema).to.be.an('object');
    });

    it('requires ddForm1300', () => {
      const required = ddForm1300Schema.properties.documents.required;
      expect(required).to.include('ddForm1300');
    });
  });

  describe('ngbForm22UiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(ngbForm22UiSchema).to.be.an('object');
    });

    it('has ngbForm22 field on documents', () => {
      expect(ngbForm22UiSchema.documents.ngbForm22).to.exist;
    });
  });

  describe('ngbForm22Schema', () => {
    it('exports a schema object', () => {
      expect(ngbForm22Schema).to.be.an('object');
    });

    it('requires ngbForm22', () => {
      const required = ngbForm22Schema.properties.documents.required;
      expect(required).to.include('ngbForm22');
    });
  });

  describe('additionalDocumentsUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(additionalDocumentsUiSchema).to.be.an('object');
    });

    it('has additionalDocuments field on documents', () => {
      expect(
        additionalDocumentsUiSchema.documents.additionalDocuments,
      ).to.exist;
    });
  });

  describe('additionalDocumentsSchema', () => {
    it('exports a schema object', () => {
      expect(additionalDocumentsSchema).to.be.an('object');
    });

    it('has additionalDocuments in documents properties', () => {
      const props = additionalDocumentsSchema.properties.documents.properties;
      expect(props.additionalDocuments).to.exist;
    });
  });
});