import { expect } from 'chai';
import {
  veteranIdentificationUiSchema,
  veteranIdentificationSchema,
} from './veteranIdentification';

describe('veteranIdentification page', () => {
  describe('uiSchema', () => {
    it('has veteranInformation group', () => {
      expect(veteranIdentificationUiSchema.veteranInformation).to.be.an(
        'object',
      );
    });

    it('has vaFileNumber field', () => {
      expect(
        veteranIdentificationUiSchema.veteranInformation.vaFileNumber,
      ).to.be.an('object');
    });

    it('has socialSecurityNumber field', () => {
      expect(
        veteranIdentificationUiSchema.veteranInformation.socialSecurityNumber,
      ).to.be.an('object');
    });

    it('has militaryServiceNumber field', () => {
      expect(
        veteranIdentificationUiSchema.veteranInformation.militaryServiceNumber,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('does not require any identification fields (all optional)', () => {
      const props =
        veteranIdentificationSchema.properties?.veteranInformation;
      expect(props?.required).to.not.exist;
    });

    it('vaFileNumber has correct pattern', () => {
      const vaFileNumber =
        veteranIdentificationSchema.properties.veteranInformation.properties
          .vaFileNumber;
      expect(vaFileNumber.pattern).to.equal('^[0-9]{7,9}$');
    });
  });
});