import { expect } from 'chai';
import { veteranDatesUiSchema, veteranDatesSchema } from './veteranDates';

describe('veteranDates page', () => {
  it('uiSchema has veteranInformation group with date fields', () => {
    const vi = veteranDatesUiSchema.veteranInformation;
    expect(vi).to.have.property('dateOfBirth');
    expect(vi).to.have.property('dateOfDeath');
    expect(vi).to.have.property('dateOfBurial');
  });

  it('schema requires dateOfBirth, dateOfDeath, dateOfBurial', () => {
    const vi = veteranDatesSchema.properties.veteranInformation;
    expect(vi.required).to.include('dateOfBirth');
    expect(vi.required).to.include('dateOfDeath');
    expect(vi.required).to.include('dateOfBurial');
  });

  it('dateOfBurial uiSchema has validations array', () => {
    const vi = veteranDatesUiSchema.veteranInformation;
    expect(vi.dateOfBurial['ui:validations']).to.be.an('array');
    expect(vi.dateOfBurial['ui:validations'].length).to.be.greaterThan(0);
  });

  it('dateOfBurial validation adds error when burial before death', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const [validate] = veteranDatesUiSchema.veteranInformation.dateOfBurial['ui:validations'];
    validate(
      errors,
      '2020-01-01',
      { veteranInformation: { dateOfDeath: '2020-06-01' } },
    );
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.include('burial');
  });

  it('dateOfBurial validation passes when burial on or after death', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const [validate] = veteranDatesUiSchema.veteranInformation.dateOfBurial['ui:validations'];
    validate(
      errors,
      '2020-06-05',
      { veteranInformation: { dateOfDeath: '2020-06-01' } },
    );
    expect(messages.length).to.equal(0);
  });

  it('dateOfBurial validation passes when dateOfDeath is missing', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const [validate] = veteranDatesUiSchema.veteranInformation.dateOfBurial['ui:validations'];
    validate(errors, '2020-06-05', { veteranInformation: {} });
    expect(messages.length).to.equal(0);
  });
});