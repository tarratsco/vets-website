import { expect } from 'chai';
import {
  serviceStatusUiSchema,
  serviceStatusSchema,
  guardReserveQualifierUiSchema,
  guardReserveQualifierSchema,
  eligibilityScreenerPages,
} from './eligibilityScreener';

describe('eligibilityScreener chapter', () => {
  describe('serviceStatusUiSchema', () => {
    it('has serviceStatusAtDeath radio field', () => {
      expect(serviceStatusUiSchema).to.have.property('serviceStatusAtDeath');
      expect(serviceStatusUiSchema.serviceStatusAtDeath['ui:webComponentField']).to.exist;
    });

    it('has a title', () => {
      expect(serviceStatusUiSchema.serviceStatusAtDeath['ui:title']).to.be.a(
        'string',
      );
    });
  });

  describe('serviceStatusSchema', () => {
    it('requires serviceStatusAtDeath', () => {
      expect(serviceStatusSchema.required).to.include('serviceStatusAtDeath');
    });

    it('has activeDuty and guardOrReserve enum values', () => {
      const prop =
        serviceStatusSchema.properties.serviceStatusAtDeath;
      expect(prop.enum).to.include('activeDuty');
      expect(prop.enum).to.include('guardOrReserve');
    });
  });

  describe('guardReserveQualifierUiSchema', () => {
    it('has guardReserveQualifyingCircumstance field', () => {
      expect(guardReserveQualifierUiSchema).to.have.property(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('has a title', () => {
      expect(
        guardReserveQualifierUiSchema.guardReserveQualifyingCircumstance[
          'ui:title'
        ],
      ).to.be.a('string');
    });
  });

  describe('guardReserveQualifierSchema', () => {
    it('requires guardReserveQualifyingCircumstance', () => {
      expect(
        guardReserveQualifierSchema.required,
      ).to.include('guardReserveQualifyingCircumstance');
    });

    it('has the three qualifying circumstance enum values', () => {
      const prop =
        guardReserveQualifierSchema.properties
          .guardReserveQualifyingCircumstance;
      expect(prop.enum).to.include('diedOnActiveDutyForTraining');
      expect(prop.enum).to.include('diedOnInactiveDutyForTraining');
      expect(prop.enum).to.include('entitledToRetiredPay');
    });
  });

  describe('eligibilityScreenerPages', () => {
    it('has serviceStatus and guardReserveQualifier pages', () => {
      expect(eligibilityScreenerPages).to.have.property('serviceStatus');
      expect(eligibilityScreenerPages).to.have.property(
        'guardReserveQualifier',
      );
    });

    it('serviceStatus page has correct path', () => {
      expect(eligibilityScreenerPages.serviceStatus.path).to.equal(
        'eligibility-screener',
      );
    });

    it('guardReserveQualifier depends on guardOrReserve', () => {
      const { depends } = eligibilityScreenerPages.guardReserveQualifier;
      expect(depends({ serviceStatusAtDeath: 'guardOrReserve' })).to.equal(
        true,
      );
      expect(depends({ serviceStatusAtDeath: 'activeDuty' })).to.equal(false);
      expect(depends({})).to.equal(false);
    });
  });
});