import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.be.an('object');
    expect(formConfig.formId).to.equal('VA40-1330M');
    expect(formConfig.title).to.be.a('string');
    expect(formConfig.chapters).to.be.an('object');
    expect(formConfig.introduction).to.exist;
    expect(formConfig.confirmation).to.exist;
    expect(formConfig.trackingPrefix).to.equal('va40-1330m-');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has rootUrl set from manifest', () => {
    expect(formConfig.rootUrl).to.equal(
      '/burials-memorials/headstone-marker-active-duty',
    );
  });

  describe('chapters', () => {
    it('has eligibilityChapter', () => {
      expect(formConfig.chapters.eligibilityChapter).to.exist;
    });

    it('has applicantInformationChapter', () => {
      expect(formConfig.chapters.applicantInformationChapter).to.exist;
    });

    it('has deceasedInformationChapter', () => {
      expect(formConfig.chapters.deceasedInformationChapter).to.exist;
    });

    it('has burialInformationChapter', () => {
      expect(formConfig.chapters.burialInformationChapter).to.exist;
    });

    it('has markerSelectionChapter', () => {
      expect(formConfig.chapters.markerSelectionChapter).to.exist;
    });

    it('has supportingDocumentsChapter', () => {
      expect(formConfig.chapters.supportingDocumentsChapter).to.exist;
    });

    it('has certificationChapter', () => {
      expect(formConfig.chapters.certificationChapter).to.exist;
    });
  });

  describe('every page has path, title, uiSchema, schema', () => {
    Object.entries(formConfig.chapters).forEach(
      ([chapterKey, chapter]) => {
        Object.entries(chapter.pages).forEach(([pageKey, page]) => {
          it(`${chapterKey}.${pageKey} has path`, () => {
            expect(page.path).to.be.a('string');
          });
          it(`${chapterKey}.${pageKey} has title`, () => {
            expect(page.title).to.be.a('string');
          });
          it(`${chapterKey}.${pageKey} has uiSchema`, () => {
            expect(page.uiSchema).to.be.an('object');
          });
          it(`${chapterKey}.${pageKey} has schema`, () => {
            expect(page.schema).to.be.an('object');
          });
        });
      },
    );
  });

  describe('depends functions', () => {
    it('guardReserveQualifier depends returns true for guardOrReserve', () => {
      const page =
        formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(() => page.depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.not.throw();
      expect(
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.be.true;
    });

    it('guardReserveQualifier depends returns false for activeDuty', () => {
      const page =
        formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.false;
    });

    it('guardReserveQualifier depends handles null gracefully', () => {
      const page =
        formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(() => page.depends({})).to.not.throw();
    });

    it('authorization depends returns true for non-nextOfKin', () => {
      const page =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(
        page.depends({ submitterRole: 'funeralHomeDirector' }),
      ).to.be.true;
      expect(page.depends({ submitterRole: 'cemeteryOfficial' })).to.be.true;
      expect(
        page.depends({ submitterRole: 'personalRepresentative' }),
      ).to.be.true;
    });

    it('authorization depends returns false for nextOfKin', () => {
      const page =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(page.depends({ submitterRole: 'nextOfKin' })).to.be.false;
    });

    it('authorization depends handles null gracefully', () => {
      const page =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(() => page.depends({})).to.not.throw();
    });

    it('ddForm1300 depends returns true for activeDuty', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.true;
    });

    it('ddForm1300 depends returns false for guardOrReserve', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.be.false;
    });

    it('ngbForm22 depends returns true for guardOrReserve', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(
        page.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.be.true;
    });

    it('ngbForm22 depends returns false for activeDuty', () => {
      const page =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.false;
    });

    it('depends functions handle undefined formData gracefully', () => {
      const page =
        formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(() => page.depends(null)).to.not.throw();
    });
  });
});