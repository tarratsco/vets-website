import { expect } from 'chai';
import {
  certificationUiSchema,
  certificationSchema,
} from './certification';

describe('certification chapter', () => {
  describe('certificationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(certificationUiSchema).to.be.an('object');
    });

    it('has certificationAttestation field', () => {
      expect(certificationUiSchema.certificationAttestation).to.exist;
    });

    it('has a ui:title', () => {
      expect(certificationUiSchema['ui:title']).to.be.a('string');
    });
  });

  describe('certificationSchema', () => {
    it('exports a schema object', () => {
      expect(certificationSchema).to.be.an('object');
    });

    it('requires certificationAttestation', () => {
      expect(certificationSchema.required).to.include(
        'certificationAttestation',
      );
    });

    it('has certificationAttestation as boolean type', () => {
      expect(
        certificationSchema.properties.certificationAttestation.type,
      ).to.equal('boolean');
    });
  });
});