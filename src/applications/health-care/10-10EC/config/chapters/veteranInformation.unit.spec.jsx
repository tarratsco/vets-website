import { expect } from 'chai';
import {
  veteranInformationUiSchema,
  veteranInformationSchema,
} from './veteranInformation';

describe('veteranInformation page', () => {
  it('exports uiSchema and schema', () => {
    expect(veteranInformationUiSchema).to.be.an('object');
    expect(veteranInformationSchema).to.be.an('object');
  });

  it('uiSchema has veteranFullName and veteranSsn', () => {
    expect(veteranInformationUiSchema.veteranFullName).to.be.an('object');
    expect(veteranInformationUiSchema.veteranSsn).to.be.an('object');
  });

  it('schema requires veteranFullName and veteranSsn', () => {
    expect(veteranInformationSchema.required).to.include('veteranFullName');
    expect(veteranInformationSchema.required).to.include('veteranSsn');
  });

  it('first name is required', () => {
    const required =
      veteranInformationUiSchema.veteranFullName.first['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('middle name is not required', () => {
    const required =
      veteranInformationUiSchema.veteranFullName.middle['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.false;
  });

  it('last name is required', () => {
    const required =
      veteranInformationUiSchema.veteranFullName.last['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });
});