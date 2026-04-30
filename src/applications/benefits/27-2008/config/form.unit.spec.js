import { expect } from 'chai';
import formConfig from './form';

describe('formConfig', () => {
  it('has required top-level properties', () => {
    expect(formConfig).to.have.property('formId', '27-2008');
    expect(formConfig).to.have.property('title');
    expect(formConfig).to.have.property('chapters');
    expect(formConfig).to.have.property('introduction');
    expect(formConfig).to.have.property('confirmation');
    expect(formConfig).to.have.property('transformForSubmit');
    expect(formConfig).to.have.property('trackingPrefix');
  });

  it('has saveInProgress messages', () => {
    expect(formConfig.saveInProgress).to.be.an('object');
    expect(formConfig.saveInProgress.messages).to.have.property('inProgress');
    expect(formConfig.saveInProgress.messages).to.have.property('expired');
    expect(formConfig.saveInProgress.messages).to.have.property('saved');
  });

  it('has prefillEnabled set', () => {
    expect(formConfig.prefillEnabled).to.equal(true);
  });

  it('has rootUrl defined', () => {
    expect(formConfig.rootUrl).to.be.a('string');
    expect(formConfig.rootUrl).to.include('burial');
  });

  it('has trackingPrefix ending with a dash', () => {
    expect(formConfig.trackingPrefix).to.match(/burial-flag-27-2008-/);
  });

  describe('chapters', () => {
    const chapters = [
      'applicantTypeChapter',
      'veteranInformationChapter',
      'serviceInformationChapter',
      'eligibilityChapter',
      'flagRecipientChapter',
      'applicantChapter',
      'documentsChapter',
      'remarksChapter',
    ];

    chapters.forEach(chapterKey => {
      it(`has chapter: ${chapterKey}`, () => {
        expect(formConfig.chapters).to.have.property(chapterKey);
      });
    });

    it('every page in every chapter has path, title, uiSchema, schema', () => {
      Object.values(formConfig.chapters).forEach(chapter => {
        Object.values(chapter.pages).forEach(page => {
          expect(page).to.have.property('path');
          expect(page).to.have.property('title');
          expect(page).to.have.property('uiSchema');
          expect(page).to.have.property('schema');
        });
      });
    });

    describe('reserveGuardCheck depends function', () => {
      const reservePage =
        formConfig.chapters.eligibilityChapter.pages.reserveGuardCheck;

      it('returns true when selectedReserve is in branchOfService', () => {
        const formData = {
          serviceInformation: {
            branchOfService: ['army', 'selectedReserve'],
          },
        };
        expect(() => reservePage.depends(formData)).to.not.throw();
        expect(reservePage.depends(formData)).to.equal(true);
      });

      it('returns false when selectedReserve is not in branchOfService', () => {
        const formData = {
          serviceInformation: { branchOfService: ['army', 'navy'] },
        };
        expect(reservePage.depends(formData)).to.equal(false);
      });

      it('returns false when branchOfService is empty array', () => {
        const formData = { serviceInformation: { branchOfService: [] } };
        expect(reservePage.depends(formData)).to.equal(false);
      });

      it('returns false when formData is null', () => {
        expect(() => reservePage.depends(null)).to.not.throw();
        expect(reservePage.depends(null)).to.equal(false);
      });

      it('returns false when serviceInformation is undefined', () => {
        expect(reservePage.depends({})).to.equal(false);
      });
    });
  });
});