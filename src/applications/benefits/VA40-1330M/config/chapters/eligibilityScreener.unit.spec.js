import { expect } from 'chai';
import {
  serviceStatusAtDeathUiSchema,
  serviceStatusAtDeathSchema,
  guardReserveQualifierUiSchema,
  guardReserveQualifierSchema,
} from './eligibilityScreener';

describe('eligibilityScreener chapter', () => {
  describe('serviceStatusAtDeathSchema', () => {
    it('has required serviceStatusAtDeath', () => {
      expect(serviceStatusAtDeathSchema.required).to.include('serviceStatusAtDeath');
    });

    it('serviceStatusAtDeath enum has activeDuty and guardOrReserve', () => {
      const { enum: enumVals } = serviceStatusAtDeathSchema.properties.serviceStatusAtDeath;
      expect(enumVals).to.include('activeDuty');
      expect(enumVals).to.include('guardOrReserve');
    });
  });

  describe('serviceStatusAtDeathUiSchema', () => {
    it('has a title', () => {
      expect(serviceStatusAtDeathUiSchema.serviceStatusAtDeath['ui:title']).to.be.a('string');
    });

    it('has errorMessages', () => {
      expect(
        serviceStatusAtDeathUiSchema.serviceStatusAtDeath['ui:errorMessages'],
      ).to.be.an('object');
    });
  });

  describe('guardReserveQualifierSchema', () => {
    it('has required guardReserveQualifyingCircumstance', () => {
      expect(guardReserveQualifierSchema.required).to.include(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('enum includes all three qualifying circumstances', () => {
      const { enum: enumVals } = guardReserveQualifierSchema.properties.guardReserveQualifyingCircumstance;
      expect(enumVals).to.include('diedOnActiveDutyForTraining');
      expect(enumVals).to.include('diedOnInactiveDutyForTraining');
      expect(enumVals).to.include('entitledToRetiredPay');
    });
  });

  describe('guardReserveQualifierUiSchema', () => {
    it('has a title', () => {
      expect(
        guardReserveQualifierUiSchema.guardReserveQualifyingCircumstance['ui:title'],
      ).to.be.a('string');
    });
  });
});