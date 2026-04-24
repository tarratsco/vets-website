import { expect } from 'chai';

import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
} from './studentIdentification';

describe('studentIdentification page', () => {
  it('uiSchema has studentFirstName field', () => {
    expect(
      studentIdentificationUiSchema.studentAndPriorCertification
        .studentFirstName,
    ).to.be.an('object');
  });

  it('uiSchema has ssnOrFileNumberIndicator radio', () => {
    const field =
      studentIdentificationUiSchema.studentAndPriorCertification
        .ssnOrFileNumberIndicator;
    expect(field).to.be.an('object');
    expect(field['ui:title']).to.be.a('string');
  });

  it('uiSchema has benefitChapter select', () => {
    expect(
      studentIdentificationUiSchema.studentAndPriorCertification
        .benefitChapter,
    ).to.be.an('object');
  });

  it('schema requires studentFirstName and studentLastName', () => {
    const required =
      studentIdentificationSchema.properties.studentAndPriorCertification
        .required;
    expect(required).to.include('studentFirstName');
    expect(required).to.include('studentLastName');
  });

  it('schema requires ssnOrFileNumberIndicator', () => {
    const required =
      studentIdentificationSchema.properties.studentAndPriorCertification
        .required;
    expect(required).to.include('ssnOrFileNumberIndicator');
  });

  it('schema requires benefitChapter', () => {
    const required =
      studentIdentificationSchema.properties.studentAndPriorCertification
        .required;
    expect(required).to.include('benefitChapter');
  });

  it('studentSsn has correct pattern', () => {
    const pattern =
      studentIdentificationSchema.properties.studentAndPriorCertification
        .properties.studentSsn.pattern;
    expect(pattern).to.equal('^\\d{9}$');
  });
});