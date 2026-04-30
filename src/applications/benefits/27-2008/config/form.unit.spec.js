import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.have.property('formId', '27-2008');
    expect(formConfig).to.have.property('title', 'Apply for a burial flag');
    expect(formConfig).to.have.property('rootUrl');
    expect(formConfig).to.have.property('trackingPrefix');
    expect(formConfig).to.have.property('chapters');
    expect(formConfig).to.have.property('introduction');
    expect(formConfig).to.have.property('confirmation');
    expect(formConfig).to.have.property('transformForSubmit');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.have.property('inProgress');
    expect(formConfig.saveInProgress.messages).to.have.property('expired');
    expect(formConfig.saveInProgress.messages).to.have.property('saved');
  });

  it('has prefillEnabled', () => {
    expect(formConfig.prefillEnabled).to.equal(true);
  });

  it('has expected chapters', () => {
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

  it('every page has path, title, uiSchema, schema', () => {
    Object.entries(formConfig.chapters).forEach(([chapterKey, chapter]) => {
      Object.entries(chapter.pages).forEach(([pageKey, page]) => {
        expect(page, `${chapterKey}.${pageKey} missing path`).to.have.property('path');
        expect(page, `${chapterKey}.${pageKey} missing title`).to.have.property('title');
        expect(page, `${chapterKey}.${pageKey} missing uiSchema`).to.have.property('uiSchema');
        expect(page, `${chapterKey}.${pageKey} missing schema`).to.have.property('schema');
      });
    });
  });

  it('reserveGuardEligibility depends function returns true when selectedReserve is in branchOfService', () => {
    const { depends } = formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    expect(depends).to.be.a('function');
    const trueResult = depends({
      serviceInformation: { branchOfService: ['army', 'selectedReserve'] },
    });
    expect(trueResult).to.equal(true);
  });

  it('reserveGuardEligibility depends function returns false when selectedReserve is not present', () => {
    const { depends } = formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    const falseResult = depends({
      serviceInformation: { branchOfService: ['army', 'navy'] },
    });
    expect(falseResult).to.equal(false);
  });

  it('reserveGuardEligibility depends function returns false for null input', () => {
    const { depends } = formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    expect(() => depends(null)).to.not.throw();
    expect(depends(null)).to.equal(false);
  });

  it('reserveGuardEligibility depends function returns false for empty formData', () => {
    const { depends } = formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;
    expect(depends({})).to.equal(false);
  });

  it('trackingPrefix is correct', () => {
    expect(formConfig.trackingPrefix).to.equal('burial-flag-27-2008-');
  });
});