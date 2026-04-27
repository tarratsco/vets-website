import { expect } from 'chai';
import {
  decedentPersonalInfoUiSchema,
  decedentPersonalInfoSchema,
  decedentServiceInfoUiSchema,
  decedentServiceInfoSchema,
  deathInformationUiSchema,
  deathInformationSchema,
} from './deceasedInformation';

describe('deceasedInformation chapter', () => {
  describe('decedentPersonalInfoUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(decedentPersonalInfoUiSchema).to.be.an('object');
    });

    it('has decedent object with name, ssn, dateOfBirth, dateOfDeath', () => {
      const decedent = decedentPersonalInfoUiSchema.decedent;
      expect(decedent.name).to.exist;
      expect(decedent.ssn).to.exist;
      expect(decedent.dateOfBirth).to.exist;
      expect(decedent.dateOfDeath).to.exist;
    });
  });

  describe('decedentPersonalInfoSchema', () => {
    it('exports a schema object', () => {
      expect(decedentPersonalInfoSchema).to.be.an('object');
    });

    it('requires name, ssn, dateOfBirth, dateOfDeath on decedent', () => {
      const required =
        decedentPersonalInfoSchema.properties.decedent.required;
      expect(required).to.include('name');
      expect(required).to.include('ssn');
      expect(required).to.include('dateOfBirth');
      expect(required).to.include('dateOfDeath');
    });
  });

  describe('decedentServiceInfoUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(decedentServiceInfoUiSchema).to.be.an('object');
    });

    it('has service object with branchOfService, component, rankAtDeath', () => {
      const service = decedentServiceInfoUiSchema.decedent.service;
      expect(service.branchOfService).to.exist;
      expect(service.component).to.exist;
      expect(service.rankAtDeath).to.exist;
    });
  });

  describe('decedentServiceInfoSchema', () => {
    it('exports a schema object', () => {
      expect(decedentServiceInfoSchema).to.be.an('object');
    });

    it('requires branchOfService, component, rankAtDeath, serviceEntryDate in service', () => {
      const required =
        decedentServiceInfoSchema.properties.decedent.properties.service
          .required;
      expect(required).to.include('branchOfService');
      expect(required).to.include('component');
      expect(required).to.include('rankAtDeath');
      expect(required).to.include('serviceEntryDate');
    });
  });

  describe('deathInformationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(deathInformationUiSchema).to.be.an('object');
    });

    it('has placeOfDeath with city, state, country', () => {
      const placeOfDeath = deathInformationUiSchema.decedent.placeOfDeath;
      expect(placeOfDeath.city).to.exist;
      expect(placeOfDeath.state).to.exist;
      expect(placeOfDeath.country).to.exist;
    });
  });

  describe('deathInformationSchema', () => {
    it('exports a schema object', () => {
      expect(deathInformationSchema).to.be.an('object');
    });

    it('requires city and country in placeOfDeath', () => {
      const required =
        deathInformationSchema.properties.decedent.properties.placeOfDeath
          .required;
      expect(required).to.include('city');
      expect(required).to.include('country');
    });
  });
});