import { expect } from 'chai';

import {
  serviceStatusUiSchema,
  serviceStatusSchema,
  guardReserveQualifierUiSchema,
  guardReserveQualifierSchema,
} from './eligibilityScreener';

describe('eligibilityScreener chapter', () => {
  describe('serviceStatusUiSchema', () => {
    it('has serviceStatusAtDeath field', () => {
      expect(serviceStatusUiSchema).to.have.property('serviceStatusAtDeath');
    });

    it('has a ui:title', () => {
      expect(
        serviceStatusUiSchema.serviceStatusAtDeath['ui:title'],
      ).to.be.a('string');
    });

    it('has radio widget', () => {
      expect(
        serviceStatusUiSchema.serviceStatusAtDeath['ui:widget'],
      ).to.equal('radio');
    });
  });

  describe('serviceStatusSchema', () => {
    it('has required serviceStatusAtDeath', () => {
      expect(serviceStatusSchema.required).to.include('serviceStatusAtDeath');
    });

    it('serviceStatusAtDeath has correct enum values', () => {
      const { enum: enumVals } = serviceStatusSchema.properties
        .serviceStatusAtDeath;
      expect(enumVals).to.include('activeDuty');
      expect(enumVals).to.include('guardOrReserve');
    });
  });

  describe('guardReserveQualifierUiSchema', () => {
    it('has guardReserveQualifyingCircumstance field', () => {
      expect(guardReserveQualifierUiSchema).to.have.property(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('has a ui:title', () => {
      expect(
        guardReserveQualifierUiSchema.guardReserveQualifyingCircumstance[
          'ui:title'
        ],
      ).to.be.a('string');
    });
  });

  describe('guardReserveQualifierSchema', () => {
    it('has required guardReserveQualifyingCircumstance', () => {
      expect(guardReserveQualifierSchema.required).to.include(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('has correct enum values', () => {
      const { enum: enumVals } = guardReserveQualifierSchema.properties
        .guardReserveQualifyingCircumstance;
      expect(enumVals).to.include('diedOnActiveDutyForTraining');
      expect(enumVals).to.include('diedOnInactiveDutyForTraining');
      expect(enumVals).to.include('entitledToRetiredPay');
    });
  });
});