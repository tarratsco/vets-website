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

describe('chapters/enrollmentChangeDetails', () => {
  describe('typeOfChangeUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(typeOfChangeUiSchema).to.be.an('object');
    });

    it('has typeOfChange radio field', () => {
      const field =
        typeOfChangeUiSchema.enrollmentChangeDetails.typeOfChange;
      expect(field).to.exist;
      expect(field['ui:options']).to.have.property('labels');
    });
  });

  describe('typeOfChangeSchema', () => {
    it('requires typeOfChange', () => {
      const { required } = typeOfChangeSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('typeOfChange');
    });

    it('typeOfChange has enum values', () => {
      const { typeOfChange } = typeOfChangeSchema.properties.enrollmentChangeDetails.properties;
      expect(typeOfChange.enum).to.include('full_termination');
      expect(typeOfChange.enum).to.include('correction');
    });
  });

  describe('effectiveDateOfChangeSchema', () => {
    it('requires effectiveDateOfChange', () => {
      const { required } = effectiveDateOfChangeSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('effectiveDateOfChange');
    });
  });

  describe('lastDateOfAttendanceSchema', () => {
    it('requires lastDateOfAttendance', () => {
      const { required } = lastDateOfAttendanceSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('lastDateOfAttendance');
    });
  });

  describe('updatedEnrollmentDetailsSchema', () => {
    it('requires updatedEnrollmentDetails', () => {
      const { required } = updatedEnrollmentDetailsSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('updatedEnrollmentDetails');
    });

    it('newCreditHours has minimum 1 and maximum 98', () => {
      const { newCreditHours } = updatedEnrollmentDetailsSchema.properties.enrollmentChangeDetails.properties.updatedEnrollmentDetails.properties;
      expect(newCreditHours.minimum).to.equal(1);
      expect(newCreditHours.maximum).to.equal(98);
    });
  });

  describe('reasonForChangeSchema', () => {
    it('requires reasonForChange', () => {
      const { required } = reasonForChangeSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('reasonForChange');
    });

    it('reasonForChange enum includes voluntary_withdrawal', () => {
      const { reasonForChange } = reasonForChangeSchema.properties.enrollmentChangeDetails.properties;
      expect(reasonForChange.enum).to.include('voluntary_withdrawal');
    });
  });

  describe('mitigatingCircumstancesUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(mitigatingCircumstancesUiSchema).to.be.an('object');
    });

    it('mitigatingCircumstancesNarrative has ui:required function', () => {
      const field =
        mitigatingCircumstancesUiSchema.enrollmentChangeDetails
          .mitigatingCircumstances.mitigatingCircumstancesNarrative;
      expect(field['ui:required']).to.be.a('function');
    });

    it('mitigatingCircumstancesNarrative required when known=yes', () => {
      const requiredFn =
        mitigatingCircumstancesUiSchema.enrollmentChangeDetails
          .mitigatingCircumstances.mitigatingCircumstancesNarrative[
          'ui:required'
        ];
      expect(
        requiredFn({
          enrollmentChangeDetails: {
            mitigatingCircumstances: {
              mitigatingCircumstancesKnown: 'yes',
            },
          },
        }),
      ).to.be.true;
    });

    it('mitigatingCircumstancesNarrative not required when known=no', () => {
      const requiredFn =
        mitigatingCircumstancesUiSchema.enrollmentChangeDetails
          .mitigatingCircumstances.mitigatingCircumstancesNarrative[
          'ui:required'
        ];
      expect(
        requiredFn({
          enrollmentChangeDetails: {
            mitigatingCircumstances: {
              mitigatingCircumstancesKnown: 'no',
            },
          },
        }),
      ).to.be.false;
    });
  });

  describe('correctionDetailsSchema', () => {
    it('requires correctionDetails', () => {
      const { required } = correctionDetailsSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('correctionDetails');
    });

    it('correctionItems is required inside correctionDetails', () => {
      const { required } = correctionDetailsSchema.properties.enrollmentChangeDetails.properties.correctionDetails;
      expect(required).to.include('correctionItems');
    });
  });

  describe('timelinessAcknowledgmentSchema', () => {
    it('requires lateSubmissionExplanation', () => {
      const { required } = timelinessAcknowledgmentSchema.properties.enrollmentChangeDetails;
      expect(required).to.include('lateSubmissionExplanation');
    });
  });
});