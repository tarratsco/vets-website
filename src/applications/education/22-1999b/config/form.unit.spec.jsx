import { expect } from 'chai';

import formConfig from './form';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

describe('formConfig', () => {
  it('exports a formConfig object', () => {
    expect(formConfig).to.be.an('object');
  });

  it('has correct formId', () => {
    expect(formConfig.formId).to.equal('22-1999b');
  });

  it('has a title', () => {
    expect(formConfig.title).to.be.a('string').with.length.greaterThan(0);
  });

  it('has a trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.be.a('string').with.length.greaterThan(
      0,
    );
  });

  it('has introduction component', () => {
    expect(formConfig.introduction).to.equal(IntroductionPage);
  });

  it('has confirmation component', () => {
    expect(formConfig.confirmation).to.equal(ConfirmationPage);
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has chapters object', () => {
    expect(formConfig.chapters).to.be.an('object');
  });

  it('has all required top-level chapters', () => {
    const chapterKeys = Object.keys(formConfig.chapters);
    expect(chapterKeys).to.include('institutionAndSCOChapter');
    expect(chapterKeys).to.include('studentAndCertificationChapter');
    expect(chapterKeys).to.include('enrollmentChangeDetailsChapter');
    expect(chapterKeys).to.include('supportingDocumentationChapter');
    expect(chapterKeys).to.include('certificationAttestationChapter');
  });

  describe('every page has required properties', () => {
    const getAllPages = config => {
      const pages = [];
      Object.values(config.chapters).forEach(chapter => {
        Object.values(chapter.pages).forEach(page => {
          pages.push(page);
        });
      });
      return pages;
    };

    it('every page has a path', () => {
      getAllPages(formConfig).forEach(page => {
        expect(page.path).to.be.a('string').with.length.greaterThan(0);
      });
    });

    it('every page has a title', () => {
      getAllPages(formConfig).forEach(page => {
        expect(page.title).to.be.a('string').with.length.greaterThan(0);
      });
    });

    it('every page has a uiSchema', () => {
      getAllPages(formConfig).forEach(page => {
        expect(page.uiSchema).to.be.an('object');
      });
    });

    it('every page has a schema', () => {
      getAllPages(formConfig).forEach(page => {
        expect(page.schema).to.be.an('object');
      });
    });
  });

  describe('depends functions', () => {
    const conditionalPages = ['lastDateOfAttendance', 'updatedEnrollmentDetails', 'reasonForChange', 'mitigatingCircumstances', 'correctionDetails', 'timelinessAcknowledgment', 'supportingDocumentation'];

    conditionalPages.forEach(pageName => {
      it(`${pageName} depends function does not throw with null formData`, () => {
        const page =
          formConfig.chapters.enrollmentChangeDetailsChapter?.pages[
            pageName
          ] ||
          formConfig.chapters.supportingDocumentationChapter?.pages[pageName];
        if (page && page.depends) {
          expect(() => page.depends({})).to.not.throw();
          expect(() => page.depends({ typeOfChange: null })).to.not.throw();
        }
      });
    });

    it('lastDateOfAttendance depends returns true for full_termination', () => {
      const page =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .lastDateOfAttendance;
      expect(page.depends({ typeOfChange: 'full_termination' })).to.be.true;
    });

    it('lastDateOfAttendance depends returns false for correction', () => {
      const page =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .lastDateOfAttendance;
      expect(page.depends({ typeOfChange: 'correction' })).to.be.false;
    });

    it('correctionDetails depends returns true for correction', () => {
      const page =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .correctionDetails;
      expect(page.depends({ typeOfChange: 'correction' })).to.be.true;
    });

    it('correctionDetails depends returns false for full_termination', () => {
      const page =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .correctionDetails;
      expect(page.depends({ typeOfChange: 'full_termination' })).to.be.false;
    });

    it('supportingDocumentation depends returns true for correction', () => {
      const page =
        formConfig.chapters.supportingDocumentationChapter.pages
          .supportingDocumentation;
      expect(page.depends({ typeOfChange: 'correction' })).to.be.true;
    });

    it('supportingDocumentation depends returns false when no conditions met', () => {
      const page =
        formConfig.chapters.supportingDocumentationChapter.pages
          .supportingDocumentation;
      expect(
        page.depends({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'no',
        }),
      ).to.be.false;
    });

    it('timelinessAcknowledgment depends returns false for correction even if date is old', () => {
      const page =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .timelinessAcknowledgment;
      const old = new Date();
      old.setDate(old.getDate() - 60);
      const dateStr = old.toISOString().split('T')[0];
      expect(
        page.depends({
          typeOfChange: 'correction',
          effectiveDateOfChange: dateStr,
        }),
      ).to.be.false;
    });
  });

  it('submitUrl contains the correct endpoint path', () => {
    expect(formConfig.submitUrl).to.include('/v0/edu_22_1999b_forms');
  });

  it('prefillEnabled is true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });
});