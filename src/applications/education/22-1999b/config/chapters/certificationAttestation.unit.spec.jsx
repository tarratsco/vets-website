import { expect } from 'chai';

import {
  certificationAttestationUiSchema,
  certificationAttestationSchema,
} from './certificationAttestation';

describe('certificationAttestation page', () => {
  it('uiSchema has certificationAttestation field', () => {
    expect(certificationAttestationUiSchema.certificationAttestation).to.be.an(
      'object',
    );
  });

  it(
    'uiSchema certificationAttestation has required flag at top level',
    () => {
      expect(
        certificationAttestationUiSchema.certificationAttestation['ui:required'],
      ).to.not.be.undefined;
    },
  );

  it('uiSchema certificationAttestation has a title', () => {
    expect(
      certificationAttestationUiSchema.certificationAttestation['ui:title'],
    ).to.equal('Certification');
  });

  it('schema requires certificationAttestation', () => {
    expect(certificationAttestationSchema.required).to.include(
      'certificationAttestation',
    );
  });

  it('schema certificationAttestation is array type', () => {
    expect(
      certificationAttestationSchema.properties.certificationAttestation.type,
    ).to.equal('array');
  });

  describe('validateAttestation via ui:validations', () => {
    const validations =
      certificationAttestationUiSchema.certificationAttestation[
        'ui:validations'
      ];

    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('has at least one validation', () => {
      expect(validations).to.be.an('array').with.length.greaterThan(0);
    });

    it('adds error when attestation is not checked', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, []);
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error when value is null', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, null);
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when attestation is checked', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, ['scoCertificationAttested']);
      expect(messages).to.have.lengthOf(0);
    });
  });
});