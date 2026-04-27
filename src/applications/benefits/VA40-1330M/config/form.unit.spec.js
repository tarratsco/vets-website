import { expect } from 'chai';
import formConfig from './form';

describe('VA40-1330M formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.be.an('object');
    expect(formConfig.formId).to.equal('VA40-1330M');
    expect(formConfig.title).to.be.a('string').that.is.not.empty;
    expect(formConfig.subTitle).to.be.a('string').that.is.not.empty;
    expect(formConfig.trackingPrefix).to.be.a('string').that.is.not.empty;
    expect(formConfig.rootUrl).to.be.a('string').that.is.not.empty;
    expect(formConfig.urlPrefix).to.equal('/');
  });

  it('has introduction and confirmation', () => {
    expect(formConfig.introduction).to.be.a('function');
    expect(formConfig.confirmation).to.be.a('function');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has prefillEnabled true', () => {
    expect(formConfig.prefillEnabled).to.equal(true);
  });

  it('has chapters object', () => {
    expect(formConfig.chapters).to.be.an('object');
    expect(Object.keys(formConfig.chapters)).to.have.lengthOf.at.least(1);
  });

  it('every page has path, title, uiSchema, schema', () => {
    Object.entries(formConfig.chapters).forEach(([chapterKey, chapter]) => {
      expect(chapter.pages, `chapter ${chapterKey} missing pages`).to.be.an('object');
      Object.entries(chapter.pages).forEach(([pageKey, page]) => {
        expect(page.path, `${chapterKey}.${pageKey} missing path`).to.be.a('string');
        expect(page.title, `${chapterKey}.${pageKey} missing title`).to.be.a('string');
        expect(page.uiSchema, `${chapterKey}.${pageKey} missing uiSchema`).to.be.an('object');
        expect(page.schema, `${chapterKey}.${pageKey} missing schema`).to.be.an('object');
      });
    });
  });

  describe('depends functions', () => {
    it('guardReserveQualifier depends returns true for guardOrReserve', () => {
      const page =
        formConfig.chapters.eligibilityScreenerChapter.pages
          .guardReserveQualifier;
      expect(() =>
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.not.throw();
      expect(
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.equal(true);
    });

    it('guardReserveQualifier depends returns false for activeDuty', () => {
      const page =
        formConfig.chapters.eligibilityScreenerChapter.pages
          .guardReserveQualifier;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(
        false,
      );
    });

    it('guardReserveQualifier depends does not throw with null', () => {
      const page =
        formConfig.chapters.eligibilityScreenerChapter.pages
          .guardReserveQualifier;
      expect(() => page.depends({})).to.not.throw();
      expect(() => page.depends(null)).to.not.throw();
    });

    it('authorization depends returns true when not nextOfKin', () => {
      const page =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(
        page.depends({ submitterRole: 'funeralHomeDirector' }),
      ).to.equal(true);
      expect(
        page.depends({ submitterRole: 'cemeteryOfficial' }),
      ).to.equal(true);
      expect(
        page.depends({ submitterRole: 'personalRepresentative' }),
      ).to.equal(true);
    });

    it('authorization depends returns false for nextOfKin', () => {
      const page =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(page.depends({ submitterRole: 'nextOfKin' })).to.equal(false);
    });

    it('authorization depends does not throw with null', () => {
      const page =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(() => page.depends({})).to.not.throw();
    });

    it('ddForm1300 depends returns true for activeDuty', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(
        page.depends({ serviceStatusAtDeath: 'activeDuty' }),
      ).to.equal(true);
    });

    it('ddForm1300 depends returns false for guardOrReserve', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.equal(false);
    });

    it('ngbForm22 depends returns true for guardOrReserve', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.equal(true);
    });

    it('ngbForm22 depends returns false for activeDuty', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(
        page.depends({ serviceStatusAtDeath: 'activeDuty' }),
      ).to.equal(false);
    });
  });
});