import { expect } from 'chai';

import {
  timelinessAcknowledgmentUiSchema,
  timelinessAcknowledgmentSchema,
} from '../chapters/timelinessAcknowledgment';

describe('timelinessAcknowledgment page', () => {
  describe('uiSchema', () => {
    it('has lateSubmissionExplanation field', () => {
      expect(
        timelinessAcknowledgmentUiSchema.lateSubmissionExplanation,
      ).to.exist;
    });

    it('lateSubmissionExplanation has correct title', () => {
      expect(
        timelinessAcknowledgmentUiSchema.lateSubmissionExplanation['ui:title'],
      ).to.be.a('string');
    });

    it('has required error message', () => {
      expect(
        timelinessAcknowledgmentUiSchema.lateSubmissionExplanation[
          'ui:errorMessages'
        ].required,
      ).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(timelinessAcknowledgmentSchema.type).to.equal('object');
    });

    it('requires lateSubmissionExplanation', () => {
      expect(timelinessAcknowledgmentSchema.required).to.include(
        'lateSubmissionExplanation',
      );
    });

    it('lateSubmissionExplanation has maxLength 1000', () => {
      expect(
        timelinessAcknowledgmentSchema.properties.lateSubmissionExplanation
          .maxLength,
      ).to.equal(1000);
    });

    it('lateSubmissionExplanation has minLength 20', () => {
      expect(
        timelinessAcknowledgmentSchema.properties.lateSubmissionExplanation
          .minLength,
      ).to.equal(20);
    });
  });
});