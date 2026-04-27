import { expect } from 'chai';
import {
  whoIsApplyingUiSchema,
  whoIsApplyingSchema,
  applicantPersonalInfoUiSchema,
  applicantPersonalInfoSchema,
  relationshipToDecedentUiSchema,
  relationshipToDecedentSchema,
  authorizationUiSchema,
  authorizationSchema,
} from './applicantInformation';

describe('applicantInformation chapter', () => {
  describe('whoIsApplyingSchema', () => {
    it('has required submitterRole', () => {
      expect(whoIsApplyingSchema.required).to.include('submitterRole');
    });

    it('submitterRole enum includes all four roles', () => {
      const { enum: enumVals } = whoIsApplyingSchema.properties.submitterRole;
      expect(enumVals).to.include('nextOfKin');
      expect(enumVals).to.include('funeralHomeDirector');
      expect(enumVals).to.include('cemeteryOfficial');
      expect(enumVals).to.include('personalRepresentative');
    });
  });

  describe('whoIsApplyingUiSchema', () => {
    it('has a title on submitterRole', () => {
      expect(whoIsApplyingUiSchema.submitterRole['ui:title']).to.be.a('string');
    });
  });

  describe('applicantPersonalInfoSchema', () => {
    it('has applicant as required', () => {
      expect(applicantPersonalInfoSchema.required).to.include('applicant');
    });

    it('applicant has required name, daytimePhone, email, address', () => {
      const { required } = applicantPersonalInfoSchema.properties.applicant;
      expect(required).to.include('name');
      expect(required).to.include('daytimePhone');
      expect(required).to.include('email');
      expect(required).to.include('address');
    });
  });

  describe('applicantPersonalInfoUiSchema', () => {
    it('has applicant.daytimePhone ui schema', () => {
      expect(applicantPersonalInfoUiSchema.applicant.daytimePhone).to.be.an('object');
    });

    it('has applicant.email ui schema', () => {
      expect(applicantPersonalInfoUiSchema.applicant.email).to.be.an('object');
    });
  });

  describe('relationshipToDecedentSchema', () => {
    it('has applicant object', () => {
      expect(relationshipToDecedentSchema.properties.applicant).to.be.an('object');
    });

    it('relationshipToDecedent enum includes all relationships', () => {
      const { enum: enumVals } = relationshipToDecedentSchema.properties.applicant.properties.relationshipToDecedent;
      expect(enumVals).to.include('spouse');
      expect(enumVals).to.include('otherFamilyMember');
    });
  });

  describe('authorizationSchema', () => {
    it('applicant requires authorizationDocument', () => {
      expect(
        authorizationSchema.properties.applicant.required,
      ).to.include('authorizationDocument');
    });
  });

  describe('authorizationUiSchema', () => {
    it('has required:true on authorizationDocument', () => {
      const fileInput = authorizationUiSchema.applicant.authorizationDocument;
      expect(fileInput['ui:options'].required).to.equal(true);
    });
  });
});