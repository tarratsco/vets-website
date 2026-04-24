import { expect } from 'chai';

import {
  institutionInformationUiSchema,
  institutionInformationSchema,
} from './institutionInformation';

describe('institutionInformation page', () => {
  it('uiSchema has facilityCode field', () => {
    expect(
      institutionInformationUiSchema.institutionAndScoInformation.facilityCode,
    ).to.be.an('object');
  });

  it('uiSchema facilityCode has a title', () => {
    expect(
      institutionInformationUiSchema.institutionAndScoInformation.facilityCode[
        'ui:title'
      ],
    ).to.equal('VA Facility Code');
  });

  it('uiSchema has institutionName field', () => {
    expect(
      institutionInformationUiSchema.institutionAndScoInformation
        .institutionName,
    ).to.be.an('object');
  });

  it('schema requires facilityCode', () => {
    expect(
      institutionInformationSchema.properties.institutionAndScoInformation
        .required,
    ).to.include('facilityCode');
  });

  it('schema requires institutionName', () => {
    expect(
      institutionInformationSchema.properties.institutionAndScoInformation
        .required,
    ).to.include('institutionName');
  });

  it('facilityCode schema has pattern for 8 digits', () => {
    expect(
      institutionInformationSchema.properties.institutionAndScoInformation
        .properties.facilityCode.pattern,
    ).to.equal('^\\d{8}$');
  });

  it('schema institutionAddress has expected sub-properties', () => {
    const addrProps =
      institutionInformationSchema.properties.institutionAndScoInformation
        .properties.institutionAddress.properties;
    expect(addrProps).to.have.keys(['street', 'city', 'state', 'zip']);
  });
});