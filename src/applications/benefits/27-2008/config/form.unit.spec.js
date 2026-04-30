import { expect } from 'chai';
import formConfig from './form';

describe('config/form', () => {
  it('has required top-level properties', () => {
    expect(formConfig.formId).to.equal('27-2008');
    expect(formConfig.title).to.be.a('string').and.not.be.empty;
    expect(formConfig.chapters).to.be.an('object');
    expect(formConfig.introduction).to.exist;
    expect(formConfig.confirmation).to.exist;
    expect(formConfig.transformForSubmit).to.be.a('function');
    expect(formConfig.trackingPrefix).to.be.a('string').and.not.be.empty;
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has prefillEnabled set to true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });

  it('has a submitUrl', () => {
    expect(formConfig.submitUrl).to.be.a('string').and.include(
      'burial_flag_applications',
    );
  });

  describe('chapters', () => {
    const chapterNames = [
      'applicantTypeChapter',
      'veteranInformationChapter',
      'serviceInformationChapter',
      'eligibilityChapter',
      'flagRecipientChapter',
      'applicantChapter',
      'documentsChapter',
      'remarksChapter',
    ];

    chapterNames.forEach(chapterName => {
      it(`chapter "${chapterName}" exists`, () => {
        expect(formConfig.chapters[chapterName]).to.exist;
      });

      it(`chapter "${chapterName}" has a title`, () => {
        expect(formConfig.chapters[chapterName].title).to.be.a('string');
      });

      it(`chapter "${chapterName}" has pages`, () => {
        expect(formConfig.chapters[chapterName].pages).to.be.an('object');
      });
    });

    it('every page has path, title, uiSchema, and schema', () => {
      Object.values(formConfig.chapters).forEach(chapter => {
        Object.entries(chapter.pages).forEach(([pageName, page]) => {
          expect(page.path, `${pageName}.path`).to.be.a('string');
          expect(page.title, `${pageName}.title`).to.be.a('string');
          expect(page.uiSchema, `${pageName}.uiSchema`).to.be.an('object');
          expect(page.schema, `${pageName}.schema`).to.be.an('object');
        });
      });
    });

    describe('reserveGuardEligibility depends function', () => {
      const dependsFn =
        formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility
          .depends;

      it('returns true when selectedReserve is in branchOfService', () => {
        expect(() =>
          dependsFn({
            serviceInformation: { branchOfService: ['selectedReserve'] },
          }),
        ).to.not.throw();
        expect(
          dependsFn({
            serviceInformation: { branchOfService: ['selectedReserve'] },
          }),
        ).to.be.true;
      });

      it('returns false when selectedReserve is NOT in branchOfService', () => {
        expect(() =>
          dependsFn({
            serviceInformation: { branchOfService: ['army'] },
          }),
        ).to.not.throw();
        expect(
          dependsFn({
            serviceInformation: { branchOfService: ['army'] },
          }),
        ).to.be.false;
      });

      it('returns false when serviceInformation is null', () => {
        expect(() => dependsFn(null)).to.not.throw();
        expect(dependsFn(null)).to.be.false;
      });

      it('returns false when branchOfService is empty', () => {
        expect(() =>
          dependsFn({ serviceInformation: { branchOfService: [] } }),
        ).to.not.throw();
        expect(
          dependsFn({ serviceInformation: { branchOfService: [] } }),
        ).to.be.false;
      });
    });
  });
});