import { expect } from 'chai';
import { veteranNameUiSchema, veteranNameSchema } from './veteranName';

describe('veteranName page', () => {
  it('uiSchema has veteranInformation group', () => {
    expect(veteranNameUiSchema).to.have.property('veteranInformation');
  });

  it('uiSchema has firstName, middleName, lastName, maidenOrOtherName', () => {
    const vi = veteranNameUiSchema.veteranInformation;
    expect(vi).to.have.property('firstName');
    expect(vi).to.have.property('middleName');
    expect(vi).to.have.property('lastName');
    expect(vi).to.have.property('maidenOrOtherName');
  });

  it('schema requires firstName and lastName', () => {
    const vi = veteranNameSchema.properties.veteranInformation;
    expect(vi.required).to.include('firstName');
    expect(vi.required).to.include('lastName');
    expect(vi.required).to.not.include('middleName');
  });

  it('schema has maxLength constraints', () => {
    const props = veteranNameSchema.properties.veteranInformation.properties;
    expect(props.firstName.maxLength).to.equal(30);
    expect(props.lastName.maxLength).to.equal(30);
    expect(props.maidenOrOtherName.maxLength).to.equal(60);
  });
});