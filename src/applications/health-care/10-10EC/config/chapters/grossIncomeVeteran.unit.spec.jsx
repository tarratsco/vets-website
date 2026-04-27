import { expect } from 'chai';
import {
  grossIncomeVeteranUiSchema,
  grossIncomeVeteranSchema,
} from './grossIncomeVeteran';

describe('grossIncomeVeteran page', () => {
  it('exports uiSchema and schema', () => {
    expect(grossIncomeVeteranUiSchema).to.be.an('object');
    expect(grossIncomeVeteranSchema).to.be.an('object');
  });

  it('employment income is not required', () => {
    const required =
      grossIncomeVeteranUiSchema.employmentIncomeVeteran['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.false;
  });

  it('employment frequency is required when amount is greater than 0', () => {
    const required =
      grossIncomeVeteranUiSchema.employmentIncomeFrequencyVeteran['ui:required'];
    expect(required).to.be.a('function');
    expect(required({ employmentIncomeVeteran: '1000' })).to.be.true;
    expect(required({ employmentIncomeVeteran: '0' })).to.be.false;
    expect(required({ employmentIncomeVeteran: '' })).to.be.false;
    expect(required({})).to.be.false;
  });

  it('business frequency is required when business income is greater than 0', () => {
    const required =
      grossIncomeVeteranUiSchema.businessIncomeFrequencyVeteran['ui:required'];
    expect(required({ businessIncomeVeteran: '500' })).to.be.true;
    expect(required({ businessIncomeVeteran: '0' })).to.be.false;
    expect(required({})).to.be.false;
  });

  it('other income frequency is required when other income is greater than 0', () => {
    const required =
      grossIncomeVeteranUiSchema.otherIncomeFrequencyVeteran['ui:required'];
    expect(required({ otherIncomeVeteran: '200' })).to.be.true;
    expect(required({ otherIncomeVeteran: '0' })).to.be.false;
  });

  it('schema has all income and frequency properties', () => {
    const { properties } = grossIncomeVeteranSchema;
    expect(properties).to.have.key('employmentIncomeVeteran');
    expect(properties).to.have.key('employmentIncomeFrequencyVeteran');
    expect(properties).to.have.key('businessIncomeVeteran');
    expect(properties).to.have.key('businessIncomeFrequencyVeteran');
    expect(properties).to.have.key('otherIncomeVeteran');
    expect(properties).to.have.key('otherIncomeFrequencyVeteran');
  });

  it('frequency schema includes all frequency enum values', () => {
    const { enum: values } =
      grossIncomeVeteranSchema.properties.employmentIncomeFrequencyVeteran;
    expect(values).to.include('annually');
    expect(values).to.include('monthly');
    expect(values).to.include('twice_monthly');
    expect(values).to.include('bi_weekly');
    expect(values).to.include('weekly');
  });
});