import { expect } from 'chai';
import {
  isTerminationOrWithdrawal,
  isReductionOrPartialWithdrawal,
  isLateSubmission,
  requiresMitigatingCircumstances,
  showLastDateOfAttendance,
  showUpdatedEnrollmentDetails,
  showReasonForChange,
  showMitigatingCircumstances,
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
    it('returns false for undefined', () => {
      expect(isTerminationOrWithdrawal(undefined)).to.be.false;
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
      recent.setDate(recent.getDate() - 10);
      const iso = recent.toISOString().split('T')[0];
      expect(isLateSubmission(iso)).to.be.false;
    });
    it('returns true for a date more than 30 days ago', () => {
      const old = new Date();
      old.setDate(old.getDate() - 45);
      const iso = old.toISOString().split('T')[0];
      expect(isLateSubmission(iso)).to.be.true;
    });
  });

  describe('requiresMitigatingCircumstances', () => {
    it('returns true for voluntary_withdrawal', () => {
      expect(requiresMitigatingCircumstances('voluntary_withdrawal')).to.be.true;
    });
    it('returns true for medical', () => {
      expect(requiresMitigatingCircumstances('medical')).to.be.true;
    });
    it('returns true for personal_family_emergency', () => {
      expect(requiresMitigatingCircumstances('personal_family_emergency')).to.be.true;
    });
    it('returns true for non_punitive_grade', () => {
      expect(requiresMitigatingCircumstances('non_punitive_grade')).to.be.true;
    });
    it('returns false for academic_dismissal', () => {
      expect(requiresMitigatingCircumstances('academic_dismissal')).to.be.false;
    });
    it('returns false for military_deployment', () => {
      expect(requiresMitigatingCircumstances('military_deployment')).to.be.false;
    });
  });

  describe('showLastDateOfAttendance', () => {
    it('returns true when typeOfChange is full_termination', () => {
      expect(
        showLastDateOfAttendance({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.true;
    });
    it('returns false when typeOfChange is correction', () => {
      expect(
        showLastDateOfAttendance({
          enrollmentChangeDetails: { typeOfChange: 'correction' },
        }),
      ).to.be.false;
    });
    it('returns false when formData is empty', () => {
      expect(showLastDateOfAttendance({})).to.be.false;
    });
    it('does not throw with null formData', () => {
      expect(() => showLastDateOfAttendance(null)).not.to.throw();
    });
  });

  describe('showUpdatedEnrollmentDetails', () => {
    it('returns true for credit_hour_reduction', () => {
      expect(
        showUpdatedEnrollmentDetails({
          enrollmentChangeDetails: { typeOfChange: 'credit_hour_reduction' },
        }),
      ).to.be.true;
    });
    it('returns false for full_termination', () => {
      expect(
        showUpdatedEnrollmentDetails({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.false;
    });
    it('does not throw with null formData', () => {
      expect(() => showUpdatedEnrollmentDetails(null)).not.to.throw();
    });
  });

  describe('showReasonForChange', () => {
    it('returns true when typeOfChange is full_termination', () => {
      expect(
        showReasonForChange({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.true;
    });
    it('returns false when typeOfChange is correction', () => {
      expect(
        showReasonForChange({
          enrollmentChangeDetails: { typeOfChange: 'correction' },
        }),
      ).to.be.false;
    });
    it('does not throw with null formData', () => {
      expect(() => showReasonForChange(null)).not.to.throw();
    });
  });

  describe('showMitigatingCircumstances', () => {
    it('returns true when reason is voluntary_withdrawal and not correction', () => {
      expect(
        showMitigatingCircumstances({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            reasonForChange: 'voluntary_withdrawal',
          },
        }),
      ).to.be.true;
    });
    it('returns false when typeOfChange is correction', () => {
      expect(
        showMitigatingCircumstances({
          enrollmentChangeDetails: {
            typeOfChange: 'correction',
            reasonForChange: 'voluntary_withdrawal',
          },
        }),
      ).to.be.false;
    });
    it('returns false when reason is academic_dismissal', () => {
      expect(
        showMitigatingCircumstances({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            reasonForChange: 'academic_dismissal',
          },
        }),
      ).to.be.false;
    });
    it('does not throw with null formData', () => {
      expect(() => showMitigatingCircumstances(null)).not.to.throw();
    });
  });

  describe('showCorrectionDetails', () => {
    it('returns true when typeOfChange is correction', () => {
      expect(
        showCorrectionDetails({
          enrollmentChangeDetails: { typeOfChange: 'correction' },
        }),
      ).to.be.true;
    });
    it('returns false when typeOfChange is full_termination', () => {
      expect(
        showCorrectionDetails({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.false;
    });
    it('does not throw with null formData', () => {
      expect(() => showCorrectionDetails(null)).not.to.throw();
    });
  });

  describe('showSupportingDocumentation', () => {
    it('returns true for correction type', () => {
      expect(
        showSupportingDocumentation({
          enrollmentChangeDetails: { typeOfChange: 'correction' },
        }),
      ).to.be.true;
    });
    it('returns true for full_termination (always available)', () => {
      expect(
        showSupportingDocumentation({
          enrollmentChangeDetails: { typeOfChange: 'full_termination' },
        }),
      ).to.be.true;
    });
    it('does not throw with null formData', () => {
      expect(() => showSupportingDocumentation(null)).not.to.throw();
    });
  });

  describe('showTimelinessAcknowledgment', () => {
    it('returns false for correction type regardless of date', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);
      expect(
        showTimelinessAcknowledgment({
          enrollmentChangeDetails: {
            typeOfChange: 'correction',
            effectiveDateOfChange: old.toISOString().split('T')[0],
          },
        }),
      ).to.be.false;
    });
    it('returns true when late and not correction', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);
      expect(
        showTimelinessAcknowledgment({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            effectiveDateOfChange: old.toISOString().split('T')[0],
          },
        }),
      ).to.be.true;
    });
    it('returns false when not late', () => {
      const recent = new Date();
      recent.setDate(recent.getDate() - 5);
      expect(
        showTimelinessAcknowledgment({
          enrollmentChangeDetails: {
            typeOfChange: 'full_termination',
            effectiveDateOfChange: recent.toISOString().split('T')[0],
          },
        }),
      ).to.be.false;
    });
    it('does not throw with null formData', () => {
      expect(() => showTimelinessAcknowledgment(null)).not.to.throw();
    });
  });
});