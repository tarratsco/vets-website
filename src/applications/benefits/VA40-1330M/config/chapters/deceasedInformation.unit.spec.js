import { expect } from 'chai';
import {
  decedentPersonalInfoUiSchema,
  decedentPersonalInfoSchema,
  decedentServiceInfoUiSchema,
  decedentServiceInfoSchema,
  deathInformationUiSchema,
  deathInformationSchema,
  deceasedInformationPages,
  validateDateOfDeathAfterBirth,
  validateDateOfDeathNotFuture,
  validateServiceEntryBeforeDeath,
} from './deceasedInformation';

describe('deceasedInformation chapter', () => {
  let messages;
  let errors;

  beforeEach(() => {
    messages = [];
    errors = { addError: msg => messages.push(msg || '') };
  });

  describe('validateDateOfDeathAfterBirth', () => {
    it('adds error when death is before birth', () => {
      validateDateOfDeathAfterBirth(
        errors,
        '1990-01-01',
        { decedent: { dateOfBirth: '1995-01-01' } },
      );
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when death is after birth', () => {
      validateDateOfDeathAfterBirth(
        errors,
        '2023-06-15',
        { decedent: { dateOfBirth: '1990-01-01' } },
      );
      expect(messages).to.have.lengthOf(0);
    });

    it('does not throw when dates are missing', () => {
      expect(() =>
        validateDateOfDeathAfterBirth(errors, null, {}),
      ).to.not.throw();
      expect(messages).to.have.lengthOf(0);
    });
  });

  describe('validateDateOfDeathNotFuture', () => {
    it('adds error for future date', () => {
      validateDateOfDeathNotFuture(errors, '2099-01-01');
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error for past date', () => {
      validateDateOfDeathNotFuture(errors, '2020-01-01');
      expect(messages).to.have.lengthOf(0);
    });

    it('does not throw when date is null', () => {
      expect(() => validateDateOfDeathNotFuture(errors, null)).to.not.throw();
      expect(messages).to.have.lengthOf(0);
    });
  });

  describe('validateServiceEntryBeforeDeath', () => {
    it('adds error when service entry is after death', () => {
      validateServiceEntryBeforeDeath(
        errors,
        '2024-01-01',
        { decedent: { dateOfDeath: '2022-01-01' } },
      );
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when service entry is before death', () => {
      validateServiceEntryBeforeDeath(
        errors,
        '2010-01-01',
        { decedent: { dateOfDeath: '2023-06-15' } },
      );
      expect(messages).to.have.lengthOf(0);
    });

    it('does not throw when dates are missing', () => {
      expect(() =>
        validateServiceEntryBeforeDeath(errors, null, {}),
      ).to.not.throw();
    });
  });

  describe('decedentPersonalInfoUiSchema', () => {
    it('has decedent top-level key', () => {
      expect(decedentPersonalInfoUiSchema).to.have.property('decedent');
    });

    it('has name, ssn, dateOfBirth, dateOfDeath under decedent', () => {
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property('name');
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property('ssn');
      expect(decedentPersonalInfoUiSchema.decedent).to.have.property(
        'dateOfBirth',
      );
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
      const required =
        decedentPersonalInfoSchema.properties.decedent.required;
      expect(required).to.include('name');
      expect(required).to.include('ssn');
      expect(required).to.include('dateOfBirth');
      expect(required).to.include('dateOfDeath');
    });
  });

  describe('decedentServiceInfoSchema', () => {
    it('requires branchOfService, component, rankAtDeath, serviceEntryDate', () => {
      const required =
        decedentServiceInfoSchema.properties.decedent.properties.service
          .required;
      expect(required).to.include('branchOfService');
      expect(required).to.include('component');
      expect(required).to.include('rankAtDeath');
      expect(required).to.include('serviceEntryDate');
    });
  });

  describe('deathInformationSchema', () => {
    it('placeOfDeath requires city and country', () => {
      const required =
        deathInformationSchema.properties.decedent.properties.placeOfDeath
          .required;
      expect(required).to.include('city');
      expect(required).to.include('country');
    });
  });

  describe('deceasedInformationPages', () => {
    it('has three pages', () => {
      expect(deceasedInformationPages).to.have.property('decedentPersonalInfo');
      expect(deceasedInformationPages).to.have.property('decedentServiceInfo');
      expect(deceasedInformationPages).to.have.property('deathInformation');
    });

    it('pages have correct paths', () => {
      expect(deceasedInformationPages.decedentPersonalInfo.path).to.equal(
        'deceased-information/personal-info',
      );
      expect(deceasedInformationPages.decedentServiceInfo.path).to.equal(
        'deceased-information/service-info',
      );
      expect(deceasedInformationPages.deathInformation.path).to.equal(
        'deceased-information/death-information',
      );
    });
  });
});