import { expect } from 'chai';

import {
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  isLateSubmission,
  showMitigatingCircumstances,
  showLastDateOfAttendance,
  showUpdatedEnrollmentDetails,
  showReasonForChange,
  showCorrectionDetails,
  showTimelinessAcknowledgment,
  showSupportingDocumentation,
} from './conditionalPageLogic';

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
  });

  describe('isLateSubmission', () => {
    it('returns false for null', () => {
      expect(isLateSubmission(null)).to.be.false;
    });

    it('returns false for undefined', () => {
      expect(isLateSubmission(undefined)).to.be.false;
    });

    it('returns false for an invalid date string', () => {
      expect(isLateSubmission('not-a-date')).to.be.false;
    });

    it('returns false for a date within 30 days', () => {
      const recent = new Date();
      recent.setDate(recent.getDate() - 5);
      const dateStr = recent.toISOString().split('T')[0];
      expect(isLateSubmission(dateStr)).to.be.false;
    });

    it('returns true for a date more than 30 days ago', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);
      const dateStr = old.toISOString().split('T')[0];
      expect(isLateSubmission(dateStr)).to.be.true;
    });
  });

  describe('showMitigatingCircumstances', () => {
    it('returns true for voluntary_withdrawal with non-correction change type', () => {
      expect(
        showMitigatingCircumstances({
          typeOfChange: 'full_termination',
          reasonForChange: 'voluntary_withdrawal',
        }),
      ).to.be.true;
    });

    it('returns false when typeOfChange is correction', () => {
      expect(
        showMitigatingCircumstances({
          typeOfChange: 'correction',
          reasonForChange: 'voluntary_withdrawal',
        }),
      ).to.be.false;
    });

    it('returns false for academic_dismissal', () => {
      expect(
        showMitigatingCircumstances({
          typeOfChange: 'full_termination',
          reasonForChange: 'academic_dismissal',
        }),
      ).to.be.false;
    });
  });

  describe('showLastDateOfAttendance', () => {
    it('returns true for full_termination', () => {
      expect(showLastDateOfAttendance({ typeOfChange: 'full_termination' })).to
        .be.true;
    });

    it('returns true for partial_withdrawal', () => {
      expect(showLastDateOfAttendance({ typeOfChange: 'partial_withdrawal' }))
        .to.be.true;
    });

    it('returns false for credit_hour_reduction', () => {
      expect(
        showLastDateOfAttendance({ typeOfChange: 'credit_hour_reduction' }),
      ).to.be.false;
    });
  });

  describe('showUpdatedEnrollmentDetails', () => {
    it('returns true for partial_withdrawal', () => {
      expect(
        showUpdatedEnrollmentDetails({ typeOfChange: 'partial_withdrawal' }),
      ).to.be.true;
    });

    it('returns true for credit_hour_reduction', () => {
      expect(
        showUpdatedEnrollmentDetails({ typeOfChange: 'credit_hour_reduction' }),
      ).to.be.true;
    });

    it('returns false for full_termination', () => {
      expect(
        showUpdatedEnrollmentDetails({ typeOfChange: 'full_termination' }),
      ).to.be.false;
    });
  });

  describe('showReasonForChange', () => {
    it('returns true for non-correction change types', () => {
      expect(showReasonForChange({ typeOfChange: 'full_termination' })).to.be
        .true;
    });

    it('returns false for correction', () => {
      expect(showReasonForChange({ typeOfChange: 'correction' })).to.be.false;
    });
  });

  describe('showCorrectionDetails', () => {
    it('returns true for correction', () => {
      expect(showCorrectionDetails({ typeOfChange: 'correction' })).to.be.true;
    });

    it('returns false for full_termination', () => {
      expect(showCorrectionDetails({ typeOfChange: 'full_termination' })).to.be
        .false;
    });
  });

  describe('showTimelinessAcknowledgment', () => {
    it('returns false for correction regardless of date', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);
      const dateStr = old.toISOString().split('T')[0];
      expect(
        showTimelinessAcknowledgment({
          typeOfChange: 'correction',
          effectiveDateOfChange: dateStr,
        }),
      ).to.be.false;
    });

    it('returns false when effectiveDateOfChange is recent', () => {
      const recent = new Date();
      recent.setDate(recent.getDate() - 5);
      const dateStr = recent.toISOString().split('T')[0];
      expect(
        showTimelinessAcknowledgment({
          typeOfChange: 'full_termination',
          effectiveDateOfChange: dateStr,
        }),
      ).to.be.false;
    });

    it('returns true when effectiveDateOfChange is more than 30 days ago and not correction', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);
      const dateStr = old.toISOString().split('T')[0];
      expect(
        showTimelinessAcknowledgment({
          typeOfChange: 'full_termination',
          effectiveDateOfChange: dateStr,
        }),
      ).to.be.true;
    });
  });

  describe('showSupportingDocumentation', () => {
    it('returns true for correction change type', () => {
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

    it('returns false when typeOfChange is not correction and mitigating is no', () => {
      expect(
        showSupportingDocumentation({
          typeOfChange: 'full_termination',
          mitigatingCircumstancesKnown: 'no',
        }),
      ).to.be.false;
    });
  });
});