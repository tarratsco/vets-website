import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has required formId', () => {
    expect(formConfig.formId).to.equal('22-1999b');
  });

  it('has title and subTitle', () => {
    expect(formConfig.title).to.be.a('string').and.not.be.empty;
    expect(formConfig.subTitle).to.be.a('string').and.not.be.empty;
  });

  it('has chapters object', () => {
    expect(formConfig.chapters).to.be.an('object');
  });

  it('has introduction component', () => {
    expect(formConfig.introduction).to.be.a('function');
  });

  it('has confirmation component', () => {
    expect(formConfig.confirmation).to.be.a('function');
  });

  it('has submitUrl', () => {
    expect(formConfig.submitUrl).to.be.a('string').and.include('edu_22_1999b_forms');
  });

  it('has trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.be.a('string').and.not.be.empty;
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  describe('chapter structure', () => {
    it('has institutionAndSCOChapter', () => {
      expect(formConfig.chapters).to.have.property('institutionAndSCOChapter');
    });

    it('has studentAndCertificationChapter', () => {
      expect(formConfig.chapters).to.have.property(
        'studentAndCertificationChapter',
      );
    });

    it('has enrollmentChangeDetailsChapter', () => {
      expect(formConfig.chapters).to.have.property(
        'enrollmentChangeDetailsChapter',
      );
    });

    it('has supportingDocumentationChapter', () => {
      expect(formConfig.chapters).to.have.property(
        'supportingDocumentationChapter',
      );
    });

    it('has certificationChapter', () => {
      expect(formConfig.chapters).to.have.property('certificationChapter');
    });
  });

  describe('all pages have required fields', () => {
    const allPages = Object.values(formConfig.chapters).flatMap(chapter =>
      Object.values(chapter.pages),
    );

    allPages.forEach(page => {
      it(`page "${page.title}" has path, title, uiSchema, schema`, () => {
        expect(page.path).to.be.a('string').and.not.be.empty;
        expect(page.title).to.be.a('string').and.not.be.empty;
        expect(page.uiSchema).to.be.an('object');
        expect(page.schema).to.be.an('object');
      });
    });
  });

  describe('conditional pages depends() functions', () => {
    const { pages } = formConfig.chapters.enrollmentChangeDetailsChapter;

    it('lastDateOfAttendance depends() returns true for full_termination', () => {
      expect(() =>
        pages.lastDateOfAttendance.depends({ typeOfChange: 'full_termination' }),
      ).to.not.throw();
      expect(
        pages.lastDateOfAttendance.depends({ typeOfChange: 'full_termination' }),
      ).to.be.true;
    });

    it('lastDateOfAttendance depends() returns false for credit_hour_reduction', () => {
      expect(
        pages.lastDateOfAttendance.depends({
          typeOfChange: 'credit_hour_reduction',
        }),
      ).to.be.false;
    });

    it('lastDateOfAttendance depends() returns false for null input', () => {
      expect(() =>
        pages.lastDateOfAttendance.depends({ typeOfChange: null }),
      ).to.not.throw();
      expect(
        pages.lastDateOfAttendance.depends({ typeOfChange: null }),
      ).to.be.false;
    });

    it('updatedEnrollmentDetails depends() returns true for credit_hour_reduction', () => {
      expect(
        pages.updatedEnrollmentDetails.depends({
          typeOfChange: 'credit_hour_reduction',
        }),
      ).to.be.true;
    });

    it('updatedEnrollmentDetails depends() returns false for full_termination', () => {
      expect(
        pages.updatedEnrollmentDetails.depends({
          typeOfChange: 'full_termination',
        }),
      ).to.be.false;
    });

    it('updatedEnrollmentDetails depends() does not throw for null input', () => {
      expect(() =>
        pages.updatedEnrollmentDetails.depends({ typeOfChange: null }),
      ).to.not.throw();
    });

    it('reasonForChange depends() returns false for correction', () => {
      expect(
        pages.reasonForChange.depends({ typeOfChange: 'correction' }),
      ).to.be.false;
    });

    it('reasonForChange depends() returns true for full_termination', () => {
      expect(
        pages.reasonForChange.depends({ typeOfChange: 'full_termination' }),
      ).to.be.true;
    });

    it('mitigatingCircumstances depends() returns true for voluntary_withdrawal + full_termination', () => {
      expect(
        pages.mitigatingCircumstances.depends({
          typeOfChange: 'full_termination',
          reasonForChange: 'voluntary_withdrawal',
        }),
      ).to.be.true;
    });

    it('mitigatingCircumstances depends() returns false for correction', () => {
      expect(
        pages.mitigatingCircumstances.depends({
          typeOfChange: 'correction',
          reasonForChange: 'voluntary_withdrawal',
        }),
      ).to.be.false;
    });

    it('mitigatingCircumstances depends() returns false for academic_dismissal', () => {
      expect(
        pages.mitigatingCircumstances.depends({
          typeOfChange: 'full_termination',
          reasonForChange: 'academic_dismissal',
        }),
      ).to.be.false;
    });

    it('correctionDetails depends() returns true for correction', () => {
      expect(
        pages.correctionDetails.depends({ typeOfChange: 'correction' }),
      ).to.be.true;
    });

    it('correctionDetails depends() returns false for full_termination', () => {
      expect(
        pages.correctionDetails.depends({ typeOfChange: 'full_termination' }),
      ).to.be.false;
    });

    it('timelinessAcknowledgment depends() does not throw for undefined effectiveDateOfChange', () => {
      expect(() =>
        pages.timelinessAcknowledgment.depends({
          typeOfChange: 'full_termination',
          effectiveDateOfChange: undefined,
        }),
      ).to.not.throw();
    });

    it('timelinessAcknowledgment depends() returns false for correction type', () => {
      const old = new Date();
      old.setDate(old.getDate() - 45);
      expect(
        pages.timelinessAcknowledgment.depends({
          typeOfChange: 'correction',
          effectiveDateOfChange: old.toISOString().split('T')[0],
        }),
      ).to.be.false;
    });

    it('timelinessAcknowledgment depends() returns true for > 30 days ago + non-correction type', () => {
      const old = new Date();
      old.setDate(old.getDate() - 45);
      expect(
        pages.timelinessAcknowledgment.depends({
          typeOfChange: 'full_termination',
          effectiveDateOfChange: old.toISOString().split('T')[0],
        }),
      ).to.be.true;
    });
  });

  describe('supportingDocumentation depends() function', () => {
    const { pages } = formConfig.chapters.supportingDocumentationChapter;

    it('returns true for correction type', () => {
      expect(
        pages.supportingDocumentation.depends({
          typeOfChange: 'correction',
          mitigatingCircumstancesKnown: 'no',
        }),
      ).to.be.true;
    });

    it('returns true when mitigatingCircumstancesKnown is yes', () => {
      expect(
        pages.supportingDocumentation.depends({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'yes',
        }),
      ).to.be.true;
    });

    it('returns false when not correction and no mitigating circumstances', () => {
      expect(
        pages.supportingDocumentation.depends({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'no',
        }),
      ).to.be.false;
    });

    it('does not throw for null inputs', () => {
      expect(() =>
        pages.supportingDocumentation.depends({
          typeOfChange: null,
          mitigatingCircumstancesKnown: null,
        }),
      ).to.not.throw();
    });
  });
});