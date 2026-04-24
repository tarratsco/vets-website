import { expect } from 'chai';
import {
  institutionInformationUiSchema,
  institutionInformationSchema,
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from './institutionAndSco';

describe('institutionAndSco chapter', () => {
  describe('institutionInformationSchema', () => {
    it('requires institutionAndScoInformation at top level', () => {
      expect(institutionInformationSchema.required).to.include(
        'institutionAndScoInformation',
      );
    });

    it('facilityCode has correct pattern', () => {
      const { facilityCode } =
        institutionInformationSchema.properties.institutionAndScoInformation.properties;
      expect(facilityCode.pattern).to.equal('^\\d{8}$');
      expect(facilityCode.minLength).to.equal(8);
      expect(facilityCode.maxLength).to.equal(8);
    });

    it('institutionName has maxLength 100', () => {
      const { institutionName } =
        institutionInformationSchema.properties.institutionAndScoInformation.properties;
      expect(institutionName.maxLength).to.equal(100);
    });
  });

  describe('institutionInformationUiSchema', () => {
    it('has a title for facilityCode', () => {
      const fieldUi =
        institutionInformationUiSchema.institutionAndScoInformation.facilityCode;
      expect(fieldUi['ui:title']).to.equal('VA Facility Code');
    });

    it('has hint text for facilityCode', () => {
      const fieldUi =
        institutionInformationUiSchema.institutionAndScoInformation.facilityCode;
      expect(fieldUi['ui:options']).to.exist;
      expect(fieldUi['ui:options'].hint).to.be.a('string');
    });
  });

  describe('scoContactInformationSchema', () => {
    it('requires scoFirstName, scoLastName, scoPhone, scoEmail', () => {
      const requiredFields =
        scoContactInformationSchema.properties.institutionAndScoInformation.required;
      expect(requiredFields).to.include('scoFirstName');
      expect(requiredFields).to.include('scoLastName');
      expect(requiredFields).to.include('scoPhone');
      expect(requiredFields).to.include('scoEmail');
    });

    it('scoPhone has correct 10-digit pattern', () => {
      const { scoPhone } =
        scoContactInformationSchema.properties.institutionAndScoInformation.properties;
      expect(scoPhone.pattern).to.equal('^\\d{10}$');
    });

    it('scoEmail has format email', () => {
      const { scoEmail } =
        scoContactInformationSchema.properties.institutionAndScoInformation.properties;
      expect(scoEmail.format).to.equal('email');
    });
  });

  describe('scoContactInformationUiSchema', () => {
    it('has title for scoPhone', () => {
      const fieldUi =
        scoContactInformationUiSchema.institutionAndScoInformation.scoPhone;
      expect(fieldUi['ui:title']).to.equal('Your phone number');
    });

    it('has title for scoEmail', () => {
      const fieldUi =
        scoContactInformationUiSchema.institutionAndScoInformation.scoEmail;
      expect(fieldUi['ui:title']).to.equal('Your email address');
    });
  });
});