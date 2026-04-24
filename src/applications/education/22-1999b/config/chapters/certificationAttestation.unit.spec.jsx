import { expect } from 'chai';
import {
  certificationAttestationUiSchema,
  certificationAttestationSchema,
} from './certificationAttestation';

describe('chapters/certificationAttestation', () => {
  describe('certificationAttestationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(certificationAttestationUiSchema).to.be.an('object');
    });

    it('has certificationAttestation field', () => {
      expect(certificationAttestationUiSchema.certificationAttestation).to.exist;
    });

    it('has a ui:title', () => {
      const field = certificationAttestationUiSchema.certificationAttestation;
      expect(field['ui:title']).to.equal('Certification');
    });

    it('has ui:required set', () => {
      const field = certificationAttestationUiSchema.certificationAttestation;
      expect(
        field['ui:required'],
      ).to.not.be.undefined;
    });
  });

  describe('certificationAttestationSchema', () => {
    it('exports a schema object', () => {
      expect(certificationAttestationSchema).to.be.an('object');
    });

    it('requires certificationAttestation', () => {
      expect(certificationAttestationSchema.required).to.include(
        'certificationAttestation',
      );
    });

    it('certificationAttestation properties exist', () => {
      expect(
        certificationAttestationSchema.properties.certificationAttestation,
      ).to.exist;
    });
  });
});