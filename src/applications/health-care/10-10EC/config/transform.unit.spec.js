import { expect } from 'chai';
import { transform } from './transform';

const makeMinimalFormData = (overrides = {}) => ({
  veteranFullName: { first: 'John', middle: 'A', last: 'Smith' },
  veteranSocialSecurityNumber: '123-45-6789',
  hasCurrentInsurance: false,
  maritalStatus: 'single_no_dependent',
  financialDisclosureElection: 'no',
  submitterType: 'veteran',
  ...overrides,
});

const makeForm = (dataOverrides = {}) => ({
  data: makeMinimalFormData(dataOverrides),
});

const formConfig = {};

describe('config/transform', () => {
  it('returns a JSON string', () => {
    const result = transform(formConfig, makeForm());
    expect(result).to.be.a('string');
    expect(() => JSON.parse(result)).to.not.throw();
  });

  it('includes section_i with veteran name and SSN', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_i.veteran_full_name.first).to.equal('John');
    expect(result.form_data.section_i.veteran_full_name.last).to.equal('Smith');
    expect(result.form_data.section_i.veteran_ssn).to.equal('123456789');
  });

  it('strips hyphens from SSN', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_i.veteran_ssn).to.not.include('-');
  });

  it('includes section_ii with has_current_insurance false', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_ii.has_current_insurance).to.equal(false);
  });

  it('includes section_iv with financial_disclosure_election', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_iv.financial_disclosure_election).to.equal('no');
  });

  it('omits section_vii when financial disclosure is no', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_vii).to.be.null;
  });

  it('omits section_viii when financial disclosure is no', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_viii).to.be.null;
  });

  it('sets section_v applicable false for non-institutional', () => {
    const result = JSON.parse(
      transform(
        formConfig,
        makeForm({
          financialDisclosureElection: 'yes',
          careType: 'non_institutional',
        }),
      ),
    );
    expect(result.form_data.section_v.applicable).to.equal(false);
  });

  it('sets section_v applicable true for institutional', () => {
    const result = JSON.parse(
      transform(
        formConfig,
        makeForm({
          financialDisclosureElection: 'yes',
          careType: 'institutional',
          veteranPrimaryResidence: '150000',
        }),
      ),
    );
    expect(result.form_data.section_v.applicable).to.equal(true);
  });

  it('includes poa block with is_poa_submission false for veteran', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.poa.is_poa_submission).to.equal(false);
  });

  it('includes poa block with is_poa_submission true for poa representative', () => {
    const result = JSON.parse(
      transform(formConfig, makeForm({ submitterType: 'poa_representative' })),
    );
    expect(result.form_data.poa.is_poa_submission).to.equal(true);
  });

  it('includes submission_metadata with correct values', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.submission_metadata.form_version).to.equal('MAY 2025');
    expect(result.form_data.submission_metadata.submission_source).to.equal('va.gov_digital');
  });

  it('includes attestation block with attested true', () => {
    const result = JSON.parse(transform(formConfig, makeForm()));
    expect(result.form_data.section_ix_xi_attestation.attested).to.equal(true);
  });

  it('includes section_vii when financial disclosure is yes', () => {
    const result = JSON.parse(
      transform(
        formConfig,
        makeForm({
          financialDisclosureElection: 'yes',
          careType: 'non_institutional',
          veteranEmploymentIncome: '3000',
          veteranEmploymentIncomeFrequency: 'monthly',
        }),
      ),
    );
    expect(result.form_data.section_vii).to.not.be.null;
    expect(result.form_data.section_vii.veteran.employment_income.amount).to.equal(3000);
    expect(result.form_data.section_vii.veteran.employment_income.frequency).to.equal('monthly');
  });

  it('excludes spouse financials for divorced status', () => {
    const result = JSON.parse(
      transform(
        formConfig,
        makeForm({
          financialDisclosureElection: 'yes',
          careType: 'institutional',
          maritalStatus: 'divorced_separated_widowed_this_year',
        }),
      ),
    );
    expect(result.form_data.section_vii.spouse).to.be.null;
  });

  it('parseCurrency converts string to float', () => {
    const result = JSON.parse(
      transform(
        formConfig,
        makeForm({
          financialDisclosureElection: 'yes',
          careType: 'non_institutional',
          veteranOtherIncome: '1500.50',
          veteranOtherIncomeFrequency: 'monthly',
        }),
      ),
    );
    expect(result.form_data.section_vii.veteran.other_income.amount).to.equal(1500.5);
  });
});