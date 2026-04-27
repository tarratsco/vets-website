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
  describe('decedentPersonalInfoSchema', () => {
    it('has required decedent', () => {
      expect(decedentPersonalInfoSchema.required).to.include('decedent');
    });

    it('decedent requires name, ssn, dateOfBirth, dateOfDeath', () => {
      const { required } = decedentPersonalInfoSchema.properties.decedent;
      expect(required).to.include('name');
      expect(required).to.include('ssn');
      expect(required).to.include('dateOfBirth');
      expect(required).to.include('dateOfDeath');
    });
  });

  describe('decedentPersonalInfoUiSchema', () => {
    it('has decedent.ssn field', () => {
      expect(decedentPersonalInfoUiSchema.decedent.ssn).to.be.an('object');
    });

    it('has decedent.dateOfBirth field', () => {
      expect(decedentPersonalInfoUiSchema.decedent.dateOfBirth).to.be.an('object');
    });
  });

  describe('decedentServiceInfoSchema', () => {
    it('requires decedent', () => {
      expect(decedentServiceInfoSchema.required).to.include('decedent');
    });

    it('service requires branchOfService, component, rankAtDeath, serviceEntryDate', () => {
      const { required } = decedentServiceInfoSchema.properties.decedent.properties.service;
      expect(required).to.include('branchOfService');
      expect(required).to.include('component');
      expect(required).to.include('rankAtDeath');
      expect(required).to.include('serviceEntryDate');
    });

    it('branchOfService enum contains army', () => {
      const { enum: enumVals } = decedentServiceInfoSchema.properties.decedent.properties.service.properties.branchOfService;
      expect(enumVals).to.include('army');
    });

    it('component enum contains active, guard, reserve', () => {
      const { enum: enumVals } = decedentServiceInfoSchema.properties.decedent.properties.service.properties.component;
      expect(enumVals).to.deep.equal(['active', 'guard', 'reserve']);
    });
  });

  describe('deathInformationSchema', () => {
    it('placeOfDeath requires city and country', () => {
      const { required } = deathInformationSchema.properties.decedent.properties.placeOfDeath;
      expect(required).to.include('city');
      expect(required).to.include('country');
    });
  });
});