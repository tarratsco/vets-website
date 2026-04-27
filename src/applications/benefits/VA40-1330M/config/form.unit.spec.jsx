import { expect } from 'chai';

import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.have.property('formId', 'VA40-1330M');
    expect(formConfig).to.have.property('title');
    expect(formConfig).to.have.property('chapters');
    expect(formConfig).to.have.property('introduction');
    expect(formConfig).to.have.property('confirmation');
    expect(formConfig).to.have.property('trackingPrefix');
    expect(formConfig).to.have.property('saveInProgress');
    expect(formConfig).to.have.property('rootUrl');
  });

  it('has saveInProgress messages', () => {
    const { messages } = formConfig.saveInProgress;
    expect(messages).to.have.property('inProgress');
    expect(messages).to.have.property('expired');
    expect(messages).to.have.property('saved');
    expect(messages.inProgress).to.be.a('string').that.is.not.empty;
    expect(messages.expired).to.be.a('string').that.is.not.empty;
    expect(messages.saved).to.be.a('string').that.is.not.empty;
  });

  it('has trackingPrefix set', () => {
    expect(formConfig.trackingPrefix).to.equal(
      'va40-1330m-headstone-marker-',
    );
  });

  it('has prefillEnabled as true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });

  it('has submitUrl pointing to vets-api', () => {
    expect(formConfig.submitUrl).to.include('/v0/burial_forms/headstone_marker');
  });

  describe('chapters', () => {
    it('has all required chapters', () => {
      const chapterKeys = Object.keys(formConfig.chapters);
      expect(chapterKeys).to.include('eligibilityScreenerChapter');
      expect(chapterKeys).to.include('applicantInformationChapter');
      expect(chapterKeys).to.include('deceasedInformationChapter');
      expect(chapterKeys).to.include('burialInformationChapter');
      expect(chapterKeys).to.include('markerSelectionChapter');
      expect(chapterKeys).to.include('supportingDocumentsChapter');
      expect(chapterKeys).to.include('certificationChapter');
    });

    it('every page has path, title, uiSchema, and schema', () => {
      Object.values(formConfig.chapters).forEach(chapter => {
        Object.values(chapter.pages).forEach(page => {
          expect(page).to.have.property('path');
          expect(page).to.have.property('title');
          expect(page).to.have.property('uiSchema');
          expect(page).to.have.property('schema');
          expect(page.path).to.be.a('string').that.is.not.empty;
          expect(page.title).to.be.a('string').that.is.not.empty;
        });
      });
    });

    describe('depends functions', () => {
      it('guardReserveQualifier depends: returns true for guardOrReserve', () => {
        const { guardReserveQualifier } =
          formConfig.chapters.eligibilityScreenerChapter.pages;
        expect(() =>
          guardReserveQualifier.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
        ).to.not.throw();
        expect(
          guardReserveQualifier.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
        ).to.be.true;
      });

      it('guardReserveQualifier depends: returns false for activeDuty', () => {
        const { guardReserveQualifier } =
          formConfig.chapters.eligibilityScreenerChapter.pages;
        expect(
          guardReserveQualifier.depends({ serviceStatusAtDeath: 'activeDuty' }),
        ).to.be.false;
      });

      it('guardReserveQualifier depends: returns false for null', () => {
        const { guardReserveQualifier } =
          formConfig.chapters.eligibilityScreenerChapter.pages;
        expect(() => guardReserveQualifier.depends(null)).to.not.throw();
      });

      it('authorization depends: returns false for nextOfKin', () => {
        const { authorization } =
          formConfig.chapters.applicantInformationChapter.pages;
        expect(
          authorization.depends({ submitterRole: 'nextOfKin' }),
        ).to.be.false;
      });

      it('authorization depends: returns true for funeralHomeDirector', () => {
        const { authorization } =
          formConfig.chapters.applicantInformationChapter.pages;
        expect(
          authorization.depends({ submitterRole: 'funeralHomeDirector' }),
        ).to.be.true;
      });

      it('authorization depends: returns true for personalRepresentative', () => {
        const { authorization } =
          formConfig.chapters.applicantInformationChapter.pages;
        expect(
          authorization.depends({ submitterRole: 'personalRepresentative' }),
        ).to.be.true;
      });

      it('authorization depends does not throw for null input', () => {
        const { authorization } =
          formConfig.chapters.applicantInformationChapter.pages;
        expect(() => authorization.depends(null)).to.not.throw();
      });

      it('ddForm1300 depends: returns true for activeDuty', () => {
        const { ddForm1300 } =
          formConfig.chapters.supportingDocumentsChapter.pages;
        expect(
          ddForm1300.depends({ serviceStatusAtDeath: 'activeDuty' }),
        ).to.be.true;
      });

      it('ddForm1300 depends: returns false for guardOrReserve', () => {
        const { ddForm1300 } =
          formConfig.chapters.supportingDocumentsChapter.pages;
        expect(
          ddForm1300.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
        ).to.be.false;
      });

      it('ddForm1300 depends does not throw for null input', () => {
        const { ddForm1300 } =
          formConfig.chapters.supportingDocumentsChapter.pages;
        expect(() => ddForm1300.depends(null)).to.not.throw();
      });

      it('ngbForm22 depends: returns true for guardOrReserve', () => {
        const { ngbForm22 } =
          formConfig.chapters.supportingDocumentsChapter.pages;
        expect(
          ngbForm22.depends({ serviceStatusAtDeath: 'guardOrReserve' }),
        ).to.be.true;
      });

      it('ngbForm22 depends: returns false for activeDuty', () => {
        const { ngbForm22 } =
          formConfig.chapters.supportingDocumentsChapter.pages;
        expect(
          ngbForm22.depends({ serviceStatusAtDeath: 'activeDuty' }),
        ).to.be.false;
      });

      it('ngbForm22 depends does not throw for null input', () => {
        const { ngbForm22 } =
          formConfig.chapters.supportingDocumentsChapter.pages;
        expect(() => ngbForm22.depends(null)).to.not.throw();
      });
    });
  });
});