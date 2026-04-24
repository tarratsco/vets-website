import { expect } from 'chai';
import {
  isLateSubmission,
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  requiresMitigatingCircumstances,
  requiresLateSubmissionExplanation,
  requiresSupportingDocumentation,
} from './conditionalPageLogic';

describe('utils/conditionalPageLogic', () => {
  describe('isLateSubmission', () => {
    it('returns false for undefined', () => {
      expect(isLateSubmission(undefined)).to.be.false;
    });

    it('returns false for invalid date', () => {
      expect(isLateSubmission('not-a-date')).to.be.false;
    });

    it('returns false for a date within the last 30 days', () => {
      const recent = new Date();
      recent.setDate(recent.getDate() - 10);
      expect(isLateSubmission(recent.toISOString().slice(0, 10))).to.be.false;
    });

    it('returns true for a date more than 30 days ago', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);
      expect(isLateSubmission(old.toISOString().slice(0, 10))).to.be.true;
    });
  });

  describe('isTerminationOrWithdrawal', () => {
    it('returns true for full_termination', () => {
      expect(isTerminationOrWithdrawal('full_termination')).to.be.true;
    });

    it('returns true for partial_withdrawal', () => {
      expect(isTerminationOrWithdrawal('partial_withdrawal')).to.be.true;
    });

    it('returns false for credit_hour_reduction', () => {
      expect(isTerminationOrWithdrawal('credit_hour_reduction')).to.be.false;
    });

    it('returns false for correction', () => {
      expect(isTerminationOrWithdrawal('correction')).to.be.false;
    });
  });

  describe('isReductionOrPartialWithdrawal', () => {
    it('returns true for credit_hour_reduction', () => {
      expect(isReductionOrPartialWithdrawal('credit_hour_reduction')).to.be
        .true;
    });

    it('returns true for partial_withdrawal', () => {
      expect(isReductionOrPartialWithdrawal('partial_withdrawal')).to.be.true;
    });

    it('returns false for full_termination', () => {
      expect(isReductionOrPartialWithdrawal('full_termination')).to.be.false;
    });
  });

  describe('requiresMitigatingCircumstances', () => {
    it('returns true when reason is voluntary_withdrawal and type is not correction', () => {
      expect(
        requiresMitigatingCircumstances({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            reasonForChange: 'voluntary_withdrawal',
          },
        }),
      ).to.be.true;
    });

    it('returns false when typeOfChange is correction', () => {
      expect(
        requiresMitigatingCircumstances({
          enrollmentChangeDetails: {
            typeOfChange: 'correction',
            reasonForChange: 'voluntary_withdrawal',
          },
        }),
      ).to.be.false;
    });

    it('returns false when reason is academic_dismissal', () => {
      expect(
        requiresMitigatingCircumstances({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            reasonForChange: 'academic_dismissal',
          },
        }),
      ).to.be.false;
    });

    it('returns false for empty formData', () => {
      expect(requiresMitigatingCircumstances({})).to.be.false;
    });
  });

  describe('requiresSupportingDocumentation', () => {
    it('returns true when typeOfChange is correction', () => {
      expect(
        requiresSupportingDocumentation({
          enrollmentChangeDetails: {
            typeOfChange: 'correction',
          },
        }),
      ).to.be.true;
    });

    it('returns true when mitigatingCircumstancesKnown is yes', () => {
      expect(
        requiresSupportingDocumentation({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            mitigatingCircumstances: {
              mitigatingCircumstancesKnown: 'yes',
            },
          },
        }),
      ).to.be.true;
    });

    it('returns false when neither condition is met', () => {
      expect(
        requiresSupportingDocumentation({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            mitigatingCircumstances: {
              mitigatingCircumstancesKnown: 'no',
            },
          },
        }),
      ).to.be.false;
    });
  });
});