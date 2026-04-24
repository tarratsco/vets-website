import { expect } from 'chai';

import {
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  isLateSubmission,
  hasMitigatingReasonCode,
  requiresSupportingDocumentation,
  showSupportingDocumentation,
  MITIGATING_REASON_CODES,
} from '../utils/conditionalPageLogic';

describe('conditionalPageLogic', () => {
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

    it('returns false for null', () => {
      expect(isTerminationOrWithdrawal(null)).to.be.false;
    });

    it('returns false for undefined', () => {
      expect(isTerminationOrWithdrawal(undefined)).to.be.false;
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

    it('returns false for correction', () => {
      expect(isReductionOrPartialWithdrawal('correction')).to.be.false;
    });

    it('returns false for null', () => {
      expect(isReductionOrPartialWithdrawal(null)).to.be.false;
    });
  });

  describe('isLateSubmission', () => {
    it('returns false when effectiveDateOfChange is null', () => {
      expect(isLateSubmission(null)).to.be.false;
    });

    it('returns false when effectiveDateOfChange is undefined', () => {
      expect(isLateSubmission(undefined)).to.be.false;
    });

    it('returns false when effectiveDateOfChange is empty string', () => {
      expect(isLateSubmission('')).to.be.false;
    });

    it('returns true when effectiveDateOfChange is more than 30 days ago', () => {
      const longAgoDate = new Date();
      longAgoDate.setDate(longAgoDate.getDate() - 60);
      const isoDate = longAgoDate.toISOString().split('T')[0];
      expect(isLateSubmission(isoDate)).to.be.true;
    });

    it('returns false when effectiveDateOfChange is today', () => {
      const today = new Date();
      const isoDate = today.toISOString().split('T')[0];
      expect(isLateSubmission(isoDate)).to.be.false;
    });

    it('returns false when effectiveDateOfChange is 10 days ago', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 10);
      const isoDate = recentDate.toISOString().split('T')[0];
      expect(isLateSubmission(isoDate)).to.be.false;
    });
  });

  describe('hasMitigatingReasonCode', () => {
    it('returns true for voluntary_withdrawal', () => {
      expect(hasMitigatingReasonCode('voluntary_withdrawal')).to.be.true;
    });

    it('returns true for medical', () => {
      expect(hasMitigatingReasonCode('medical')).to.be.true;
    });

    it('returns true for personal_family_emergency', () => {
      expect(hasMitigatingReasonCode('personal_family_emergency')).to.be.true;
    });

    it('returns true for non_punitive_grade', () => {
      expect(hasMitigatingReasonCode('non_punitive_grade')).to.be.true;
    });

    it('returns false for military_deployment', () => {
      expect(hasMitigatingReasonCode('military_deployment')).to.be.false;
    });

    it('returns false for academic_dismissal', () => {
      expect(hasMitigatingReasonCode('academic_dismissal')).to.be.false;
    });

    it('returns false for undefined', () => {
      expect(hasMitigatingReasonCode(undefined)).to.be.false;
    });
  });

  describe('requiresSupportingDocumentation', () => {
    it('returns true when typeOfChange is correction', () => {
      expect(
        requiresSupportingDocumentation({ typeOfChange: 'correction' }),
      ).to.be.true;
    });

    it('returns false when typeOfChange is full_termination', () => {
      expect(
        requiresSupportingDocumentation({
          typeOfChange: 'full_termination',
        }),
      ).to.be.false;
    });
  });

  describe('showSupportingDocumentation', () => {
    it('returns true when typeOfChange is correction', () => {
      expect(
        showSupportingDocumentation({ typeOfChange: 'correction' }),
      ).to.be.true;
    });

    it('returns true when mitigatingCircumstancesKnown is yes', () => {
      expect(
        showSupportingDocumentation({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'yes',
        }),
      ).to.be.true;
    });

    it('returns false when no conditions are met and submission is recent', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 5);
      const isoDate = recentDate.toISOString().split('T')[0];
      expect(
        showSupportingDocumentation({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'no',
          effectiveDateOfChange: isoDate,
        }),
      ).to.be.false;
    });

    it('returns true when submission is late', () => {
      const longAgoDate = new Date();
      longAgoDate.setDate(longAgoDate.getDate() - 60);
      const isoDate = longAgoDate.toISOString().split('T')[0];
      expect(
        showSupportingDocumentation({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'no',
          effectiveDateOfChange: isoDate,
        }),
      ).to.be.true;
    });
  });

  describe('MITIGATING_REASON_CODES', () => {
    it('has 4 entries', () => {
      expect(MITIGATING_REASON_CODES).to.have.lengthOf(4);
    });
  });
});