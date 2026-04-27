import { expect } from 'chai';
import { maritalStatusUiSchema, maritalStatusSchema } from './maritalStatus';

describe('maritalStatus page', () => {
  it('exports uiSchema and schema', () => {
    expect(maritalStatusUiSchema).to.be.an('object');
    expect(maritalStatusSchema).to.be.an('object');
  });

  it('maritalStatus is required', () => {
    const required = maritalStatusUiSchema.maritalStatus['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('schema includes all 6 marital status enum values', () => {
    const { enum: values } = maritalStatusSchema.properties.maritalStatus;
    expect(values).to.include('single_with_dependent');
    expect(values).to.include('single_no_dependent');
    expect(values).to.include('married_living_with');
    expect(values).to.include('married_separate_not_institutionalized');
    expect(values).to.include('married_separate_institutionalized');
    expect(values).to.include('divorced_separated_widowed_this_year');
    expect(values).to.have.lengthOf(6);
  });

  it('schema requires maritalStatus', () => {
    expect(maritalStatusSchema.required).to.include('maritalStatus');
  });
});