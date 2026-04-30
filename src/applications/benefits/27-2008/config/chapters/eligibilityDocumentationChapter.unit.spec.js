import { expect } from 'chai';
import {
  eligibilityDocumentationUiSchema,
  eligibilityDocumentationSchema,
} from './eligibilityDocumentationChapter';

describe('eligibilityDocumentationChapter', () => {
  it('uiSchema has eligibility.documentationAvailable field', () => {
    expect(
      eligibilityDocumentationUiSchema.eligibility.documentationAvailable,
    ).to.exist;
  });

  it('schema requires documentationAvailable', () => {
    const elig =
      eligibilityDocumentationSchema.properties.eligibility;
    expect(elig.required).to.include('documentationAvailable');
  });

  it('has cross-field validations array', () => {
    expect(
      eligibilityDocumentationUiSchema['ui:validations'],
    ).to.be.an('array');
  });

  describe('remarks required when no documentation', () => {
    const validate =
      eligibilityDocumentationUiSchema['ui:validations'][0];
    let messages;
    let errors;

    beforeEach(() => {
      messages = [];
      errors = {
        remarks: { addError: msg => messages.push(msg || '') },
      };
    });

    it('does not error when documentation is available', () => {
      validate(errors, {
        eligibility: { documentationAvailable: true },
        remarks: '',
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when documentation is not available and remarks is empty', () => {
      validate(errors, {
        eligibility: { documentationAvailable: false },
        remarks: '',
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not error when documentation unavailable but remarks provided', () => {
      validate(errors, {
        eligibility: { documentationAvailable: false },
        remarks: 'I personally knew this Veteran.',
      });
      expect(messages).to.have.lengthOf(0);
    });
  });
});