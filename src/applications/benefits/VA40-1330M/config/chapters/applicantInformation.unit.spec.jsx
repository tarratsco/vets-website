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
  describe('whoIsApplying page', () => {
    it('exports uiSchema and schema', () => {
      expect(whoIsApplyingUiSchema).to.be.an('object');
      expect(whoIsApplyingSchema).to.be.an('object');
    });

    it('uiSchema has submitterRole field', () => {
      expect(whoIsApplyingUiSchema).to.have.property('submitterRole');
    });

    it('schema requires submitterRole', () => {
      expect(whoIsApplyingSchema.required).to.include('submitterRole');
    });

    it('schema enum has all four submitter roles', () => {
      const enumVals = whoIsApplyingSchema.properties.submitterRole.enum;
      expect(enumVals).to.include('nextOfKin');
      expect(enumVals).to.include('funeralHomeDirector');
      expect(enumVals).to.include('cemeteryOfficial');
      expect(enumVals).to.include('personalRepresentative');
    });
  });

  describe('applicantPersonalInfo page', () => {
    it('exports uiSchema and schema', () => {
      expect(applicantPersonalInfoUiSchema).to.be.an('object');
      expect(applicantPersonalInfoSchema).to.be.an('object');
    });

    it('schema requires applicant', () => {
      expect(applicantPersonalInfoSchema.required).to.include('applicant');
    });

    it('applicant schema requires name, daytimePhone, email, address', () => {
      const { required } = applicantPersonalInfoSchema.properties.applicant;
      expect(required).to.include('name');
      expect(required).to.include('daytimePhone');
      expect(required).to.include('email');
      expect(required).to.include('address');
    });
  });

  describe('authorization page', () => {
    it('exports uiSchema and schema', () => {
      expect(authorizationUiSchema).to.be.an('object');
      expect(authorizationSchema).to.be.an('object');
    });

    it('uiSchema has documents.authorizationDocument field', () => {
      expect(authorizationUiSchema.documents).to.have.property(
        'authorizationDocument',
      );
    });

    it('schema has documents with authorizationDocument property', () => {
      const { documents } = authorizationSchema.properties;
      expect(documents).to.have.property('properties');
      expect(documents.properties).to.have.property(
        'authorizationDocument',
      );
    });
  });
});