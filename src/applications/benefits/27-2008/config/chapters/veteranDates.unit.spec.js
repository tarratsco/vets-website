import { expect } from 'chai';
import { veteranDatesUiSchema, veteranDatesSchema } from './veteranDates';

describe('chapters/veteranDates', () => {
  it('should export uiSchema and schema', () => {
    expect(veteranDatesUiSchema).to.be.an('object');
    expect(veteranDatesSchema).to.be.an('object');
  });

  it('uiSchema should have dateOfBirth, dateOfDeath, dateOfBurial', () => {
    const { veteranInformation } = veteranDatesUiSchema;
    expect(veteranInformation).to.have.property('dateOfBirth');
    expect(veteranInformation).to.have.property('dateOfDeath');
    expect(veteranInformation).to.have.property('dateOfBurial');
  });

  it('schema should require all three date fields', () => {
    const { required } = veteranDatesSchema.properties.veteranInformation;
    expect(required).to.include('dateOfBirth');
    expect(required).to.include('dateOfDeath');
    expect(required).to.include('dateOfBurial');
  });

  it('uiSchema validations should not throw on valid data', () => {
    const { veteranInformation } = veteranDatesUiSchema;
    const validations = veteranInformation['ui:validations'];
    expect(validations).to.be.an('array');
    const errors = {
      dateOfBurial: { addError: msg => {} },
      dateOfDeath: { addError: msg => {} },
    };
    const formData = {
      veteranInformation: {
        dateOfBirth: '1940-01-15',
        dateOfDeath: '2024-01-01',
        dateOfBurial: '2024-01-05',
      },
    };
    validations.forEach(fn => {
      expect(() => fn(errors, formData.veteranInformation, formData)).to.not.throw();
    });
  });

  it('burial date validation should add error when burial is before death', () => {
    const { veteranInformation } = veteranDatesUiSchema;
    const validations = veteranInformation['ui:validations'];
    const messages = [];
    const errors = {
      dateOfBurial: { addError: msg => messages.push(msg) },
      dateOfDeath: { addError: msg => messages.push(msg) },
    };
    const formData = {
      veteranInformation: {
        dateOfBirth: '1940-01-15',
        dateOfDeath: '2024-01-05',
        dateOfBurial: '2024-01-01',
      },
    };
    validations.forEach(fn => fn(errors, formData.veteranInformation, formData));
    expect(messages.length).to.be.greaterThan(0);
  });
});