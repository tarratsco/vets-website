import { expect } from 'chai';
import {
  certifyUiSchema,
  certifySchema,
  certificationAndSubmitPages,
  validateCertificationChecked,
} from './certificationAndSubmit';

describe('certificationAndSubmit chapter', () => {
  let messages;
  let errors;

  beforeEach(() => {
    messages = [];
    errors = { addError: msg => messages.push(msg || '') };
  });

  describe('validateCertificationChecked', () => {
    it('adds error when value is false', () => {
      validateCertificationChecked(errors, false);
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error when value is undefined', () => {
      validateCertificationChecked(errors, undefined);
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when value is true', () => {
      validateCertificationChecked(errors, true);
      expect(messages).to.have.lengthOf(0);
    });
  });

  describe('certifyUiSchema', () => {
    it('has certificationAttestation field', () => {
      expect(certifyUiSchema).to.have.property('certificationAttestation');
    });

    it('has view:certificationWarning field', () => {
      expect(certifyUiSchema).to.have.property('view:certificationWarning');
    });

    it('certificationAttestation has ui:validations', () => {
      expect(
        certifyUiSchema.certificationAttestation['ui:validations'],
      ).to.be.an('array').that.has.lengthOf.at.least(1);
    });
  });

  describe('certifySchema', () => {
    it('requires certificationAttestation', () => {
      expect(certifySchema.required).to.include('certificationAttestation');
    });

    it('certificationAttestation is a boolean', () => {
      expect(certifySchema.properties.certificationAttestation.type).to.equal(
        'boolean',
      );
    });
  });

  describe('certificationAndSubmitPages', () => {
    it('has certify page', () => {
      expect(certificationAndSubmitPages).to.have.property('certify');
    });

    it('certify page has correct path', () => {
      expect(certificationAndSubmitPages.certify.path).to.equal('certify');
    });

    it('certify page has title', () => {
      expect(certificationAndSubmitPages.certify.title).to.be.a('string').that
        .is.not.empty;
    });
  });
});