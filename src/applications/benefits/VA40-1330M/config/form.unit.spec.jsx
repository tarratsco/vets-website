import { expect } from 'chai';

import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.have.property('formId');
    expect(formConfig).to.have.property('title');
    expect(formConfig).to.have.property('chapters');
    expect(formConfig).to.have.property('introduction');
    expect(formConfig).to.have.property('confirmation');
    expect(formConfig).to.have.property('saveInProgress');
    expect(formConfig).to.have.property('trackingPrefix');
  });

  it('has correct formId', () => {
    expect(formConfig.formId).to.equal('VA40-1330M');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress.messages).to.have.property('inProgress');
    expect(formConfig.saveInProgress.messages).to.have.property('expired');
    expect(formConfig.saveInProgress.messages).to.have.property('saved');
  });

  it('has trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.be.a('string');
    expect(formConfig.trackingPrefix.length).to.be.greaterThan(0);
  });

  it('has prefillEnabled set to true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });

  describe('chapters', () => {
    it('has all required chapters', () => {
      const { chapters } = formConfig;
      expect(chapters).to.have.property('eligibilityScreenerChapter');
      expect(chapters).to.have.property('applicantInformationChapter');
      expect(chapters).to.have.property('deceasedInformationChapter');
      expect(chapters).to.have.property('burialInformationChapter');
      expect(chapters).to.have.property('markerSelectionChapter');
      expect(chapters).to.have.property('supportingDocumentsChapter');
      expect(chapters).to.have.property('certificationChapter');
    });

    it('every page has path, title, uiSchema, and schema', () => {
      Object.values(formConfig.chapters).forEach(chapter => {
        Object.values(chapter.pages).forEach(page => {
          expect(page).to.have.property('path');
          expect(page).to.have.property('title');
          expect(page).to.have.property('uiSchema');
          expect(page).to.have.property('schema');
        });
      });
    });

    it('eligibilityScreener has serviceStatus page', () => {
      expect(
        formConfig.chapters.eligibilityScreenerChapter.pages,
      ).to.have.property('serviceStatus');
    });

    it('eligibilityScreener has guardReserveQualifier page with depends', () => {
      const { guardReserveQualifier } =
        formConfig.chapters.eligibilityScreenerChapter.pages;
      expect(guardReserveQualifier).to.have.property('depends');
      expect(guardReserveQualifier.depends).to.be.a('function');
    });

    it('guardReserveQualifier depends returns true for guardOrReserve', () => {
      const { depends } =
        formConfig.chapters.eligibilityScreenerChapter.pages.guardReserveQualifier;
      expect(() =>
        depends({ serviceStatusAtDeath: 'guardOrReserve' }),
      ).to.not.throw();
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.be.true;
    });

    it('guardReserveQualifier depends returns false for activeDuty', () => {
      const { depends } =
        formConfig.chapters.eligibilityScreenerChapter.pages.guardReserveQualifier;
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.false;
    });

    it('guardReserveQualifier depends handles null without throwing', () => {
      const { depends } =
        formConfig.chapters.eligibilityScreenerChapter.pages.guardReserveQualifier;
      expect(() => depends({})).to.not.throw();
    });

    it('authorization depends returns false for nextOfKin', () => {
      const { depends } =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(depends({ submitterRole: 'nextOfKin' })).to.be.false;
    });

    it('authorization depends returns true for non-nextOfKin', () => {
      const { depends } =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(depends({ submitterRole: 'funeralHomeDirector' })).to.be.true;
    });

    it('authorization depends handles null without throwing', () => {
      const { depends } =
        formConfig.chapters.applicantInformationChapter.pages.authorization;
      expect(() => depends({})).to.not.throw();
    });

    it('ddForm1300 depends returns true for activeDuty', () => {
      const { depends } =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.true;
    });

    it('ddForm1300 depends returns false for guardOrReserve', () => {
      const { depends } =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.be.false;
    });

    it('ddForm1300 depends handles empty object without throwing', () => {
      const { depends } =
        formConfig.chapters.supportingDocumentsChapter.pages.ddForm1300;
      expect(() => depends({})).to.not.throw();
    });

    it('ngbForm22 depends returns true for guardOrReserve', () => {
      const { depends } =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.be.true;
    });

    it('ngbForm22 depends returns false for activeDuty', () => {
      const { depends } =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.be.false;
    });

    it('ngbForm22 depends handles empty object without throwing', () => {
      const { depends } =
        formConfig.chapters.supportingDocumentsChapter.pages.ngbForm22;
      expect(() => depends({})).to.not.throw();
    });
  });
});