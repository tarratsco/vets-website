import { expect } from 'chai';
import transformForSubmit from './transform';

describe('transformForSubmit', () => {
  const mockFormConfig = {};

  it('returns a JSON string', () => {
    const form = { data: { maritalStatus: 'single_no_dependent' } };
    const result = transformForSubmit(mockFormConfig, form);
    expect(result).to.be.a('string');
    expect(() => JSON.parse(result)).to.not.throw();
  });

  it('strips hyphens from veteran SSN', () => {
    const form = {
      data: {
        veteranSsn: '123-45-6789',
        maritalStatus: 'single_no_dependent',
      },
    };
    const parsed = JSON.parse(transformForSubmit(mockFormConfig, form));
    expect(
      parsed.extendedCareApplication.formData.sectionI.veteranSsn,
    ).to.equal('123456789');
  });

  it('sets applicable false for sectionV when care type is non_institutional', () => {
    const form = {
      data: {
        maritalStatus: 'single_no_dependent',
        financialDisclosureElection: 'yes',
        careType: 'non_institutional',
      },
    };
    const parsed = JSON.parse(transformForSubmit(mockFormConfig, form));
    expect(parsed.extendedCareApplication.formData.sectionV.applicable).to.be
      .false;
  });

  it('sets applicable true for sectionV when institutional and disclosure yes', () => {
    const form = {
      data: {
        maritalStatus: 'single_no_dependent',
        financialDisclosureElection: 'yes',
        careType: 'institutional',
      },
    };
    const parsed = JSON.parse(transformForSubmit(mockFormConfig, form));
    expect(parsed.extendedCareApplication.formData.sectionV.applicable).to.be
      .true;
  });

  it('parses currency values correctly', () => {
    const form = {
      data: {
        maritalStatus: 'single_no_dependent',
        financialDisclosureElection: 'yes',
        careType: 'institutional',
        fixedAssetsVeteranPrimaryResidence: '100000.50',
      },
    };
    const parsed = JSON.parse(transformForSubmit(mockFormConfig, form));
    expect(
      parsed.extendedCareApplication.formData.sectionV.veteran.primaryResidence,
    ).to.equal(100000.5);
  });

  it('sets poa submission false when submitter is veteran', () => {
    const form = {
      data: {
        maritalStatus: 'single_no_dependent',
        submitterType: 'veteran',
      },
    };
    const parsed = JSON.parse(transformForSubmit(mockFormConfig, form));
    expect(
      parsed.extendedCareApplication.formData.poa.isPoaSubmission,
    ).to.be.false;
  });

  it('sets poa submission true when submitter is poa_representative', () => {
    const form = {
      data: {
        maritalStatus: 'single_no_dependent',
        submitterType: 'poa_representative',
      },
    };
    const parsed = JSON.parse(transformForSubmit(mockFormConfig, form));
    expect(
      parsed.extendedCareApplication.formData.poa.isPoaSubmission,
    ).to.be.true;
  });
});