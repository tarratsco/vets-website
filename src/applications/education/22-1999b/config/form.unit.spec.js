import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has the correct formId', () => {
    expect(formConfig.formId).to.equal('22-1999b');
  });

  it('has a title', () => {
    expect(formConfig.title).to.be.a('string').and.not.empty;
  });

  it('has a subTitle', () => {
    expect(formConfig.subTitle).to.include('22-1999b');
  });

  it('has an introduction component', () => {
    expect(formConfig.introduction).to.be.a('function');
  });

  it('has a confirmation component', () => {
    expect(formConfig.confirmation).to.be.a('function');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.exist;
    expect(formConfig.saveInProgress.messages).to.exist;
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has prefillEnabled true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });

  it('has a trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.be.a('string').and.not.empty;
  });

  it('has chapters object with 4 chapters', () => {
    expect(formConfig.chapters).to.be.an('object');
    expect(Object.keys(formConfig.chapters)).to.have.lengthOf(4);
  });

  it('every chapter has a title', () => {
    Object.values(formConfig.chapters).forEach(chapter => {
      expect(chapter.title).to.be.a('string').and.not.empty;
    });
  });

  it('every page has path, title, uiSchema, and schema', () => {
    Object.values(formConfig.chapters).forEach(chapter => {
      Object.values(chapter.pages).forEach(page => {
        expect(page.path).to.be.a('string').and.not.empty;
        expect(page.title).to.be.a('string').and.not.empty;
        expect(page.uiSchema).to.be.an('object');
        expect(page.schema).to.be.an('object');
      });
    });
  });

  describe('conditional page depends functions', () => {
    const fullTerminationData = {
      enrollmentChangeDetails: {
        typeOfChange: 'full_termination',
        effectiveDateOfChange: '2020-01-01',
        reasonForChange: 'voluntary_withdrawal',
      },
    };
    const correctionData = {
      enrollmentChangeDetails: { typeOfChange: 'correction' },
    };
    const creditReductionData = {
      enrollmentChangeDetails: { typeOfChange: 'credit_hour_reduction' },
    };
    const recentTerminationData = {
      enrollmentChangeDetails: {
        typeOfChange: 'full_termination',
        effectiveDateOfChange: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 5);
          return d.toISOString().split('T')[0];
        })(),
      },
    };

    it('lastDateOfAttendance depends returns true for full_termination', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .lastDateOfAttendance.depends;
      expect(() => depFn(fullTerminationData)).not.to.throw();
      expect(depFn(fullTerminationData)).to.be.true;
    });

    it('lastDateOfAttendance depends returns false for correction', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .lastDateOfAttendance.depends;
      expect(() => depFn(correctionData)).not.to.throw();
      expect(depFn(correctionData)).to.be.false;
    });

    it('updatedEnrollmentDetails depends returns true for credit_hour_reduction', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .updatedEnrollmentDetails.depends;
      expect(() => depFn(creditReductionData)).not.to.throw();
      expect(depFn(creditReductionData)).to.be.true;
    });

    it('updatedEnrollmentDetails depends returns false for full_termination', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .updatedEnrollmentDetails.depends;
      expect(() => depFn(fullTerminationData)).not.to.throw();
      expect(depFn(fullTerminationData)).to.be.false;
    });

    it('reasonForChange depends returns false for correction', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages.reasonForChange
          .depends;
      expect(() => depFn(correctionData)).not.to.throw();
      expect(depFn(correctionData)).to.be.false;
    });

    it('mitigatingCircumstances depends returns true for voluntary_withdrawal', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .mitigatingCircumstances.depends;
      expect(() => depFn(fullTerminationData)).not.to.throw();
      expect(depFn(fullTerminationData)).to.be.true;
    });

    it('correctionDetails depends returns true only for correction', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages.correctionDetails
          .depends;
      expect(() => depFn(correctionData)).not.to.throw();
      expect(depFn(correctionData)).to.be.true;
      expect(depFn(fullTerminationData)).to.be.false;
    });

    it('timelinessAcknowledgment depends returns false for correction', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .timelinessAcknowledgment.depends;
      expect(() =>
        depFn({
          enrollmentChangeDetails: {
            typeOfChange: 'correction',
            effectiveDateOfChange: '2020-01-01',
          },
        }),
      ).not.to.throw();
      expect(
        depFn({
          enrollmentChangeDetails: {
            typeOfChange: 'correction',
            effectiveDateOfChange: '2020-01-01',
          },
        }),
      ).to.be.false;
    });

    it('timelinessAcknowledgment depends returns false for recent date', () => {
      const depFn =
        formConfig.chapters.enrollmentChangeDetailsChapter.pages
          .timelinessAcknowledgment.depends;
      expect(() => depFn(recentTerminationData)).not.to.throw();
      expect(depFn(recentTerminationData)).to.be.false;
    });

    it('documentUpload depends does not throw with null', () => {
      const depFn =
        formConfig.chapters.supportingDocumentationChapter.pages.documentUpload
          .depends;
      expect(() => depFn(null)).not.to.throw();
    });
  });
});