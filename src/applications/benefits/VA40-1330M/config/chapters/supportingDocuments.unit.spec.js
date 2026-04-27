import { expect } from 'chai';
import {
  documentsIntroUiSchema,
  documentsIntroSchema,
  deathCertificateUiSchema,
  deathCertificateSchema,
  ddForm1300UiSchema,
  ddForm1300Schema,
  ngbForm22UiSchema,
  ngbForm22Schema,
  additionalDocumentsUiSchema,
  additionalDocumentsSchema,
  supportingDocumentsPages,
} from './supportingDocuments';

describe('supportingDocuments chapter', () => {
  describe('deathCertificateUiSchema', () => {
    it('has documents.deathCertificate field', () => {
      expect(deathCertificateUiSchema.documents).to.have.property(
        'deathCertificate',
      );
    });
  });

  describe('deathCertificateSchema', () => {
    it('requires documents.deathCertificate', () => {
      expect(
        deathCertificateSchema.properties.documents.required,
      ).to.include('deathCertificate');
    });

    it('deathCertificate is an object schema', () => {
      const prop =
        deathCertificateSchema.properties.documents.properties
          .deathCertificate;
      expect(prop).to.be.an('object');
    });
  });

  describe('ddForm1300Schema', () => {
    it('requires ddForm1300', () => {
      expect(
        ddForm1300Schema.properties.documents.required,
      ).to.include('ddForm1300');
    });
  });

  describe('ngbForm22Schema', () => {
    it('requires ngbForm22', () => {
      expect(
        ngbForm22Schema.properties.documents.required,
      ).to.include('ngbForm22');
    });
  });

  describe('additionalDocumentsUiSchema', () => {
    it('has additionalDocuments field', () => {
      expect(additionalDocumentsUiSchema.documents).to.have.property(
        'additionalDocuments',
      );
    });
  });

  describe('supportingDocumentsPages', () => {
    it('has all five pages', () => {
      expect(supportingDocumentsPages).to.have.property('documentsIntro');
      expect(supportingDocumentsPages).to.have.property('deathCertificate');
      expect(supportingDocumentsPages).to.have.property('ddForm1300');
      expect(supportingDocumentsPages).to.have.property('ngbForm22');
      expect(supportingDocumentsPages).to.have.property('additionalDocuments');
    });

    it('ddForm1300 depends on activeDuty', () => {
      const { depends } = supportingDocumentsPages.ddForm1300;
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(true);
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.equal(
        false,
      );
      expect(depends({})).to.equal(false);
    });

    it('ngbForm22 depends on guardOrReserve', () => {
      const { depends } = supportingDocumentsPages.ngbForm22;
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.equal(
        true,
      );
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(false);
      expect(depends({})).to.equal(false);
    });

    it('additionalDocuments page has no depends (always shown)', () => {
      expect(supportingDocumentsPages.additionalDocuments.depends).to.be
        .undefined;
    });

    it('pages have correct paths', () => {
      expect(supportingDocumentsPages.documentsIntro.path).to.equal(
        'supporting-documents/required-documents-intro',
      );
      expect(supportingDocumentsPages.deathCertificate.path).to.equal(
        'supporting-documents/death-certificate',
      );
      expect(supportingDocumentsPages.ddForm1300.path).to.equal(
        'supporting-documents/dd-form-1300',
      );
      expect(supportingDocumentsPages.ngbForm22.path).to.equal(
        'supporting-documents/ngb-form-22',
      );
    });
  });
});