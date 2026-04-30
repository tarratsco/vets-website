import { expect } from 'chai';
import {
  veteranDatesUiSchema,
  veteranDatesSchema,
} from './veteranDatesChapter';

describe('veteranDatesChapter', () => {
  it('uiSchema has veteranInformation group', () => {
    expect(veteranDatesUiSchema.veteranInformation).to.exist;
  });

  it('schema requires dateOfBirth, dateOfDeath, dateOfBurial', () => {
    const vetInfo =
      veteranDatesSchema.properties.veteranInformation;
    expect(vetInfo.required).to.include('dateOfBirth');
    expect(vetInfo.required).to.include('dateOfDeath');
    expect(vetInfo.required).to.include('dateOfBurial');
  });

  it('uiSchema has cross-field date validations', () => {
    expect(veteranDatesUiSchema['ui:validations']).to.be.an('array');
    expect(veteranDatesUiSchema['ui:validations'].length).to.equal(2);
  });

  describe('dob before death validation', () => {
    const validateDobDod = veteranDatesUiSchema['ui:validations'][0];
    let messages;
    let errors;

    beforeEach(() => {
      messages = [];
      errors = {
        veteranInformation: {
          dateOfDeath: { addError: msg => messages.push(msg || '') },
        },
      };
    });

    it('does not error when dob is before dod', () => {
      validateDobDod(errors, {
        veteranInformation: {
          dateOfBirth: '1940-01-01',
          dateOfDeath: '2020-05-01',
        },
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when dob is after dod', () => {
      validateDobDod(errors, {
        veteranInformation: {
          dateOfBirth: '2020-01-01',
          dateOfDeath: '1990-05-01',
        },
      });
      expect(messages).to.have.lengthOf(1);
    });
  });

  describe('death before burial validation', () => {
    const validateDodBurial = veteranDatesUiSchema['ui:validations'][1];
    let messages;
    let errors;

    beforeEach(() => {
      messages = [];
      errors = {
        veteranInformation: {
          dateOfBurial: { addError: msg => messages.push(msg || '') },
        },
      };
    });

    it('does not error when dod is before burial', () => {
      validateDodBurial(errors, {
        veteranInformation: {
          dateOfDeath: '2020-05-01',
          dateOfBurial: '2020-05-15',
        },
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when dod is after burial', () => {
      validateDodBurial(errors, {
        veteranInformation: {
          dateOfDeath: '2020-06-01',
          dateOfBurial: '2020-05-01',
        },
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not error when dates are missing', () => {
      validateDodBurial(errors, { veteranInformation: {} });
      expect(messages).to.have.lengthOf(0);
    });
  });
});