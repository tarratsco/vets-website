import { expect } from 'chai';
import {
  grossIncomeSpouseUiSchema,
  grossIncomeSpouseSchema,
} from './grossIncomeSpouse';

describe('grossIncomeSpouse page', () => {
  it('exports uiSchema and schema', () => {
    expect(grossIncomeSpouseUiSchema).to.be.an('object');
    expect(grossIncomeSpouseSchema).to.be.an('object');
  });

  it('employment income for spouse is not required', () => {
    const required =
      grossIncomeSpouseUiSchema.employmentIncomeSpouse['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.false;
  });

  it('employment frequency is required when spouse amount is greater than 0', () => {
    const required =
      grossIncomeSpouseUiSchema.employmentIncomeFrequencySpouse['ui:required'];
    expect(required).to.be.a('function');
    expect(required({ employmentIncomeSpouse: '2000' })).to.be.true;
    expect(required({ employmentIncomeSpouse: '0' })).to.be.false;
    expect(required({})).to.be.false;
  });

  it('schema has all spouse income and frequency properties', () => {
    const { properties } = grossIncomeSpouseSchema;
    expect(properties).to.have.key('employmentIncomeSpouse');
    expect(properties).to.have.key('employmentIncomeFrequencySpouse');
    expect(properties).to.have.key('businessIncomeSpouse');
    expect(properties).to.have.key('businessIncomeFrequencySpouse');
    expect(properties).to.have.key('otherIncomeSpouse');
    expect(properties).to.have.key('otherIncomeFrequencySpouse');
  });
});