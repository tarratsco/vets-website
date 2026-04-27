import { expect } from 'chai';

import {
  serviceStatusUiSchema,
  serviceStatusSchema,
  guardReserveQualifierUiSchema,
  guardReserveQualifierSchema,
} from './eligibilityScreener';

describe('eligibilityScreener chapter', () => {
  describe('serviceStatus page', () => {
    it('exports uiSchema and schema', () => {
      expect(serviceStatusUiSchema).to.be.an('object');
      expect(serviceStatusSchema).to.be.an('object');
    });

    it('uiSchema has serviceStatusAtDeath field', () => {
      expect(serviceStatusUiSchema).to.have.property('serviceStatusAtDeath');
    });

    it('schema requires serviceStatusAtDeath', () => {
      expect(serviceStatusSchema.required).to.include('serviceStatusAtDeath');
    });

    it('schema enum includes activeDuty and guardOrReserve', () => {
      const enumVals =
        serviceStatusSchema.properties.serviceStatusAtDeath.enum;
      expect(enumVals).to.include('activeDuty');
      expect(enumVals).to.include('guardOrReserve');
    });
  });

  describe('guardReserveQualifier page', () => {
    it('exports uiSchema and schema', () => {
      expect(guardReserveQualifierUiSchema).to.be.an('object');
      expect(guardReserveQualifierSchema).to.be.an('object');
    });

    it('uiSchema has guardReserveQualifyingCircumstance field', () => {
      expect(guardReserveQualifierUiSchema).to.have.property(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('schema requires guardReserveQualifyingCircumstance', () => {
      expect(guardReserveQualifierSchema.required).to.include(
        'guardReserveQualifyingCircumstance',
      );
    });

    it('schema enum includes three qualifying circumstances', () => {
      const enumVals =
        guardReserveQualifierSchema.properties.guardReserveQualifyingCircumstance.enum;
      expect(enumVals).to.include('diedOnActiveDutyForTraining');
      expect(enumVals).to.include('diedOnInactiveDutyForTraining');
      expect(enumVals).to.include('entitledToRetiredPay');
    });
  });
});