import { expect } from 'chai';
import { veteranNameUiSchema, veteranNameSchema } from './veteranName';

describe('chapters/veteranName', () => {
  it('should export uiSchema and schema', () => {
    expect(veteranNameUiSchema).to.be.an('object');
    expect(veteranNameSchema).to.be.an('object');
  });

  it('uiSchema should have veteranInformation group', () => {
    expect(veteranNameUiSchema).to.have.property('veteranInformation');
  });

  it('uiSchema veteranInformation should have firstName, middleName, lastName', () => {
    const { veteranInformation } = veteranNameUiSchema;
    expect(veteranInformation).to.have.property('firstName');
    expect(veteranInformation).to.have.property('middleName');
    expect(veteranInformation).to.have.property('lastName');
  });

  it('schema should require firstName and lastName', () => {
    const { required } = veteranNameSchema.properties.veteranInformation;
    expect(required).to.include('firstName');
    expect(required).to.include('lastName');
    expect(required).to.not.include('middleName');
  });

  it('schema firstName maxLength should be 30', () => {
    const { firstName } = veteranNameSchema.properties.veteranInformation.properties;
    expect(firstName.maxLength).to.equal(30);
  });
});