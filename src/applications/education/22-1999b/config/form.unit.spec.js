import { expect } from 'chai';
import formConfig from './form';

describe('config/form', () => {
  it('exports a formConfig object', () => {
    expect(formConfig).to.be.an('object');
  });

  it('has required top-level properties', () => {
    expect(formConfig).to.have.property('formId', '22-1999b');
    expect(formConfig).to.have.property('title', 'Report an enrollment change');
    expect(formConfig).to.have.property('chapters');
    expect(formConfig).to.have.property('introduction');
    expect(formConfig).to.have.property('confirmation');
    expect(formConfig).to.have.property('trackingPrefix');
    expect(formConfig).to.have.property('saveInProgress');
  });

  it('has saveInProgress.messages', () => {
    expect(formConfig.saveInProgress.messages).to.have.property('inProgress');
    expect(formConfig.saveInProgress.messages).to.have.property('expired');
    expect(formConfig.saveInProgress.messages).to.have.property('saved');
  });

  it('has all expected chapters', () => {
    const chapterKeys = Object.keys(formConfig.chapters);
    expect(chapterKeys).to.include('institutionAndSCOChapter');
    expect(chapterKeys).to.include('studentAndCertificationChapter');
    expect(chapterKeys).to.include('enrollmentChangeDetailsChapter');
    expect(chapterKeys).to.include('supportingDocumentationChapter');
    expect(chapterKeys).to.include('certificationAttestationChapter');
  });

  describe('every page has required properties', () => {
    Object.entries(formConfig.chapters).forEach(([chapterKey, chapter]) => {
      Object.entries(chapter.pages).forEach(([pageKey, page]) => {
        it(`chapter "${chapterKey}" page "${pageKey}" has path`, () => {
          expect(page).to.have.property('path');
          expect(page.path).to.be.a('string');
          expect(page.path.length).to.be.greaterThan(0);
        });

        it(`chapter "${chapterKey}" page "${pageKey}" has title`, () => {
          expect(page).to.have.property('title');
          expect(page.title).to.be.a('string');
        });

        it(`chapter "${chapterKey}" page "${pageKey}" has uiSchema`, () => {
          expect(page).to.have.property('uiSchema');
          expect(page.uiSchema).to.be.an('object');
        });

        it(`chapter "${chapterKey}" page "${pageKey}" has schema`, () => {
          expect(page).to.have.property('schema');
          expect(page.schema).to.be.an('object');
        });
      });
    });
  });

  describe('depends functions', () => {
    const getPage = (chapterKey, pageKey) =>
      formConfig.chapters[chapterKey].pages[pageKey];

    it('lastDateOfAttendance depends returns true for full_termination', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'lastDateOfAttendance',
      );
      expect(() =>
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.not.throw();
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.true;
    });

    it('lastDateOfAttendance depends returns false for credit_hour_reduction', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'lastDateOfAttendance',
      );
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'credit_hour_reduction' },
        }),
      ).to.be.false;
    });

    it('lastDateOfAttendance depends handles null gracefully', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'lastDateOfAttendance',
      );
      expect(() => page.depends(null)).to.not.throw();
    });

    it('updatedEnrollmentDetails depends returns true for partial_withdrawal', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'updatedEnrollmentDetails',
      );
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'partial_withdrawal' },
        }),
      ).to.be.true;
    });

    it('reasonForChange depends returns false for correction', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'reasonForChange',
      );
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'correction' },
        }),
      ).to.be.false;
    });

    it('reasonForChange depends returns true for full_termination', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'reasonForChange',
      );
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.true;
    });

    it('correctionDetails depends returns true only for correction', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'correctionDetails',
      );
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'correction' },
        }),
      ).to.be.true;
      expect(
        page.depends({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.false;
    });

    it('mitigatingCircumstances depends handles empty formData', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'mitigatingCircumstances',
      );
      expect(() => page.depends({})).to.not.throw();
    });

    it('supportingDocumentation depends handles null gracefully', () => {
      const page = getPage(
        'supportingDocumentationChapter',
        'supportingDocumentation',
      );
      expect(() => page.depends({})).to.not.throw();
    });

    it('timelinessAcknowledgment depends handles empty formData', () => {
      const page = getPage(
        'enrollmentChangeDetailsChapter',
        'timelinessAcknowledgment',
      );
      expect(() => page.depends({})).to.not.throw();
    });
  });

  it('prefillEnabled is true', () => {
    expect(formConfig.prefillEnabled).to.be.true;
  });

  it('has submitUrl set', () => {
    expect(formConfig.submitUrl).to.be.a('string');
    expect(formConfig.submitUrl).to.include('edu_22_1999b_forms');
  });
});