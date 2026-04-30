import { expect } from 'chai';
import { veteranNameUiSchema, veteranNameSchema } from './veteranName';

describe('chapters/veteranName', () => {
  it('exports uiSchema', () => {
    expect(veteranNameUiSchema).to.be.an('object');
    expect(veteranNameUiSchema.veteranInformation).to.exist;
  });

  it('has fields for first, middle, last, and maidenOrOtherName', () => {
    const fields = veteranNameUiSchema.veteranInformation;
    expect(fields.firstName).to.exist;
    expect(fields.middleName).to.exist;
    expect(fields.lastName).to.exist;
    expect(fields.maidenOrOtherName).to.exist;
  });

  it('schema requires firstName and lastName', () => {
    const required =
      veteranNameSchema.properties.veteranInformation.required;
    expect(required).to.include('firstName');
    expect(required).to.include('lastName');
    expect(required).to.not.include('middleName');
    expect(required).to.not.include('maidenOrOtherName');
  });

  it('schema has maxLength constraints', () => {
    const props =
      veteranNameSchema.properties.veteranInformation.properties;
    expect(props.firstName.maxLength).to.equal(30);
    expect(props.lastName.maxLength).to.equal(30);
    expect(props.maidenOrOtherName.maxLength).to.equal(60);
  });
});