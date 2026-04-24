import { expect } from 'chai';

import formConfig from '../config/form';

describe('formConfig', () => {
  it('has correct formId', () => {
    expect(formConfig.formId).to.equal('22-1999b');
  });

  it('has a title', () => {
    expect(formConfig.title).to.be.a('string');
    expect(formConfig.title).to.not.be.empty;
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

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.be.an('object');
    expect(formConfig.saveInProgress.messages.inProgress).to.be.a('string');
    expect(formConfig.saveInProgress.messages.expired).to.be.a('string');
    expect(formConfig.saveInProgress.messages.saved).to.be.a('string');
  });

  it('has trackingPrefix', () => {
    expect(formConfig.trackingPrefix).to.be.a('string');
    expect(formConfig.trackingPrefix).to.not.be.empty;
  });

  it('has prefillEnabled set to true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });

  it('has submitUrl', () => {
    expect(formConfig.submitUrl).to.be.a('string');
    expect(formConfig.submitUrl).to.include('edu_22_1999b_forms');
  });

  describe('chapters', () => {
    it('has institutionAndSCO chapter', () => {
      expect(formConfig.chapters.institutionAndSCO).to.exist;
    });

    it('has studentAndCertification chapter', () => {
      expect(formConfig.chapters.studentAndCertification).to.exist;
    });

    it('has enrollmentChangeDetails chapter', () => {
      expect(formConfig.chapters.enrollmentChangeDetails).to.exist;
    });

    it('has supportingDocumentation chapter', () => {
      expect(formConfig.chapters.supportingDocumentation).to.exist;
    });

    it('has certificationAttestation chapter', () => {
      expect(formConfig.chapters.certificationAttestation).to.exist;
    });
  });

  describe('pages structure', () => {
    const allPages = Object.values(formConfig.chapters).reduce(
      (acc, chapter) => {
        return { ...acc, ...chapter.pages };
      },
      {},
    );

    it('every page has a path', () => {
      Object.entries(allPages).forEach(([name, page]) => {
        expect(page.path, `Page ${name} missing path`).to.be.a('string');
        expect(page.path, `Page ${name} has empty path`).to.not.be.empty;
      });
    });

    it('every page has a title', () => {
      Object.entries(allPages).forEach(([name, page]) => {
        expect(page.title, `Page ${name} missing title`).to.be.a('string');
        expect(page.title, `Page ${name} has empty title`).to.not.be.empty;
      });
    });

    it('every page has a uiSchema', () => {
      Object.entries(allPages).forEach(([name, page]) => {
        expect(page.uiSchema, `Page ${name} missing uiSchema`).to.be.an(
          'object',
        );
      });
    });

    it('every page has a schema', () => {
      Object.entries(allPages).forEach(([name, page]) => {
        expect(page.schema, `Page ${name} missing schema`).to.be.an('object');
      });
    });
  });

  describe('depends functions', () => {
    const enrollmentPages = formConfig.chapters.enrollmentChangeDetails.pages;

    it('lastDateOfAttendance depends returns true for full_termination', () => {
      expect(() =>
        enrollmentPages.lastDateOfAttendance.depends({
          typeOfChange: 'full_termination',
        }),
      ).to.not.throw();
      expect(
        enrollmentPages.lastDateOfAttendance.depends({
          typeOfChange: 'full_termination',
        }),
      ).to.be.true;
    });

    it('lastDateOfAttendance depends returns false for correction', () => {
      expect(
        enrollmentPages.lastDateOfAttendance.depends({
          typeOfChange: 'correction',
        }),
      ).to.be.false;
    });

    it('lastDateOfAttendance depends handles null without throwing', () => {
      expect(() =>
        enrollmentPages.lastDateOfAttendance.depends({ typeOfChange: null }),
      ).to.not.throw();
    });

    it('updatedEnrollmentDetails depends returns true for credit_hour_reduction', () => {
      expect(
        enrollmentPages.updatedEnrollmentDetails.depends({
          typeOfChange: 'credit_hour_reduction',
        }),
      ).to.be.true;
    });

    it('updatedEnrollmentDetails depends returns false for full_termination', () => {
      expect(
        enrollmentPages.updatedEnrollmentDetails.depends({
          typeOfChange: 'full_termination',
        }),
      ).to.be.false;
    });

    it('updatedEnrollmentDetails depends handles null without throwing', () => {
      expect(() =>
        enrollmentPages.updatedEnrollmentDetails.depends({
          typeOfChange: null,
        }),
      ).to.not.throw();
    });

    it('reasonForChange depends returns false for correction', () => {
      expect(
        enrollmentPages.reasonForChange.depends({ typeOfChange: 'correction' }),
      ).to.be.false;
    });

    it('reasonForChange depends returns true for full_termination', () => {
      expect(
        enrollmentPages.reasonForChange.depends({
          typeOfChange: 'full_termination',
        }),
      ).to.be.true;
    });

    it('reasonForChange depends handles null without throwing', () => {
      expect(() =>
        enrollmentPages.reasonForChange.depends({ typeOfChange: null }),
      ).to.not.throw();
    });

    it('mitigatingCircumstances depends returns true for voluntary_withdrawal', () => {
      expect(
        enrollmentPages.mitigatingCircumstances.depends({
          typeOfChange: 'full_termination',
          reasonForChange: 'voluntary_withdrawal',
        }),
      ).to.be.true;
    });

    it('mitigatingCircumstances depends returns false for correction', () => {
      expect(
        enrollmentPages.mitigatingCircumstances.depends({
          typeOfChange: 'correction',
          reasonForChange: 'voluntary_withdrawal',
        }),
      ).to.be.false;
    });

    it('mitigatingCircumstances depends returns false for military_deployment', () => {
      expect(
        enrollmentPages.mitigatingCircumstances.depends({
          typeOfChange: 'full_termination',
          reasonForChange: 'military_deployment',
        }),
      ).to.be.false;
    });

    it('mitigatingCircumstances depends handles null without throwing', () => {
      expect(() =>
        enrollmentPages.mitigatingCircumstances.depends({
          typeOfChange: null,
          reasonForChange: null,
        }),
      ).to.not.throw();
    });

    it('correctionDetails depends returns true for correction', () => {
      expect(
        enrollmentPages.correctionDetails.depends({
          typeOfChange: 'correction',
        }),
      ).to.be.true;
    });

    it('correctionDetails depends returns false for full_termination', () => {
      expect(
        enrollmentPages.correctionDetails.depends({
          typeOfChange: 'full_termination',
        }),
      ).to.be.false;
    });

    it('correctionDetails depends handles null without throwing', () => {
      expect(() =>
        enrollmentPages.correctionDetails.depends({ typeOfChange: null }),
      ).to.not.throw();
    });

    it('timelinessAcknowledgment depends returns false for correction', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 60);
      const isoDate = recentDate.toISOString().split('T')[0];
      expect(
        enrollmentPages.timelinessAcknowledgment.depends({
          typeOfChange: 'correction',
          effectiveDateOfChange: isoDate,
        }),
      ).to.be.false;
    });

    it('timelinessAcknowledgment depends returns false for recent submission', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 5);
      const isoDate = recentDate.toISOString().split('T')[0];
      expect(
        enrollmentPages.timelinessAcknowledgment.depends({
          typeOfChange: 'full_termination',
          effectiveDateOfChange: isoDate,
        }),
      ).to.be.false;
    });

    it('timelinessAcknowledgment depends returns true for old submission', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 60);
      const isoDate = oldDate.toISOString().split('T')[0];
      expect(
        enrollmentPages.timelinessAcknowledgment.depends({
          typeOfChange: 'full_termination',
          effectiveDateOfChange: isoDate,
        }),
      ).to.be.true;
    });

    it('timelinessAcknowledgment depends handles null without throwing', () => {
      expect(() =>
        enrollmentPages.timelinessAcknowledgment.depends({
          typeOfChange: null,
          effectiveDateOfChange: null,
        }),
      ).to.not.throw();
    });

    it('documentUpload depends returns true for correction', () => {
      const docPage =
        formConfig.chapters.supportingDocumentation.pages.documentUpload;
      expect(
        docPage.depends({ typeOfChange: 'correction' }),
      ).to.be.true;
    });

    it('documentUpload depends handles null without throwing', () => {
      const docPage =
        formConfig.chapters.supportingDocumentation.pages.documentUpload;
      expect(() => docPage.depends({})).to.not.throw();
    });
  });
});