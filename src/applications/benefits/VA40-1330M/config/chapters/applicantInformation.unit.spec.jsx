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
    it('has submitterRole field', () => {
      expect(whoIsApplyingUiSchema).to.have.property('submitterRole');
    });

    it('submitterRole has a ui:title', () => {
      expect(whoIsApplyingUiSchema.submitterRole['ui:title']).to.be.a('string');
    });

    it('submitterRole has radio widget', () => {
      expect(whoIsApplyingUiSchema.submitterRole['ui:widget']).to.equal(
        'radio',
      );
    });
  });

  describe('whoIsApplyingSchema', () => {
    it('requires submitterRole', () => {
      expect(whoIsApplyingSchema.required).to.include('submitterRole');
    });

    it('submitterRole has correct enum values', () => {
      const { enum: enumVals } = whoIsApplyingSchema.properties.submitterRole;
      expect(enumVals).to.include('nextOfKin');
      expect(enumVals).to.include('funeralHomeDirector');
      expect(enumVals).to.include('cemeteryOfficial');
      expect(enumVals).to.include('personalRepresentative');
    });
  });

  describe('applicantPersonalInfoUiSchema', () => {
    it('has applicant object', () => {
      expect(applicantPersonalInfoUiSchema).to.have.property('applicant');
    });

    it('applicant has name fields', () => {
      expect(applicantPersonalInfoUiSchema.applicant).to.have.property('name');
    });

    it('applicant has daytimePhone field', () => {
      expect(applicantPersonalInfoUiSchema.applicant).to.have.property(
        'daytimePhone',
      );
    });

    it('applicant has email field', () => {
      expect(applicantPersonalInfoUiSchema.applicant).to.have.property(
        'email',
      );
    });

    it('applicant has address field', () => {
      expect(applicantPersonalInfoUiSchema.applicant).to.have.property(
        'address',
      );
    });
  });

  describe('applicantPersonalInfoSchema', () => {
    it('requires applicant', () => {
      expect(applicantPersonalInfoSchema.required).to.include('applicant');
    });

    it('applicant requires name', () => {
      expect(
        applicantPersonalInfoSchema.properties.applicant.required,
      ).to.include('name');
    });

    it('applicant requires daytimePhone', () => {
      expect(
        applicantPersonalInfoSchema.properties.applicant.required,
      ).to.include('daytimePhone');
    });
  });

  describe('authorizationUiSchema', () => {
    it('has applicant.authorizationDocument field', () => {
      expect(authorizationUiSchema.applicant).to.have.property(
        'authorizationDocument',
      );
    });
  });

  describe('authorizationSchema', () => {
    it('has applicant.authorizationDocument property', () => {
      expect(
        authorizationSchema.properties.applicant.properties,
      ).to.have.property('authorizationDocument');
    });
  });

  describe('depends functions', () => {
    it('authorization depends function evaluates correctly for non-NOK', () => {
      const depends = formData => formData.submitterRole !== 'nextOfKin';
      expect(() =>
        depends({ submitterRole: 'funeralHomeDirector' }),
      ).to.not.throw();
      expect(depends({ submitterRole: 'funeralHomeDirector' })).to.be.true;
      expect(depends({ submitterRole: 'nextOfKin' })).to.be.false;
    });

    it('authorization depends function handles empty object', () => {
      const depends = formData => formData.submitterRole !== 'nextOfKin';
      expect(() => depends({})).to.not.throw();
    });
  });
});