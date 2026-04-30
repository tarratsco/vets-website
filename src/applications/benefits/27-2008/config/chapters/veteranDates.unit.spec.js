import { expect } from 'chai';
import { veteranDatesUiSchema, veteranDatesSchema } from './veteranDates';

describe('chapters/veteranDates', () => {
  it('exports uiSchema and schema', () => {
    expect(veteranDatesUiSchema).to.be.an('object');
    expect(veteranDatesSchema).to.be.an('object');
  });

  it('has dateOfBirth, dateOfDeath, dateOfBurial in uiSchema', () => {
    const fields = veteranDatesUiSchema.veteranInformation;
    expect(fields.dateOfBirth).to.exist;
    expect(fields.dateOfDeath).to.exist;
    expect(fields.dateOfBurial).to.exist;
  });

  it('schema requires all three date fields', () => {
    const required = veteranDatesSchema.properties.veteranInformation.required;
    expect(required).to.include('dateOfBirth');
    expect(required).to.include('dateOfDeath');
    expect(required).to.include('dateOfBurial');
  });

  it('has ui:validations at the top level', () => {
    expect(veteranDatesUiSchema['ui:validations']).to.be.an('array');
    expect(veteranDatesUiSchema['ui:validations'].length).to.be.greaterThan(0);
  });

  describe('validateVeteranDates', () => {
    const validateFn = veteranDatesUiSchema['ui:validations'][0];

    it('does not add error when dob is before dod and dod is before burial', () => {
      const messages = [];
      const errors = {
        veteranInformation: {
          dateOfDeath: { addError: msg => messages.push(msg) },
          dateOfBurial: { addError: msg => messages.push(msg) },
        },
      };
      validateFn(errors, {
        veteranInformation: {
          dateOfBirth: '1940-01-01',
          dateOfDeath: '2024-01-01',
          dateOfBurial: '2024-01-10',
        },
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when dob is same as dod', () => {
      const messages = [];
      const errors = {
        veteranInformation: {
          dateOfDeath: { addError: msg => messages.push(msg) },
          dateOfBurial: { addError: msg => messages.push(msg) },
        },
      };
      validateFn(errors, {
        veteranInformation: {
          dateOfBirth: '2024-01-01',
          dateOfDeath: '2024-01-01',
          dateOfBurial: '2024-01-10',
        },
      });
      expect(messages.length).to.be.greaterThan(0);
    });

    it('adds error when burial date is before death date', () => {
      const messages = [];
      const errors = {
        veteranInformation: {
          dateOfDeath: { addError: msg => messages.push(msg) },
          dateOfBurial: { addError: msg => messages.push(msg) },
        },
      };
      validateFn(errors, {
        veteranInformation: {
          dateOfBirth: '1940-01-01',
          dateOfDeath: '2024-01-10',
          dateOfBurial: '2024-01-01',
        },
      });
      expect(messages.length).to.be.greaterThan(0);
    });

    it('does not throw when formData is empty', () => {
      const errors = {
        veteranInformation: {
          dateOfDeath: { addError: () => {} },
          dateOfBurial: { addError: () => {} },
        },
      };
      expect(() => validateFn(errors, {})).to.not.throw();
    });
  });
});