import { expect } from 'chai';
import {
  certificationAttestationUiSchema,
  certificationAttestationSchema,
} from './certificationAttestation';

describe('certificationAttestation chapter', () => {
  describe('certificationAttestationSchema', () => {
    it('requires scoCertificationAttested', () => {
      expect(certificationAttestationSchema.required).to.include(
        'scoCertificationAttested',
      );
    });

    it('scoCertificationAttested is a checkboxGroup object schema', () => {
      const { scoCertificationAttested } =
        certificationAttestationSchema.properties;
      expect(scoCertificationAttested).to.be.an('object');
      expect(scoCertificationAttested.type).to.equal('object');
    });
  });

  describe('certificationAttestationUiSchema', () => {
    it('has scoCertificationAttested ui config', () => {
      expect(
        certificationAttestationUiSchema.scoCertificationAttested,
      ).to.be.an('object');
    });

    it('scoCertificationAttested has required: true at top level', () => {
      expect(
        certificationAttestationUiSchema.scoCertificationAttested['ui:required'],
      ).to.be.true;
    });

    it('has a ui:title', () => {
      expect(certificationAttestationUiSchema['ui:title']).to.equal(
        'Certification',
      );
    });
  });
});