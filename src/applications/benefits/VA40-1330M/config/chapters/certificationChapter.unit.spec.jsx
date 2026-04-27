import { expect } from 'chai';

import {
  certificationUiSchema,
  certificationSchema,
} from './certificationChapter';

describe('certificationChapter', () => {
  describe('certificationUiSchema', () => {
    it('has certificationAttestation field', () => {
      expect(certificationUiSchema).to.have.property('certificationAttestation');
    });

    it('certificationAttestation has a ui:title', () => {
      expect(
        certificationUiSchema.certificationAttestation['ui:title'],
      ).to.be.a('string');
    });

    it('certificationAttestation has ui:validations', () => {
      expect(
        certificationUiSchema.certificationAttestation['ui:validations'],
      ).to.be.an('array');
      expect(
        certificationUiSchema.certificationAttestation['ui:validations'].length,
      ).to.be.greaterThan(0);
    });
  });

  describe('certificationSchema', () => {
    it('requires certificationAttestation', () => {
      expect(certificationSchema.required).to.include(
        'certificationAttestation',
      );
    });

    it('certificationAttestation is boolean type', () => {
      expect(
        certificationSchema.properties.certificationAttestation.type,
      ).to.equal('boolean');
    });
  });

  describe('certification validation', () => {
    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('passes when value is true', () => {
      const validation =
        certificationUiSchema.certificationAttestation['ui:validations'][0];
      const errors = { addError: msg => messages.push(msg || '') };
      validation(errors, true);
      expect(messages).to.have.lengthOf(0);
    });

    it('fails when value is false', () => {
      const validation =
        certificationUiSchema.certificationAttestation['ui:validations'][0];
      const errors = { addError: msg => messages.push(msg || '') };
      validation(errors, false);
      expect(messages.length).to.be.greaterThan(0);
    });

    it('fails when value is undefined', () => {
      const validation =
        certificationUiSchema.certificationAttestation['ui:validations'][0];
      const errors = { addError: msg => messages.push(msg || '') };
      validation(errors, undefined);
      expect(messages.length).to.be.greaterThan(0);
    });
  });
});