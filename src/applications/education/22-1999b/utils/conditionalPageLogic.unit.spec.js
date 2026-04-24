import { expect } from 'chai';
import {
  isLateSubmission,
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  requiresMitigatingCircumstances,
  requiresSupportingDocumentation,
} from './conditionalPageLogic';

describe('conditionalPageLogic utilities', () => {
  describe('isLateSubmission', () => {
    it('returns false for undefined input', () => {
      expect(isLateSubmission(undefined)).to.be.false;
    });

    it('returns false for a date within 30 days', () => {
      const recent = new Date();
      recent.setDate(recent.getDate() - 10);
      const dateStr = recent.toISOString().split('T')[0];
      expect(isLateSubmission(dateStr)).to.be.false;
    });

    it('returns true for a date more than 30 days ago', () => {
      const old = new Date();
      old.setDate(old.getDate() - 45);
      const dateStr = old.toISOString().split('T')[0];
      expect(isLateSubmission(dateStr)).to.be.true;
    });

    it('returns false for exactly 30 days ago', () => {
      const exactly30 = new Date();
      exactly30.setDate(exactly30.getDate() - 30);
      const dateStr = exactly30.toISOString().split('T')[0];
      expect(isLateSubmission(dateStr)).to.be.false;
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
      expect(isReductionOrPartialWithdrawal('credit_hour_reduction')).to.be.true;
    });

    it('returns true for partial_withdrawal', () => {
      expect(isReductionOrPartialWithdrawal('partial_withdrawal')).to.be.true;
    });

    it('returns false for full_termination', () => {
      expect(isReductionOrPartialWithdrawal('full_termination')).to.be.false;
    });

    it('returns false for correction', () => {
      expect(isReductionOrPartialWithdrawal('correction')).to.be.false;
    });
  });

  describe('requiresMitigatingCircumstances', () => {
    it('returns true for voluntary_withdrawal', () => {
      expect(
        requiresMitigatingCircumstances(
          'full_termination',
          'voluntary_withdrawal',
        ),
      ).to.be.true;
    });

    it('returns true for medical reason', () => {
      expect(
        requiresMitigatingCircumstances('full_termination', 'medical'),
      ).to.be.true;
    });

    it('returns false for correction type regardless of reason', () => {
      expect(
        requiresMitigatingCircumstances('correction', 'voluntary_withdrawal'),
      ).to.be.false;
    });

    it('returns false for academic_dismissal reason', () => {
      expect(
        requiresMitigatingCircumstances('full_termination', 'academic_dismissal'),
      ).to.be.false;
    });
  });

  describe('requiresSupportingDocumentation', () => {
    it('returns true when typeOfChange is correction', () => {
      expect(requiresSupportingDocumentation('correction', 'no')).to.be.true;
    });

    it('returns true when mitigatingCircumstancesKnown is yes', () => {
      expect(
        requiresSupportingDocumentation('full_termination', 'yes'),
      ).to.be.true;
    });

    it('returns false when not correction and mitigating is no', () => {
      expect(
        requiresSupportingDocumentation('full_termination', 'no'),
      ).to.be.false;
    });

    it('returns false when not correction and mitigating is unknown', () => {
      expect(
        requiresSupportingDocumentation('full_termination', 'unknown'),
      ).to.be.false;
    });
  });
});