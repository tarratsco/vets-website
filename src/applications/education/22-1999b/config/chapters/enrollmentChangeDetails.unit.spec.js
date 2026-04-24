import { expect } from 'chai';
import {
  typeOfChangeUiSchema,
  typeOfChangeSchema,
  effectiveDateOfChangeUiSchema,
  effectiveDateOfChangeSchema,
  lastDateOfAttendanceUiSchema,
  lastDateOfAttendanceSchema,
  updatedEnrollmentDetailsUiSchema,
  updatedEnrollmentDetailsSchema,
  reasonForChangeUiSchema,
  reasonForChangeSchema,
  mitigatingCircumstancesUiSchema,
  mitigatingCircumstancesSchema,
  correctionDetailsUiSchema,
  correctionDetailsSchema,
  timelinessAcknowledgmentUiSchema,
  timelinessAcknowledgmentSchema,
} from './enrollmentChangeDetails';

describe('enrollmentChangeDetails chapter', () => {
  describe('typeOfChangeSchema', () => {
    it('requires typeOfChange', () => {
      expect(typeOfChangeSchema.required).to.include('typeOfChange');
    });

    it('typeOfChange has correct enum values', () => {
      const { typeOfChange } = typeOfChangeSchema.properties;
      expect(typeOfChange.enum).to.include('full_termination');
      expect(typeOfChange.enum).to.include('partial_withdrawal');
      expect(typeOfChange.enum).to.include('credit_hour_reduction');
      expect(typeOfChange.enum).to.include('correction');
    });
  });

  describe('typeOfChangeUiSchema', () => {
    it('has typeOfChange radio UI config', () => {
      expect(typeOfChangeUiSchema.typeOfChange).to.be.an('object');
    });
  });

  describe('effectiveDateOfChangeSchema', () => {
    it('requires effectiveDateOfChange', () => {
      expect(effectiveDateOfChangeSchema.required).to.include(
        'effectiveDateOfChange',
      );
    });
  });

  describe('lastDateOfAttendanceSchema', () => {
    it('requires lastDateOfAttendance', () => {
      expect(lastDateOfAttendanceSchema.required).to.include(
        'lastDateOfAttendance',
      );
    });
  });

  describe('updatedEnrollmentDetailsSchema', () => {
    it('requires newCreditHours and newEnrollmentType', () => {
      expect(updatedEnrollmentDetailsSchema.required).to.include('newCreditHours');
      expect(updatedEnrollmentDetailsSchema.required).to.include('newEnrollmentType');
    });

    it('newCreditHours has min 1 and max 98', () => {
      const { newCreditHours } = updatedEnrollmentDetailsSchema.properties;
      expect(newCreditHours.minimum).to.equal(1);
      expect(newCreditHours.maximum).to.equal(98);
    });

    it('newEnrollmentType has enum values', () => {
      const { newEnrollmentType } = updatedEnrollmentDetailsSchema.properties;
      expect(newEnrollmentType.enum).to.include('full_time');
      expect(newEnrollmentType.enum).to.include('less_than_half_time');
    });
  });

  describe('reasonForChangeSchema', () => {
    it('requires reasonForChange', () => {
      expect(reasonForChangeSchema.required).to.include('reasonForChange');
    });

    it('reasonForChange has expected enum values', () => {
      const { reasonForChange } = reasonForChangeSchema.properties;
      expect(reasonForChange.enum).to.include('voluntary_withdrawal');
      expect(reasonForChange.enum).to.include('military_deployment');
      expect(reasonForChange.enum).to.include('other');
    });
  });

  describe('mitigatingCircumstancesSchema', () => {
    it('requires mitigatingCircumstancesKnown', () => {
      expect(mitigatingCircumstancesSchema.required).to.include(
        'mitigatingCircumstancesKnown',
      );
    });

    it('mitigatingCircumstancesKnown has yes/no/unknown enum', () => {
      const { mitigatingCircumstancesKnown } =
        mitigatingCircumstancesSchema.properties;
      expect(mitigatingCircumstancesKnown.enum).to.deep.equal([
        'yes',
        'no',
        'unknown',
      ]);
    });

    it('mitigatingCircumstancesNarrative has maxLength 2000', () => {
      const { mitigatingCircumstancesNarrative } =
        mitigatingCircumstancesSchema.properties;
      expect(mitigatingCircumstancesNarrative.maxLength).to.equal(2000);
    });
  });

  describe('mitigatingCircumstancesUiSchema', () => {
    it('narrative field has expandUnder option for yes answer', () => {
      expect(
        mitigatingCircumstancesUiSchema.mitigatingCircumstancesNarrative[
          'ui:options'
        ].expandUnderCondition,
      ).to.equal('yes');
    });
  });

  describe('correctionDetailsSchema', () => {
    it('requires correctionItems', () => {
      expect(correctionDetailsSchema.required).to.include('correctionItems');
    });

    it('correctionItems is a checkboxGroup schema', () => {
      const { correctionItems } = correctionDetailsSchema.properties;
      expect(correctionItems).to.be.an('object');
      expect(correctionItems.type).to.equal('object');
    });
  });

  describe('correctionDetailsUiSchema', () => {
    it('correctionItems has required: true at top level', () => {
      expect(correctionDetailsUiSchema.correctionItems['ui:required']).to.be
        .true;
    });
  });

  describe('timelinessAcknowledgmentSchema', () => {
    it('requires lateSubmissionExplanation', () => {
      expect(timelinessAcknowledgmentSchema.required).to.include(
        'lateSubmissionExplanation',
      );
    });

    it('lateSubmissionExplanation has minLength 20 and maxLength 1000', () => {
      const { lateSubmissionExplanation } =
        timelinessAcknowledgmentSchema.properties;
      expect(lateSubmissionExplanation.minLength).to.equal(20);
      expect(lateSubmissionExplanation.maxLength).to.equal(1000);
    });
  });
});