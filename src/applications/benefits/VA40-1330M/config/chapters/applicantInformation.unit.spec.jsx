import { expect } from 'chai';
import {
  whoIsApplyingUiSchema,
  whoIsApplyingSchema,
  applicantPersonalInfoUiSchema,
  applicantPersonalInfoSchema,
  authorizationUiSchema,
  authorizationSchema,
} from './applicantInformation';

describe('applicantInformation chapter', () => {
  describe('whoIsApplyingUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(whoIsApplyingUiSchema).to.be.an('object');
    });

    it('has submitterRole field', () => {
      expect(whoIsApplyingUiSchema.submitterRole).to.exist;
    });
  });

  describe('whoIsApplyingSchema', () => {
    it('exports a schema object', () => {
      expect(whoIsApplyingSchema).to.be.an('object');
    });

    it('requires submitterRole', () => {
      expect(whoIsApplyingSchema.required).to.include('submitterRole');
    });

    it('has correct submitterRole enum values', () => {
      const prop = whoIsApplyingSchema.properties.submitterRole;
      expect(prop.enum).to.include('nextOfKin');
      expect(prop.enum).to.include('funeralHomeDirector');
      expect(prop.enum).to.include('cemeteryOfficial');
      expect(prop.enum).to.include('personalRepresentative');
    });
  });

  describe('applicantPersonalInfoUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(applicantPersonalInfoUiSchema).to.be.an('object');
    });

    it('has applicant object', () => {
      expect(applicantPersonalInfoUiSchema.applicant).to.be.an('object');
    });

    it('has name, daytimePhone, email, address fields on applicant', () => {
      expect(applicantPersonalInfoUiSchema.applicant.name).to.exist;
      expect(applicantPersonalInfoUiSchema.applicant.daytimePhone).to.exist;
      expect(applicantPersonalInfoUiSchema.applicant.email).to.exist;
      expect(applicantPersonalInfoUiSchema.applicant.address).to.exist;
    });
  });

  describe('applicantPersonalInfoSchema', () => {
    it('exports a schema object', () => {
      expect(applicantPersonalInfoSchema).to.be.an('object');
    });

    it('has applicant property with required fields', () => {
      const applicant =
        applicantPersonalInfoSchema.properties.applicant;
      expect(applicant.required).to.include('name');
      expect(applicant.required).to.include('daytimePhone');
      expect(applicant.required).to.include('email');
      expect(applicant.required).to.include('address');
    });
  });

  describe('authorizationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(authorizationUiSchema).to.be.an('object');
    });

    it('has authorizationDocument field on applicant', () => {
      expect(
        authorizationUiSchema.applicant.authorizationDocument,
      ).to.exist;
    });
  });

  describe('authorizationSchema', () => {
    it('exports a schema object', () => {
      expect(authorizationSchema).to.be.an('object');
    });

    it('has authorizationDocument in applicant properties', () => {
      const applicantProps =
        authorizationSchema.properties.applicant.properties;
      expect(applicantProps.authorizationDocument).to.exist;
    });
  });
});