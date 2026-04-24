import { expect } from 'chai';
import {
  institutionInformationUiSchema,
  institutionInformationSchema,
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from './institutionAndSco';

describe('institutionAndSco chapter', () => {
  describe('institutionInformationSchema', () => {
    it('has required institutionAndScoInformation property', () => {
      expect(institutionInformationSchema.properties).to.have.property(
        'institutionAndScoInformation',
      );
    });

    it('requires facilityCode and institutionName', () => {
      const required =
        institutionInformationSchema.properties.institutionAndScoInformation
          .required;
      expect(required).to.include('facilityCode');
      expect(required).to.include('institutionName');
    });

    it('facilityCode has correct pattern', () => {
      const { facilityCode } =
        institutionInformationSchema.properties.institutionAndScoInformation
          .properties;
      expect(facilityCode.pattern).to.equal('^\\d{8}$');
    });
  });

  describe('institutionInformationUiSchema', () => {
    it('has ui:title', () => {
      expect(institutionInformationUiSchema['ui:title']).to.be.a('string');
    });

    it('has facilityCode field config', () => {
      expect(
        institutionInformationUiSchema.institutionAndScoInformation.facilityCode,
      ).to.be.an('object');
    });
  });

  describe('scoContactInformationSchema', () => {
    it('requires scoPhone and scoEmail', () => {
      const required =
        scoContactInformationSchema.properties.institutionAndScoInformation
          .required;
      expect(required).to.include('scoPhone');
      expect(required).to.include('scoEmail');
    });

    it('scoPhone has 10-digit pattern', () => {
      const { scoPhone } =
        scoContactInformationSchema.properties.institutionAndScoInformation
          .properties;
      expect(scoPhone.pattern).to.equal('^\\d{10}$');
    });

    it('scoEmail has email format', () => {
      const { scoEmail } =
        scoContactInformationSchema.properties.institutionAndScoInformation
          .properties;
      expect(scoEmail.format).to.equal('email');
    });
  });

  describe('scoContactInformationUiSchema', () => {
    it('has scoPhone field config', () => {
      expect(
        scoContactInformationUiSchema.institutionAndScoInformation.scoPhone,
      ).to.be.an('object');
    });

    it('has scoEmail field config', () => {
      expect(
        scoContactInformationUiSchema.institutionAndScoInformation.scoEmail,
      ).to.be.an('object');
    });
  });
});