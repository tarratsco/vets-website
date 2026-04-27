import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig.formId).to.equal('10-10EC');
    expect(formConfig.title).to.be.a('string');
    expect(formConfig.chapters).to.be.an('object');
    expect(formConfig.introduction).to.be.a('function');
    expect(formConfig.confirmation).to.be.a('function');
    expect(formConfig.transformForSubmit).to.be.a('function');
    expect(formConfig.trackingPrefix).to.be.a('string');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has chapters with pages that have required fields', () => {
    Object.values(formConfig.chapters).forEach(chapter => {
      expect(chapter.pages).to.be.an('object');
      Object.values(chapter.pages).forEach(page => {
        expect(page.path).to.be.a('string');
        expect(page.title).to.be.a('string');
        expect(page.uiSchema).to.be.an('object');
        expect(page.schema).to.be.an('object');
      });
    });
  });

  it('spouseInformation depends returns true for married statuses', () => {
    const page = formConfig.chapters.spouseInformationChapter.pages.spouseInformation;
    expect(() =>
      page.depends({ maritalStatus: 'married_living_with' }),
    ).to.not.throw();
    expect(page.depends({ maritalStatus: 'married_living_with' })).to.be.true;
    expect(
      page.depends({ maritalStatus: 'married_separate_not_institutionalized' }),
    ).to.be.true;
    expect(page.depends({ maritalStatus: 'single_no_dependent' })).to.be.false;
    expect(page.depends({})).to.be.false;
    expect(page.depends(null)).to.not.throw;
  });

  it('dependentInformation depends returns false only for single_no_dependent', () => {
    const page =
      formConfig.chapters.dependentInformationChapter.pages.dependentInformation;
    expect(() =>
      page.depends({ maritalStatus: 'single_no_dependent' }),
    ).to.not.throw();
    expect(page.depends({ maritalStatus: 'single_no_dependent' })).to.be.false;
    expect(page.depends({ maritalStatus: 'single_with_dependent' })).to.be.true;
    expect(page.depends({})).to.be.true;
  });

  it('careType depends requires financialDisclosureElection yes', () => {
    const page = formConfig.chapters.careTypeChapter.pages.careType;
    expect(() =>
      page.depends({ financialDisclosureElection: 'yes' }),
    ).to.not.throw();
    expect(page.depends({ financialDisclosureElection: 'yes' })).to.be.true;
    expect(page.depends({ financialDisclosureElection: 'no' })).to.be.false;
    expect(page.depends({})).to.be.false;
  });

  it('fixedAssets depends requires institutional care and yes disclosure', () => {
    const page = formConfig.chapters.fixedAssetsChapter.pages.fixedAssets;
    expect(() =>
      page.depends({
        financialDisclosureElection: 'yes',
        careType: 'institutional',
      }),
    ).to.not.throw();
    expect(
      page.depends({
        financialDisclosureElection: 'yes',
        careType: 'institutional',
      }),
    ).to.be.true;
    expect(
      page.depends({
        financialDisclosureElection: 'yes',
        careType: 'non_institutional',
      }),
    ).to.be.false;
    expect(
      page.depends({
        financialDisclosureElection: 'no',
        careType: 'institutional',
      }),
    ).to.be.false;
    expect(page.depends({})).to.be.false;
  });

  it('liquidAssets depends requires institutional care and yes disclosure', () => {
    const page = formConfig.chapters.liquidAssetsChapter.pages.liquidAssets;
    expect(() =>
      page.depends({
        financialDisclosureElection: 'yes',
        careType: 'institutional',
      }),
    ).to.not.throw();
    expect(
      page.depends({
        financialDisclosureElection: 'yes',
        careType: 'institutional',
      }),
    ).to.be.true;
    expect(
      page.depends({
        financialDisclosureElection: 'no',
        careType: 'institutional',
      }),
    ).to.be.false;
  });

  it('grossIncomeVeteran depends requires yes disclosure', () => {
    const page =
      formConfig.chapters.grossIncomeVeteranChapter.pages.grossIncomeVeteran;
    expect(() =>
      page.depends({ financialDisclosureElection: 'yes' }),
    ).to.not.throw();
    expect(page.depends({ financialDisclosureElection: 'yes' })).to.be.true;
    expect(page.depends({ financialDisclosureElection: 'no' })).to.be.false;
    expect(page.depends({})).to.be.false;
  });

  it('grossIncomeSpouse depends requires yes disclosure and married status', () => {
    const page =
      formConfig.chapters.grossIncomeSpouseChapter.pages.grossIncomeSpouse;
    expect(() =>
      page.depends({
        financialDisclosureElection: 'yes',
        maritalStatus: 'married_living_with',
      }),
    ).to.not.throw();
    expect(
      page.depends({
        financialDisclosureElection: 'yes',
        maritalStatus: 'married_living_with',
      }),
    ).to.be.true;
    expect(
      page.depends({
        financialDisclosureElection: 'yes',
        maritalStatus: 'divorced_separated_widowed_this_year',
      }),
    ).to.be.false;
    expect(
      page.depends({
        financialDisclosureElection: 'no',
        maritalStatus: 'married_living_with',
      }),
    ).to.be.false;
  });

  it('deductibleExpenses depends requires yes disclosure', () => {
    const page =
      formConfig.chapters.deductibleExpensesChapter.pages.deductibleExpenses;
    expect(() =>
      page.depends({ financialDisclosureElection: 'yes' }),
    ).to.not.throw();
    expect(page.depends({ financialDisclosureElection: 'yes' })).to.be.true;
    expect(page.depends({ financialDisclosureElection: 'no' })).to.be.false;
  });

  it('poaDocuments depends requires poa_representative submitter', () => {
    const page = formConfig.chapters.poaDocumentsChapter.pages.poaDocuments;
    expect(() =>
      page.depends({ submitterType: 'poa_representative' }),
    ).to.not.throw();
    expect(page.depends({ submitterType: 'poa_representative' })).to.be.true;
    expect(page.depends({ submitterType: 'veteran' })).to.be.false;
    expect(page.depends({})).to.be.false;
  });
});