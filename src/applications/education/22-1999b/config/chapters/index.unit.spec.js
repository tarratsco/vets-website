import { expect } from 'chai';
import * as chapters from './index';

describe('chapter barrel export', () => {
  it('exports institutionInformationUiSchema', () => {
    expect(chapters.institutionInformationUiSchema).to.be.an('object');
  });

  it('exports scoContactInformationSchema', () => {
    expect(chapters.scoContactInformationSchema).to.be.an('object');
  });

  it('exports studentIdentificationUiSchema', () => {
    expect(chapters.studentIdentificationUiSchema).to.be.an('object');
  });

  it('exports priorCertificationReferenceSchema', () => {
    expect(chapters.priorCertificationReferenceSchema).to.be.an('object');
  });

  it('exports typeOfChangeUiSchema', () => {
    expect(chapters.typeOfChangeUiSchema).to.be.an('object');
  });

  it('exports supportingDocumentationUiSchema', () => {
    expect(chapters.supportingDocumentationUiSchema).to.be.an('object');
  });
});