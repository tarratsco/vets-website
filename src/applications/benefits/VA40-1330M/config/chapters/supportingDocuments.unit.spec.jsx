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
    it('has documents.deathCertificate', () => {
      expect(deathCertificateUiSchema.documents).to.have.property(
        'deathCertificate',
      );
    });

    it('deathCertificate has a title', () => {
      expect(
        deathCertificateUiSchema.documents.deathCertificate['ui:title'],
      ).to.be.a('string');
    });
  });

  describe('deathCertificateSchema', () => {
    it('documents requires deathCertificate', () => {
      expect(
        deathCertificateSchema.properties.documents.required,
      ).to.include('deathCertificate');
    });
  });

  describe('ddForm1300UiSchema', () => {
    it('has documents.ddForm1300', () => {
      expect(ddForm1300UiSchema.documents).to.have.property('ddForm1300');
    });
  });

  describe('ddForm1300Schema', () => {
    it('documents requires ddForm1300', () => {
      expect(ddForm1300Schema.properties.documents.required).to.include(
        'ddForm1300',
      );
    });
  });

  describe('ngbForm22UiSchema', () => {
    it('has documents.ngbForm22', () => {
      expect(ngbForm22UiSchema.documents).to.have.property('ngbForm22');
    });
  });

  describe('ngbForm22Schema', () => {
    it('documents requires ngbForm22', () => {
      expect(ngbForm22Schema.properties.documents.required).to.include(
        'ngbForm22',
      );
    });
  });

  describe('additionalDocumentsUiSchema', () => {
    it('has documents.additionalDocuments', () => {
      expect(additionalDocumentsUiSchema.documents).to.have.property(
        'additionalDocuments',
      );
    });
  });

  describe('additionalDocumentsSchema', () => {
    it('has documents.additionalDocuments property', () => {
      expect(
        additionalDocumentsSchema.properties.documents.properties,
      ).to.have.property('additionalDocuments');
    });

    it('additionalDocuments is not required', () => {
      const { required } = additionalDocumentsSchema.properties.documents;
      expect(required).to.not.exist;
    });
  });

  describe('depends functions', () => {
    it('ddForm1300 depends function evaluates correctly', () => {
      const depends = formData =>
        formData.serviceStatusAtDeath === 'activeDuty';
      expect(() => depends({ serviceStatusAtDeath: 'activeDuty' })).to.not
        .throw;
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.true;
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.be.false;
      expect(() => depends({})).to.not.throw;
    });

    it('ngbForm22 depends function evaluates correctly', () => {
      const depends = formData =>
        formData.serviceStatusAtDeath === 'guardOrReserve';
      expect(() => depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.not
        .throw;
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.be.true;
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.false;
      expect(() => depends(null)).to.throw;
    });
  });
});