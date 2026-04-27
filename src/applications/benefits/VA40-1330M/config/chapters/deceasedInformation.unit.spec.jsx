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
  describe('decedentPersonalInfo page', () => {
    it('exports uiSchema and schema', () => {
      expect(decedentPersonalInfoUiSchema).to.be.an('object');
      expect(decedentPersonalInfoSchema).to.be.an('object');
    });

    it('schema requires decedent', () => {
      expect(decedentPersonalInfoSchema.required).to.include('decedent');
    });

    it('decedent schema requires name, ssn, dateOfBirth, dateOfDeath', () => {
      const { required } = decedentPersonalInfoSchema.properties.decedent;
      expect(required).to.include('name');
      expect(required).to.include('ssn');
      expect(required).to.include('dateOfBirth');
      expect(required).to.include('dateOfDeath');
    });
  });

  describe('decedentServiceInfo page', () => {
    it('exports uiSchema and schema', () => {
      expect(decedentServiceInfoUiSchema).to.be.an('object');
      expect(decedentServiceInfoSchema).to.be.an('object');
    });

    it('schema requires decedent service fields', () => {
      const serviceRequired =
        decedentServiceInfoSchema.properties.decedent.properties.service.required;
      expect(serviceRequired).to.include('branchOfService');
      expect(serviceRequired).to.include('component');
      expect(serviceRequired).to.include('rankAtDeath');
      expect(serviceRequired).to.include('serviceEntryDate');
    });

    it('component enum has active, guard, reserve', () => {
      const componentEnum =
        decedentServiceInfoSchema.properties.decedent.properties.service
          .properties.component.enum;
      expect(componentEnum).to.include('active');
      expect(componentEnum).to.include('guard');
      expect(componentEnum).to.include('reserve');
    });
  });

  describe('deathInformation page', () => {
    it('exports uiSchema and schema', () => {
      expect(deathInformationUiSchema).to.be.an('object');
      expect(deathInformationSchema).to.be.an('object');
    });

    it('placeOfDeath schema requires city and country', () => {
      const { required } =
        deathInformationSchema.properties.decedent.properties.placeOfDeath;
      expect(required).to.include('city');
      expect(required).to.include('country');
    });
  });
});