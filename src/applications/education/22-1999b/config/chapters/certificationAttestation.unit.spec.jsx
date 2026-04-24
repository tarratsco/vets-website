import { expect } from 'chai';

import {
  certificationAttestationUiSchema,
  certificationAttestationSchema,
  ATTESTATION_KEYS,
} from '../chapters/certificationAttestation';

describe('certificationAttestation page', () => {
  describe('uiSchema', () => {
    it('has scoCertificationAttested field', () => {
      expect(
        certificationAttestationUiSchema.scoCertificationAttested,
      ).to.exist;
    });

    it('scoCertificationAttested has title "Certification"', () => {
      expect(
        certificationAttestationUiSchema.scoCertificationAttested['ui:title'],
      ).to.equal('Certification');
    });

    it('has top-level required option', () => {
      expect(
        certificationAttestationUiSchema.scoCertificationAttested[
          'ui:required'
        ],
      ).to.not.be.undefined;
    });

    it('has required error message', () => {
      expect(
        certificationAttestationUiSchema.scoCertificationAttested[
          'ui:errorMessages'
        ].required,
      ).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(certificationAttestationSchema.type).to.equal('object');
    });

    it('requires scoCertificationAttested', () => {
      expect(certificationAttestationSchema.required).to.include(
        'scoCertificationAttested',
      );
    });

    it('ATTESTATION_KEYS has at least one value', () => {
      expect(ATTESTATION_KEYS).to.have.length.greaterThan(0);
    });
  });
});