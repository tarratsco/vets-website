import { expect } from 'chai';
import formConfig from './form';

describe('config/form', () => {
  it('should have formId of 27-2008', () => {
    expect(formConfig.formId).to.equal('27-2008');
  });

  it('should have a title', () => {
    expect(formConfig.title).to.be.a('string');
    expect(formConfig.title).to.include('burial flag');
  });

  it('should have introduction component', () => {
    expect(formConfig.introduction).to.be.a('function');
  });

  it('should have confirmation component', () => {
    expect(formConfig.confirmation).to.be.a('function');
  });

  it('should have transformForSubmit', () => {
    expect(formConfig.transformForSubmit).to.be.a('function');
  });

  it('should have saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('should have trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.equal('burial-flag-27-2008-');
  });

  it('should have chapters object', () => {
    expect(formConfig.chapters).to.be.an('object');
  });

  it('should have all required chapters', () => {
    const chapterKeys = Object.keys(formConfig.chapters);
    expect(chapterKeys).to.include('applicantTypeChapter');
    expect(chapterKeys).to.include('veteranInformationChapter');
    expect(chapterKeys).to.include('serviceInformationChapter');
    expect(chapterKeys).to.include('eligibilityChapter');
    expect(chapterKeys).to.include('flagRecipientChapter');
    expect(chapterKeys).to.include('applicantChapter');
    expect(chapterKeys).to.include('documentsChapter');
    expect(chapterKeys).to.include('remarksChapter');
  });

  it('every page should have path, title, uiSchema, and schema', () => {
    Object.values(formConfig.chapters).forEach(chapter => {
      Object.values(chapter.pages).forEach(page => {
        expect(page.path, `${page.title} missing path`).to.be.a('string');
        expect(page.title, `page missing title`).to.be.a('string');
        expect(page.uiSchema, `${page.title} missing uiSchema`).to.be.an(
          'object',
        );
        expect(page.schema, `${page.title} missing schema`).to.be.an('object');
      });
    });
  });

  it('reserveGuardEligibility depends should return true when selectedReserve is included', () => {
    const page =
      formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    expect(page.depends).to.be.a('function');
    const result = page.depends({
      serviceInformation: { branchOfService: ['army', 'selectedReserve'] },
    });
    expect(result).to.be.true;
  });

  it('reserveGuardEligibility depends should return false when selectedReserve is not included', () => {
    const page =
      formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    const result = page.depends({
      serviceInformation: { branchOfService: ['army', 'navy'] },
    });
    expect(result).to.be.false;
  });

  it('reserveGuardEligibility depends should return false with null formData', () => {
    const page =
      formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    expect(() => page.depends(null)).to.not.throw();
    expect(page.depends(null)).to.be.false;
  });

  it('reserveGuardEligibility depends should return false with empty formData', () => {
    const page =
      formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    expect(() => page.depends({})).to.not.throw();
    expect(page.depends({})).to.be.false;
  });
});