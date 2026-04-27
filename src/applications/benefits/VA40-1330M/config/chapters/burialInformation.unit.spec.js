import { expect } from 'chai';
import {
  cemeteryInfoUiSchema,
  cemeteryInfoSchema,
  graveLocationUiSchema,
  graveLocationSchema,
  existingMarkerUiSchema,
  existingMarkerSchema,
} from './burialInformation';

describe('burialInformation chapter', () => {
  describe('cemeteryInfoSchema', () => {
    it('requires burialLocation', () => {
      expect(cemeteryInfoSchema.required).to.include('burialLocation');
    });

    it('burialLocation requires cemeteryName, cemeteryAddress, cemeteryContactName, cemeteryContactPhone', () => {
      const { required } = cemeteryInfoSchema.properties.burialLocation;
      expect(required).to.include('cemeteryName');
      expect(required).to.include('cemeteryAddress');
      expect(required).to.include('cemeteryContactName');
      expect(required).to.include('cemeteryContactPhone');
    });

    it('cemeteryName has maxLength 100', () => {
      const { maxLength } = cemeteryInfoSchema.properties.burialLocation.properties.cemeteryName;
      expect(maxLength).to.equal(100);
    });
  });

  describe('cemeteryInfoUiSchema', () => {
    it('has cemeteryName ui schema', () => {
      expect(cemeteryInfoUiSchema.burialLocation.cemeteryName).to.be.an('object');
    });

    it('has cemeteryContactPhone ui schema', () => {
      expect(cemeteryInfoUiSchema.burialLocation.cemeteryContactPhone).to.be.an('object');
    });
  });

  describe('graveLocationSchema', () => {
    it('has graveSection, graveLot, graveNumber properties', () => {
      const { properties } = graveLocationSchema.properties.burialLocation;
      expect(properties).to.have.keys(['graveSection', 'graveLot', 'graveNumber']);
    });

    it('graveSection has maxLength 20', () => {
      expect(
        graveLocationSchema.properties.burialLocation.properties.graveSection.maxLength,
      ).to.equal(20);
    });
  });

  describe('existingMarkerSchema', () => {
    it('burialLocation requires existingMarkerPresent', () => {
      expect(
        existingMarkerSchema.properties.burialLocation.required,
      ).to.include('existingMarkerPresent');
    });

    it('existingMarkerPresent enum has three values', () => {
      const { enum: enumVals } = existingMarkerSchema.properties.burialLocation.properties.existingMarkerPresent;
      expect(enumVals).to.have.lengthOf(3);
      expect(enumVals).to.include('noExistingMarker');
      expect(enumVals).to.include('privateMarkerExists');
      expect(enumVals).to.include('governmentMarkerAlreadyPlaced');
    });
  });
});