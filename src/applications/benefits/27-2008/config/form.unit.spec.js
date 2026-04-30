import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.be.an('object');
    expect(formConfig.formId).to.equal('27-2008');
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

  it('has prefillEnabled set to true', () => {
    expect(formConfig.prefillEnabled).to.equal(true);
  });

  it('all chapters have pages with required properties', () => {
    Object.entries(formConfig.chapters).forEach(([chapterKey, chapter]) => {
      expect(chapter.pages, `chapter ${chapterKey} should have pages`).to.be.an(
        'object',
      );
      Object.entries(chapter.pages).forEach(([pageKey, page]) => {
        expect(page.path, `${chapterKey}.${pageKey} should have path`).to.be.a(
          'string',
        );
        expect(page.title, `${chapterKey}.${pageKey} should have title`).to.be.a(
          'string',
        );
        expect(
          page.uiSchema,
          `${chapterKey}.${pageKey} should have uiSchema`,
        ).to.be.an('object');
        expect(
          page.schema,
          `${chapterKey}.${pageKey} should have schema`,
        ).to.be.an('object');
      });
    });
  });

  describe('depends functions', () => {
    const reserveGuardPage =
      formConfig.chapters.eligibilityChapter.pages.reserveGuardEligibility;

    it('reserveGuardEligibility depends returns true when selectedReserve included', () => {
      const formData = {
        serviceInformation: {
          branchOfService: ['army', 'selectedReserve'],
        },
      };
      expect(() => reserveGuardPage.depends(formData)).to.not.throw();
      expect(reserveGuardPage.depends(formData)).to.be.true;
    });

    it('reserveGuardEligibility depends returns false when selectedReserve not included', () => {
      const formData = {
        serviceInformation: {
          branchOfService: ['army', 'navy'],
        },
      };
      expect(() => reserveGuardPage.depends(formData)).to.not.throw();
      expect(reserveGuardPage.depends(formData)).to.be.false;
    });

    it('reserveGuardEligibility depends returns false when branchOfService is empty', () => {
      const formData = { serviceInformation: { branchOfService: [] } };
      expect(() => reserveGuardPage.depends(formData)).to.not.throw();
      expect(reserveGuardPage.depends(formData)).to.be.false;
    });

    it('reserveGuardEligibility depends handles null formData gracefully', () => {
      expect(() => reserveGuardPage.depends(null)).to.not.throw();
      expect(reserveGuardPage.depends(null)).to.be.false;
    });

    it('reserveGuardEligibility depends handles missing serviceInformation gracefully', () => {
      expect(() => reserveGuardPage.depends({})).to.not.throw();
      expect(reserveGuardPage.depends({})).to.be.false;
    });
  });
});