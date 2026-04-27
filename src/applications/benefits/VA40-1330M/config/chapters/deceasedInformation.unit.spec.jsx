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
    it('has decedent object', () => {
      expect(decedentPersonalInfoUiSchema).to.have.property('decedent');
    });

    it('decedent has name', () => {
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property('name');
    });

    it('decedent has ssn', () => {
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property('ssn');
    });

    it('decedent has dateOfBirth', () => {
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property(
        'dateOfBirth',
      );
    });

    it('decedent has dateOfDeath', () => {
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property(
        'dateOfDeath',
      );
    });
  });

  describe('decedentPersonalInfoSchema', () => {
    it('requires decedent', () => {
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

  describe('decedentServiceInfoUiSchema', () => {
    it('has decedent.service object', () => {
      expect(decedentServiceInfoUiSchema.decedent).to.have.property('service');
    });

    it('service has branchOfService', () => {
      expect(
        decedentServiceInfoUiSchema.decedent.service,
      ).to.have.property('branchOfService');
    });

    it('service has rankAtDeath', () => {
      expect(
        decedentServiceInfoUiSchema.decedent.service,
      ).to.have.property('rankAtDeath');
    });

    it('service has serviceEntryDate', () => {
      expect(
        decedentServiceInfoUiSchema.decedent.service,
      ).to.have.property('serviceEntryDate');
    });
  });

  describe('decedentServiceInfoSchema', () => {
    it('service requires branchOfService', () => {
      const { required } =
        decedentServiceInfoSchema.properties.decedent.properties.service;
      expect(required).to.include('branchOfService');
    });

    it('service requires rankAtDeath', () => {
      const { required } =
        decedentServiceInfoSchema.properties.decedent.properties.service;
      expect(required).to.include('rankAtDeath');
    });

    it('service requires serviceEntryDate', () => {
      const { required } =
        decedentServiceInfoSchema.properties.decedent.properties.service;
      expect(required).to.include('serviceEntryDate');
    });

    it('branchOfService has enum values', () => {
      const { enum: enumVals } =
        decedentServiceInfoSchema.properties.decedent.properties.service
          .properties.branchOfService;
      expect(enumVals).to.include('army');
      expect(enumVals).to.include('navy');
      expect(enumVals).to.include('airForce');
    });
  });

  describe('deathInformationUiSchema', () => {
    it('has decedent.placeOfDeath', () => {
      expect(deathInformationUiSchema.decedent).to.have.property(
        'placeOfDeath',
      );
    });

    it('placeOfDeath has city', () => {
      expect(
        deathInformationUiSchema.decedent.placeOfDeath,
      ).to.have.property('city');
    });

    it('placeOfDeath has country', () => {
      expect(
        deathInformationUiSchema.decedent.placeOfDeath,
      ).to.have.property('country');
    });
  });

  describe('deathInformationSchema', () => {
    it('placeOfDeath requires city and country', () => {
      const { required } =
        deathInformationSchema.properties.decedent.properties.placeOfDeath;
      expect(required).to.include('city');
      expect(required).to.include('country');
    });
  });

  describe('depends functions', () => {
    it('evaluates without throwing for valid data', () => {
      const depends = formData =>
        formData.serviceStatusAtDeath === 'guardOrReserve';
      expect(() => depends({ serviceStatusAtDeath: 'activeDuty' })).to.not
        .throw;
      expect(() => depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.not
        .throw;
      expect(() => depends({})).to.not.throw;
    });
  });
});