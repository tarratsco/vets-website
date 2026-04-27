import { expect } from 'chai';
import {
  spouseInformationUiSchema,
  spouseInformationSchema,
} from './spouseInformation';

describe('spouseInformation page', () => {
  it('exports uiSchema and schema', () => {
    expect(spouseInformationUiSchema).to.be.an('object');
    expect(spouseInformationSchema).to.be.an('object');
  });

  it('spouseFullName first is required', () => {
    const required =
      spouseInformationUiSchema.spouseFullName.first['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('spouseFullName last is required', () => {
    const required =
      spouseInformationUiSchema.spouseFullName.last['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('spouseSsn is required', () => {
    const required = spouseInformationUiSchema.spouseSsn['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('spouseDateOfBirth is required', () => {
    const required = spouseInformationUiSchema.spouseDateOfBirth['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('dateOfMarriage is required', () => {
    const required = spouseInformationUiSchema.dateOfMarriage['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('dateOfLegalSeparationOrDivorce is not required', () => {
    const required =
      spouseInformationUiSchema.dateOfLegalSeparationOrDivorce['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.false;
  });

  it('schema requires core spouse fields', () => {
    expect(spouseInformationSchema.required).to.include('spouseFullName');
    expect(spouseInformationSchema.required).to.include('spouseSsn');
    expect(spouseInformationSchema.required).to.include('spouseDateOfBirth');
    expect(spouseInformationSchema.required).to.include('dateOfMarriage');
  });
});