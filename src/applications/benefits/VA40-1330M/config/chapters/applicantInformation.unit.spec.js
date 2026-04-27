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
  applicantInformationPages,
} from './applicantInformation';

describe('applicantInformation chapter', () => {
  describe('whoIsApplyingUiSchema', () => {
    it('has submitterRole radio field', () => {
      expect(whoIsApplyingUiSchema).to.have.property('submitterRole');
    });

    it('has a title', () => {
      expect(whoIsApplyingUiSchema.submitterRole['ui:title']).to.be.a('string');
    });
  });

  describe('whoIsApplyingSchema', () => {
    it('requires submitterRole', () => {
      expect(whoIsApplyingSchema.required).to.include('submitterRole');
    });

    it('has all four role enum values', () => {
      const prop = whoIsApplyingSchema.properties.submitterRole;
      expect(prop.enum).to.include('nextOfKin');
      expect(prop.enum).to.include('funeralHomeDirector');
      expect(prop.enum).to.include('cemeteryOfficial');
      expect(prop.enum).to.include('personalRepresentative');
    });
  });

  describe('applicantPersonalInfoUiSchema', () => {
    it('has applicant top-level key', () => {
      expect(applicantPersonalInfoUiSchema).to.have.property('applicant');
    });

    it('has name fields under applicant', () => {
      expect(applicantPersonalInfoUiSchema.applicant).to.have.property('name');
    });
  });

  describe('applicantPersonalInfoSchema', () => {
    it('requires applicant', () => {
      expect(applicantPersonalInfoSchema.required).to.include('applicant');
    });

    it('applicant requires name, phone, email, address', () => {
      const required = applicantPersonalInfoSchema.properties.applicant.required;
      expect(required).to.include('name');
      expect(required).to.include('daytimePhone');
      expect(required).to.include('email');
      expect(required).to.include('address');
    });
  });

  describe('authorizationUiSchema', () => {
    it('has authorizationDocument under applicant', () => {
      expect(authorizationUiSchema.applicant).to.have.property(
        'authorizationDocument',
      );
    });
  });

  describe('applicantInformationPages', () => {
    it('has all four pages', () => {
      expect(applicantInformationPages).to.have.property('whoIsApplying');
      expect(applicantInformationPages).to.have.property('applicantPersonalInfo');
      expect(applicantInformationPages).to.have.property('relationshipToDecedent');
      expect(applicantInformationPages).to.have.property('authorization');
    });

    it('authorization depends on non-nextOfKin role', () => {
      const { depends } = applicantInformationPages.authorization;
      expect(depends({ submitterRole: 'nextOfKin' })).to.equal(false);
      expect(depends({ submitterRole: 'funeralHomeDirector' })).to.equal(true);
      expect(depends({ submitterRole: 'cemeteryOfficial' })).to.equal(true);
      expect(depends({ submitterRole: 'personalRepresentative' })).to.equal(
        true,
      );
      expect(depends({})).to.not.equal(false);
    });
  });
});