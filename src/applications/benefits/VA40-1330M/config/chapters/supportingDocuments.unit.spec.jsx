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
  describe('deathCertificate page', () => {
    it('exports uiSchema and schema', () => {
      expect(deathCertificateUiSchema).to.be.an('object');
      expect(deathCertificateSchema).to.be.an('object');
    });

    it('schema requires documents', () => {
      expect(deathCertificateSchema.required).to.include('documents');
    });

    it('documents schema requires deathCertificate', () => {
      const { required } = deathCertificateSchema.properties.documents;
      expect(required).to.include('deathCertificate');
    });
  });

  describe('ddForm1300 page', () => {
    it('exports uiSchema and schema', () => {
      expect(ddForm1300UiSchema).to.be.an('object');
      expect(ddForm1300Schema).to.be.an('object');
    });

    it('schema requires ddForm1300', () => {
      const { required } = ddForm1300Schema.properties.documents;
      expect(required).to.include('ddForm1300');
    });
  });

  describe('ngbForm22 page', () => {
    it('exports uiSchema and schema', () => {
      expect(ngbForm22UiSchema).to.be.an('object');
      expect(ngbForm22Schema).to.be.an('object');
    });

    it('schema requires ngbForm22', () => {
      const { required } = ngbForm22Schema.properties.documents;
      expect(required).to.include('ngbForm22');
    });
  });

  describe('additionalDocuments page', () => {
    it('exports uiSchema and schema', () => {
      expect(additionalDocumentsUiSchema).to.be.an('object');
      expect(additionalDocumentsSchema).to.be.an('object');
    });

    it('schema documents property has additionalDocuments', () => {
      const { additionalDocuments } =
        additionalDocumentsSchema.properties.documents.properties;
      expect(additionalDocuments).to.be.an('object');
    });
  });
});