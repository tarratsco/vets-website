import { expect } from 'chai';
import formConfig from './form';

describe('config/form', () => {
  it('has the correct formId', () => {
    expect(formConfig.formId).to.equal('10-10EC');
  });

  it('has a title', () => {
    expect(formConfig.title).to.be.a('string');
    expect(formConfig.title).to.include('extended care');
  });

  it('has chapters object', () => {
    expect(formConfig.chapters).to.be.an('object');
  });

  it('has introduction component', () => {
    expect(formConfig.introduction).to.exist;
  });

  it('has confirmation component', () => {
    expect(formConfig.confirmation).to.exist;
  });

  it('has transformForSubmit function', () => {
    expect(formConfig.transformForSubmit).to.be.a('function');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.be.a('string');
    expect(formConfig.trackingPrefix).to.include('hca-extended-care');
  });

  it('has prefillEnabled', () => {
    expect(formConfig.prefillEnabled).to.equal(true);
  });

  it('has rootUrl from manifest', () => {
    expect(formConfig.rootUrl).to.include('10-10ec');
  });

  it('all chapter pages have required path, title, uiSchema, schema', () => {
    Object.entries(formConfig.chapters).forEach(([chapterKey, chapter]) => {
      expect(chapter.pages, `chapter ${chapterKey} has pages`).to.be.an('object');
      Object.entries(chapter.pages).forEach(([pageKey, page]) => {
        expect(page.path, `page ${pageKey} has path`).to.be.a('string');
        expect(page.title, `page ${pageKey} has title`).to.be.a('string');
        expect(page.uiSchema, `page ${pageKey} has uiSchema`).to.be.an('object');
        expect(page.schema, `page ${pageKey} has schema`).to.be.an('object');
      });
    });
  });

  describe('depends functions', () => {
    it('spouseInformation depends returns true for married_living_with', () => {
      const page = formConfig.chapters.spouseAndDependentsChapter.pages.spouseInformation;
      expect(() => page.depends({ maritalStatus: 'married_living_with' })).to.not.throw();
      expect(page.depends({ maritalStatus: 'married_living_with' })).to.be.true;
    });

    it('spouseInformation depends returns false for single_no_dependent', () => {
      const page = formConfig.chapters.spouseAndDependentsChapter.pages.spouseInformation;
      expect(page.depends({ maritalStatus: 'single_no_dependent' })).to.be.false;
    });

    it('spouseInformation depends returns true for divorced_separated_widowed_this_year', () => {
      const page = formConfig.chapters.spouseAndDependentsChapter.pages.spouseInformation;
      expect(page.depends({ maritalStatus: 'divorced_separated_widowed_this_year' })).to.be.true;
    });

    it('dependentInformation depends returns false for single_no_dependent', () => {
      const page = formConfig.chapters.spouseAndDependentsChapter.pages.dependentInformation;
      expect(page.depends({ maritalStatus: 'single_no_dependent' })).to.be.false;
    });

    it('dependentInformation depends returns true for single_with_dependent', () => {
      const page = formConfig.chapters.spouseAndDependentsChapter.pages.dependentInformation;
      expect(page.depends({ maritalStatus: 'single_with_dependent' })).to.be.true;
    });

    it('careType depends returns true when financialDisclosureElection is yes', () => {
      const page = formConfig.chapters.careTypeChapter.pages.careType;
      expect(() => page.depends({ financialDisclosureElection: 'yes' })).to.not.throw();
      expect(page.depends({ financialDisclosureElection: 'yes' })).to.be.true;
    });

    it('careType depends returns false when financialDisclosureElection is no', () => {
      const page = formConfig.chapters.careTypeChapter.pages.careType;
      expect(page.depends({ financialDisclosureElection: 'no' })).to.be.false;
    });

    it('careType depends returns false when financialDisclosureElection is null', () => {
      const page = formConfig.chapters.careTypeChapter.pages.careType;
      expect(page.depends({ financialDisclosureElection: null })).to.be.false;
    });

    it('fixedAssets depends returns true for institutional + yes', () => {
      const page = formConfig.chapters.fixedAssetsChapter.pages.fixedAssets;
      expect(() =>
        page.depends({ financialDisclosureElection: 'yes', careType: 'institutional' }),
      ).to.not.throw();
      expect(
        page.depends({ financialDisclosureElection: 'yes', careType: 'institutional' }),
      ).to.be.true;
    });

    it('fixedAssets depends returns false for non_institutional', () => {
      const page = formConfig.chapters.fixedAssetsChapter.pages.fixedAssets;
      expect(
        page.depends({ financialDisclosureElection: 'yes', careType: 'non_institutional' }),
      ).to.be.false;
    });

    it('fixedAssets depends returns false when financial disclosure is no', () => {
      const page = formConfig.chapters.fixedAssetsChapter.pages.fixedAssets;
      expect(
        page.depends({ financialDisclosureElection: 'no', careType: 'institutional' }),
      ).to.be.false;
    });

    it('liquidAssets depends returns true for institutional + yes', () => {
      const page = formConfig.chapters.liquidAssetsChapter.pages.liquidAssets;
      expect(
        page.depends({ financialDisclosureElection: 'yes', careType: 'institutional' }),
      ).to.be.true;
    });

    it('grossIncomeVeteran depends returns true when disclosure is yes', () => {
      const page = formConfig.chapters.grossIncomeVeteranChapter.pages.grossIncomeVeteran;
      expect(page.depends({ financialDisclosureElection: 'yes' })).to.be.true;
    });

    it('grossIncomeVeteran depends returns false when disclosure is no', () => {
      const page = formConfig.chapters.grossIncomeVeteranChapter.pages.grossIncomeVeteran;
      expect(page.depends({ financialDisclosureElection: 'no' })).to.be.false;
    });

    it('grossIncomeSpouse depends returns true for yes + married status', () => {
      const page = formConfig.chapters.grossIncomeSpouseChapter.pages.grossIncomeSpouse;
      expect(
        page.depends({ financialDisclosureElection: 'yes', maritalStatus: 'married_living_with' }),
      ).to.be.true;
    });

    it('grossIncomeSpouse depends returns false for divorced status', () => {
      const page = formConfig.chapters.grossIncomeSpouseChapter.pages.grossIncomeSpouse;
      expect(
        page.depends({
          financialDisclosureElection: 'yes',
          maritalStatus: 'divorced_separated_widowed_this_year',
        }),
      ).to.be.false;
    });

    it('deductibleExpenses depends returns true when disclosure is yes', () => {
      const page = formConfig.chapters.deductibleExpensesChapter.pages.deductibleExpenses;
      expect(page.depends({ financialDisclosureElection: 'yes' })).to.be.true;
    });

    it('depends functions do not throw with null/undefined inputs', () => {
      const pagesWithDepends = [
        formConfig.chapters.spouseAndDependentsChapter.pages.spouseInformation,
        formConfig.chapters.spouseAndDependentsChapter.pages.dependentInformation,
        formConfig.chapters.careTypeChapter.pages.careType,
        formConfig.chapters.fixedAssetsChapter.pages.fixedAssets,
        formConfig.chapters.liquidAssetsChapter.pages.liquidAssets,
        formConfig.chapters.grossIncomeVeteranChapter.pages.grossIncomeVeteran,
        formConfig.chapters.grossIncomeSpouseChapter.pages.grossIncomeSpouse,
        formConfig.chapters.deductibleExpensesChapter.pages.deductibleExpenses,
      ];
      pagesWithDepends.forEach(page => {
        expect(() => page.depends({})).to.not.throw();
        expect(() => page.depends({ maritalStatus: null })).to.not.throw();
      });
    });
  });
});