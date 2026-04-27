import { expect } from 'chai';
import {
  certifyUiSchema,
  certifySchema,
} from './certificationChapter';

describe('certificationChapter', () => {
  describe('certifySchema', () => {
    it('requires certificationAttestation', () => {
      expect(certifySchema.required).to.include('certificationAttestation');
    });

    it('certificationAttestation is a boolean type', () => {
      expect(certifySchema.properties.certificationAttestation.type).to.equal('boolean');
    });
  });

  describe('certifyUiSchema', () => {
    it('has certificationAttestation title', () => {
      expect(certifyUiSchema.certificationAttestation['ui:title']).to.be.a('string');
    });

    it('certificationAttestation required function returns true', () => {
      const requiredFn = certifyUiSchema.certificationAttestation['ui:required'];
      expect(requiredFn()).to.equal(true);
    });

    it('has errorMessages with required message', () => {
      expect(
        certifyUiSchema.certificationAttestation['ui:errorMessages'].required,
      ).to.be.a('string');
    });
  });
});