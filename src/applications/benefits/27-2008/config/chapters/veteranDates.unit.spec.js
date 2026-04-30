import { expect } from 'chai';
import { veteranDatesUiSchema, veteranDatesSchema } from './veteranDates';

describe('veteranDates page', () => {
  describe('uiSchema', () => {
    it('has veteranInformation group', () => {
      expect(veteranDatesUiSchema.veteranInformation).to.be.an('object');
    });

    it('has dateOfBirth field', () => {
      expect(veteranDatesUiSchema.veteranInformation.dateOfBirth).to.be.an(
        'object',
      );
    });

    it('has dateOfDeath field', () => {
      expect(veteranDatesUiSchema.veteranInformation.dateOfDeath).to.be.an(
        'object',
      );
    });

    it('has dateOfBurial field', () => {
      expect(veteranDatesUiSchema.veteranInformation.dateOfBurial).to.be.an(
        'object',
      );
    });
  });

  describe('schema', () => {
    it('requires dateOfBirth, dateOfDeath, dateOfBurial', () => {
      const required =
        veteranDatesSchema.properties.veteranInformation.required;
      expect(required).to.include('dateOfBirth');
      expect(required).to.include('dateOfDeath');
      expect(required).to.include('dateOfBurial');
    });
  });

  describe('validateVeteranDates', () => {
    let dodMessages;
    let dobMessages;
    const makeErrors = () => {
      dodMessages = [];
      dobMessages = [];
      return {
        veteranInformation: {
          dateOfDeath: {
            addError: msg => dodMessages.push(msg || ''),
          },
          dateOfBurial: {
            addError: msg => dobMessages.push(msg || ''),
          },
        },
      };
    };

    it('does not add errors for valid chronological dates', () => {
      const errors = makeErrors();
      const validations = veteranDatesUiSchema['ui:validations'];
      expect(validations).to.be.an('array');
      validations.forEach(fn => {
        fn(errors, {
          veteranInformation: {
            dateOfBirth: '1940-01-01',
            dateOfDeath: '2024-01-01',
            dateOfBurial: '2024-01-10',
          },
        });
      });
      expect(dodMessages).to.have.lengthOf(0);
      expect(dobMessages).to.have.lengthOf(0);
    });

    it('adds error when date of death is before date of birth', () => {
      const errors = makeErrors();
      const validations = veteranDatesUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          veteranInformation: {
            dateOfBirth: '2000-01-01',
            dateOfDeath: '1990-01-01',
            dateOfBurial: '1990-01-10',
          },
        });
      });
      expect(dodMessages).to.have.lengthOf(1);
    });

    it('adds error when date of burial is before date of death', () => {
      const errors = makeErrors();
      const validations = veteranDatesUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          veteranInformation: {
            dateOfBirth: '1940-01-01',
            dateOfDeath: '2024-01-10',
            dateOfBurial: '2024-01-01',
          },
        });
      });
      expect(dobMessages).to.have.lengthOf(1);
    });
  });
});