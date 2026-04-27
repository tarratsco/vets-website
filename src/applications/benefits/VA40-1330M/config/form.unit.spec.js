import { expect } from 'chai';
import formConfig from './form';

describe('VA40-1330M formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig.formId).to.equal('VA40-1330M');
    expect(formConfig.title).to.be.a('string');
    expect(formConfig.chapters).to.be.an('object');
    expect(formConfig.introduction).to.be.a('function');
    expect(formConfig.confirmation).to.be.a('function');
    expect(formConfig.trackingPrefix).to.be.a('string');
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has prefillEnabled true', () => {
    expect(formConfig.prefillEnabled).to.equal(true);
  });

  it('has a submitUrl', () => {
    expect(formConfig.submitUrl).to.be.a('string');
    expect(formConfig.submitUrl).to.include('burial_forms/headstone_marker');
  });

  describe('chapters', () => {
    it('has all required chapters', () => {
      const { chapters } = formConfig;
      expect(chapters).to.have.key('eligibilityChapter');
      expect(chapters).to.have.key('applicantInformationChapter');
      expect(chapters).to.have.key('deceasedInformationChapter');
      expect(chapters).to.have.key('burialInformationChapter');
      expect(chapters).to.have.key('markerSelectionChapter');
      expect(chapters).to.have.key('supportingDocumentsChapter');
      expect(chapters).to.have.key('certificationChapter');
    });

    it('every page has path, title, uiSchema, schema', () => {
      const { chapters } = formConfig;
      Object.values(chapters).forEach(chapter => {
        Object.values(chapter.pages).forEach(page => {
          expect(page.path, `page missing path`).to.be.a('string');
          expect(page.title, `page ${page.path} missing title`).to.be.a('string');
          expect(page.uiSchema, `page ${page.path} missing uiSchema`).to.be.an('object');
          expect(page.schema, `page ${page.path} missing schema`).to.be.an('object');
        });
      });
    });
  });

  describe('depends functions', () => {
    it('guardReserveQualifier depends returns true when serviceStatusAtDeath is guardOrReserve', () => {
      const page = formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(() => page.depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.not.throw();
      expect(page.depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.equal(true);
    });

    it('guardReserveQualifier depends returns false when serviceStatusAtDeath is activeDuty', () => {
      const page = formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(false);
    });

    it('guardReserveQualifier depends handles null input', () => {
      const page = formConfig.chapters.eligibilityChapter.pages.guardReserveQualifier;
      expect(() => page.depends(null)).to.not.throw();
    });

    it('authorization depends returns false when submitterRole is nextOfKin', () => {
      const page = formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(page.depends({ submitterRole: 'nextOfKin' })).to.equal(false);
    });

    it('authorization depends returns true when submitterRole is funeralHomeDirector', () => {
      const page = formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(page.depends({ submitterRole: 'funeralHomeDirector' })).to.equal(true);
    });

    it('authorization depends handles null input', () => {
      const page = formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(() => page.depends(null)).to.not.throw();
    });

    it('ddForm1300 depends returns true when serviceStatusAtDeath is activeDuty', () => {
      const page = formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(true);
    });

    it('ddForm1300 depends returns false when serviceStatusAtDeath is guardOrReserve', () => {
      const page = formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(page.depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.equal(false);
    });

    it('ddForm1300 depends handles null input', () => {
      const page = formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(() => page.depends(null)).to.not.throw();
    });

    it('ngbForm22 depends returns true when serviceStatusAtDeath is guardOrReserve', () => {
      const page = formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(page.depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.equal(true);
    });

    it('ngbForm22 depends returns false when serviceStatusAtDeath is activeDuty', () => {
      const page = formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(page.depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(false);
    });

    it('ngbForm22 depends handles null input', () => {
      const page = formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(() => page.depends(null)).to.not.throw();
    });
  });
});