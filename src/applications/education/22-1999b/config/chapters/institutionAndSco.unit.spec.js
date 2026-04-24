import { expect } from 'chai';
import {
  institutionInformationUiSchema,
  institutionInformationSchema,
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from './institutionAndSco';

describe('chapters/institutionAndSco', () => {
  describe('institutionInformationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(institutionInformationUiSchema).to.be.an('object');
    });

    it('has institutionAndScoInformation.facilityCode ui:title', () => {
      expect(
        institutionInformationUiSchema.institutionAndScoInformation.facilityCode[
          'ui:title'
        ],
      ).to.equal('VA Facility Code');
    });

    it('has institutionAndScoInformation.institutionName ui:title', () => {
      expect(
        institutionInformationUiSchema.institutionAndScoInformation
          .institutionName['ui:title'],
      ).to.equal('Institution name');
    });
  });

  describe('institutionInformationSchema', () => {
    it('exports a schema object', () => {
      expect(institutionInformationSchema).to.be.an('object');
    });

    it('requires institutionAndScoInformation', () => {
      expect(institutionInformationSchema.required).to.include(
        'institutionAndScoInformation',
      );
    });

    it('has facilityCode with correct pattern', () => {
      const { facilityCode } = institutionInformationSchema.properties.institutionAndScoInformation.properties;
      expect(facilityCode.pattern).to.equal('^\\d{8}$');
      expect(facilityCode.maxLength).to.equal(8);
    });
  });

  describe('scoContactInformationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(scoContactInformationUiSchema).to.be.an('object');
    });

    it('has scoFirstName field', () => {
      expect(
        scoContactInformationUiSchema.institutionAndScoInformation.scoFirstName,
      ).to.exist;
    });

    it('has scoPhone field', () => {
      expect(
        scoContactInformationUiSchema.institutionAndScoInformation.scoPhone,
      ).to.exist;
    });

    it('has scoEmail field', () => {
      expect(
        scoContactInformationUiSchema.institutionAndScoInformation.scoEmail,
      ).to.exist;
    });
  });

  describe('scoContactInformationSchema', () => {
    it('exports a schema object', () => {
      expect(scoContactInformationSchema).to.be.an('object');
    });

    it('requires scoFirstName, scoLastName, scoPhone, scoEmail', () => {
      const { required } = scoContactInformationSchema.properties.institutionAndScoInformation;
      expect(required).to.include('scoFirstName');
      expect(required).to.include('scoLastName');
      expect(required).to.include('scoPhone');
      expect(required).to.include('scoEmail');
    });
  });
});