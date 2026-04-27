import { expect } from 'chai';
import {
  eligibilityScreenerUiSchema,
  eligibilityScreenerSchema,
  guardReserveQualifierUiSchema,
  guardReserveQualifierSchema,
} from './eligibilityScreener';

describe('eligibilityScreener chapter', () => {
  describe('eligibilityScreenerUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(eligibilityScreenerUiSchema).to.be.an('object');
    });

    it('has serviceStatusAtDeath field', () => {
      expect(eligibilityScreenerUiSchema.serviceStatusAtDeath).to.exist;
    });
  });

  describe('eligibilityScreenerSchema', () => {
    it('exports a schema object', () => {
      expect(eligibilityScreenerSchema).to.be.an('object');
    });

    it('has type object', () => {
      expect(eligibilityScreenerSchema.type).to.equal('object');
    });

    it('requires serviceStatusAtDeath', () => {
      expect(eligibilityScreenerSchema.required).to.include('serviceStatusAtDeath');
    });

    it('has serviceStatusAtDeath property with correct enum values', () => {
      const prop =
        eligibilityScreenerSchema.properties.serviceStatusAtDeath;
      expect(prop).to.exist;
      expect(prop.enum).to.include('activeDuty');
      expect(prop.enum).to.include('guardOrReserve');
    });
  });

  describe('guardReserveQualifierUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(guardReserveQualifierUiSchema).to.be.an('object');
    });

    it('has guardReserveQualifyingCircumstance field', () => {
      expect(
        guardReserveQualifierUiSchema.guardReserveQualifyingCircumstance,
      ).to.exist;
    });
  });

  describe('guardReserveQualifierSchema', () => {
    it('exports a schema object', () => {
      expect(guardReserveQualifierSchema).to.be.an('object');
    });

    it('requires guardReserveQualifyingCircumstance', () => {
      expect(guardReserveQualifierSchema.required).to.include(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('has correct enum values', () => {
      const prop =
        guardReserveQualifierSchema.properties
          .guardReserveQualifyingCircumstance;
      expect(prop.enum).to.include('diedOnActiveDutyForTraining');
      expect(prop.enum).to.include('diedOnInactiveDutyForTraining');
      expect(prop.enum).to.include('entitledToRetiredPay');
    });
  });
});