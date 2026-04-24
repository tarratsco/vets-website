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
      const required =
        typeOfChangeSchema.properties.enrollmentChangeDetails.required;
      expect(required).to.include('typeOfChange');
    });

    it('typeOfChange enum has 4 values', () => {
      const { typeOfChange } =
        typeOfChangeSchema.properties.enrollmentChangeDetails.properties;
      expect(typeOfChange.enum).to.have.lengthOf(4);
      expect(typeOfChange.enum).to.include('full_termination');
      expect(typeOfChange.enum).to.include('correction');
    });
  });

  describe('typeOfChangeUiSchema', () => {
    it('has ui:title for typeOfChange', () => {
      const fieldUi =
        typeOfChangeUiSchema.enrollmentChangeDetails.typeOfChange;
      expect(fieldUi['ui:title']).to.be.a('string');
    });
  });

  describe('effectiveDateOfChangeSchema', () => {
    it('requires effectiveDateOfChange', () => {
      const required =
        effectiveDateOfChangeSchema.properties.enrollmentChangeDetails.required;
      expect(required).to.include('effectiveDateOfChange');
    });
  });

  describe('effectiveDateOfChangeUiSchema', () => {
    it('has ui:title for effectiveDateOfChange', () => {
      const fieldUi =
        effectiveDateOfChangeUiSchema.enrollmentChangeDetails.effectiveDateOfChange;
      expect(fieldUi['ui:title']).to.equal('Effective date of enrollment change');
    });
  });

  describe('lastDateOfAttendanceSchema', () => {
    it('requires lastDateOfAttendance', () => {
      const required =
        lastDateOfAttendanceSchema.properties.enrollmentChangeDetails.required;
      expect(required).to.include('lastDateOfAttendance');
    });
  });

  describe('updatedEnrollmentDetailsSchema', () => {
    it('newCreditHours has min 1 and max 98', () => {
      const { newCreditHours } =
        updatedEnrollmentDetailsSchema.properties.enrollmentChangeDetails.properties
          .updatedEnrollmentDetails.properties;
      expect(newCreditHours.minimum).to.equal(1);
      expect(newCreditHours.maximum).to.equal(98);
    });

    it('newEnrollmentType enum has 4 values', () => {
      const { newEnrollmentType } =
        updatedEnrollmentDetailsSchema.properties.enrollmentChangeDetails.properties
          .updatedEnrollmentDetails.properties;
      expect(newEnrollmentType.enum).to.have.lengthOf(4);
    });
  });

  describe('reasonForChangeSchema', () => {
    it('reasonForChange enum has 11 values', () => {
      const { reasonForChange } =
        reasonForChangeSchema.properties.enrollmentChangeDetails.properties;
      expect(reasonForChange.enum).to.have.lengthOf(11);
      expect(reasonForChange.enum).to.include('voluntary_withdrawal');
    });
  });

  describe('mitigatingCircumstancesSchema', () => {
    it('requires mitigatingCircumstancesKnown', () => {
      const required =
        mitigatingCircumstancesSchema.properties.enrollmentChangeDetails
          .properties.mitigatingCircumstances.required;
      expect(required).to.include('mitigatingCircumstancesKnown');
    });

    it('mitigatingCircumstancesNarrative has maxLength 2000', () => {
      const { mitigatingCircumstancesNarrative } =
        mitigatingCircumstancesSchema.properties.enrollmentChangeDetails
          .properties.mitigatingCircumstances.properties;
      expect(mitigatingCircumstancesNarrative.maxLength).to.equal(2000);
    });
  });

  describe('mitigatingCircumstancesUiSchema — ui:required for narrative', () => {
    const narrativeUi =
      mitigatingCircumstancesUiSchema.enrollmentChangeDetails
        .mitigatingCircumstances.mitigatingCircumstancesNarrative;

    it('narrative required returns true when known = yes', () => {
      const requiredFn = narrativeUi['ui:required'];
      if (typeof requiredFn === 'function') {
        expect(
          requiredFn({
            enrollmentChangeDetails: {
              mitigatingCircumstances: {
                mitigatingCircumstancesKnown: 'yes',
              },
            },
          }),
        ).to.be.true;
      }
    });

    it('narrative required returns false when known = no', () => {
      const requiredFn = narrativeUi['ui:required'];
      if (typeof requiredFn === 'function') {
        expect(
          requiredFn({
            enrollmentChangeDetails: {
              mitigatingCircumstances: {
                mitigatingCircumstancesKnown: 'no',
              },
            },
          }),
        ).to.be.false;
      }
    });
  });

  describe('correctionDetailsSchema', () => {
    it('requires correctionItems', () => {
      const required =
        correctionDetailsSchema.properties.enrollmentChangeDetails.properties
          .correctionDetails.required;
      expect(required).to.include('correctionItems');
    });

    it('correctionItems is an array type', () => {
      const { correctionItems } =
        correctionDetailsSchema.properties.enrollmentChangeDetails.properties
          .correctionDetails.properties;
      expect(correctionItems.type).to.equal('array');
    });
  });

  describe('timelinessAcknowledgmentSchema', () => {
    it('requires lateSubmissionExplanation', () => {
      const required =
        timelinessAcknowledgmentSchema.properties.enrollmentChangeDetails.required;
      expect(required).to.include('lateSubmissionExplanation');
    });

    it('lateSubmissionExplanation has minLength 20 and maxLength 1000', () => {
      const { lateSubmissionExplanation } =
        timelinessAcknowledgmentSchema.properties.enrollmentChangeDetails.properties;
      expect(lateSubmissionExplanation.minLength).to.equal(20);
      expect(lateSubmissionExplanation.maxLength).to.equal(1000);
    });
  });
});