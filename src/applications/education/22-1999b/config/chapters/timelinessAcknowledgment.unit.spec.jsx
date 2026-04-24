import { expect } from 'chai';

import {
  timelinessAcknowledgmentUiSchema,
  timelinessAcknowledgmentSchema,
} from './timelinessAcknowledgment';

describe('timelinessAcknowledgment page', () => {
  it('uiSchema has lateSubmissionExplanation textarea', () => {
    expect(
      timelinessAcknowledgmentUiSchema.lateSubmissionExplanation,
    ).to.be.an('object');
  });

  it('uiSchema has correct title', () => {
    expect(
      timelinessAcknowledgmentUiSchema.lateSubmissionExplanation['ui:title'],
    ).to.equal(
      'Why is this change being reported more than 30 days after it occurred?',
    );
  });

  it('schema requires lateSubmissionExplanation', () => {
    expect(timelinessAcknowledgmentSchema.required).to.include(
      'lateSubmissionExplanation',
    );
  });

  it('schema has correct maxLength of 1000', () => {
    expect(
      timelinessAcknowledgmentSchema.properties.lateSubmissionExplanation
        .maxLength,
    ).to.equal(1000);
  });

  describe('validateLateExplanation via ui:validations', () => {
    const validations =
      timelinessAcknowledgmentUiSchema.lateSubmissionExplanation[
        'ui:validations'
      ];

    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('has at least one validation', () => {
      expect(validations).to.be.an('array').with.length.greaterThan(0);
    });

    it('adds error for short value', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 'Too short');
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error for empty value', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, '');
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error for null value', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, null);
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error for sufficient explanation', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](
        errors,
        'The enrollment records were not available until now due to a system outage.',
      );
      expect(messages).to.have.lengthOf(0);
    });
  });
});