import { expect } from 'chai';
import {
  dependentInformationUiSchema,
  dependentInformationSchema,
} from './dependentInformation';

describe('dependentInformation page', () => {
  it('exports uiSchema and schema', () => {
    expect(dependentInformationUiSchema).to.be.an('object');
    expect(dependentInformationSchema).to.be.an('object');
  });

  it('dependents schema is an array type', () => {
    expect(dependentInformationSchema.properties.dependents.type).to.equal(
      'array',
    );
  });

  it('dependent items require fullName, ssn, and dateOfBirth', () => {
    const { required } =
      dependentInformationSchema.properties.dependents.items;
    expect(required).to.include('fullName');
    expect(required).to.include('ssn');
    expect(required).to.include('dateOfBirth');
  });

  it('dependent items fullName requires first and last', () => {
    const { required } =
      dependentInformationSchema.properties.dependents.items.properties
        .fullName;
    expect(required).to.include('first');
    expect(required).to.include('last');
  });

  it('dependent first name is required', () => {
    const required =
      dependentInformationUiSchema.dependents.items.fullName.first[
        'ui:required'
      ];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('dependent SSN is required', () => {
    const required =
      dependentInformationUiSchema.dependents.items.ssn['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });
});