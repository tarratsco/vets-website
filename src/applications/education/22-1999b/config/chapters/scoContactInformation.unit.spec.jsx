import { expect } from 'chai';

import {
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from './scoContactInformation';

describe('scoContactInformation page', () => {
  it('uiSchema has scoFirstName field', () => {
    expect(
      scoContactInformationUiSchema.institutionAndScoInformation.scoFirstName,
    ).to.be.an('object');
  });

  it('uiSchema scoFirstName has correct title', () => {
    expect(
      scoContactInformationUiSchema.institutionAndScoInformation.scoFirstName[
        'ui:title'
      ],
    ).to.equal('Your first name');
  });

  it('uiSchema has scoPhone field', () => {
    expect(
      scoContactInformationUiSchema.institutionAndScoInformation.scoPhone,
    ).to.be.an('object');
  });

  it('uiSchema has scoEmail field', () => {
    expect(
      scoContactInformationUiSchema.institutionAndScoInformation.scoEmail,
    ).to.be.an('object');
  });

  it('schema requires scoFirstName, scoLastName, scoPhone, scoEmail', () => {
    const required =
      scoContactInformationSchema.properties.institutionAndScoInformation
        .required;
    expect(required).to.include('scoFirstName');
    expect(required).to.include('scoLastName');
    expect(required).to.include('scoPhone');
    expect(required).to.include('scoEmail');
  });

  it('scoTitle is optional in schema', () => {
    const required =
      scoContactInformationSchema.properties.institutionAndScoInformation
        .required;
    expect(required).to.not.include('scoTitle');
  });
});