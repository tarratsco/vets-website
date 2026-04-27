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
  describe('cemeteryInfo page', () => {
    it('exports uiSchema and schema', () => {
      expect(cemeteryInfoUiSchema).to.be.an('object');
      expect(cemeteryInfoSchema).to.be.an('object');
    });

    it('schema requires burialLocation', () => {
      expect(cemeteryInfoSchema.required).to.include('burialLocation');
    });

    it('burialLocation schema requires cemetery fields', () => {
      const { required } = cemeteryInfoSchema.properties.burialLocation;
      expect(required).to.include('cemeteryName');
      expect(required).to.include('cemeteryAddress');
      expect(required).to.include('cemeteryContactName');
      expect(required).to.include('cemeteryContactPhone');
    });
  });

  describe('graveLocation page', () => {
    it('exports uiSchema and schema', () => {
      expect(graveLocationUiSchema).to.be.an('object');
      expect(graveLocationSchema).to.be.an('object');
    });

    it('schema has graveSection, graveLot, graveNumber properties', () => {
      const { properties } = graveLocationSchema.properties.burialLocation;
      expect(properties).to.have.property('graveSection');
      expect(properties).to.have.property('graveLot');
      expect(properties).to.have.property('graveNumber');
    });
  });

  describe('existingMarker page', () => {
    it('exports uiSchema and schema', () => {
      expect(existingMarkerUiSchema).to.be.an('object');
      expect(existingMarkerSchema).to.be.an('object');
    });

    it('schema requires existingMarkerPresent', () => {
      const { required } = existingMarkerSchema.properties.burialLocation;
      expect(required).to.include('existingMarkerPresent');
    });

    it('existingMarkerPresent enum has three values', () => {
      const enumVals =
        existingMarkerSchema.properties.burialLocation.properties
          .existingMarkerPresent.enum;
      expect(enumVals).to.include('noExistingMarker');
      expect(enumVals).to.include('privateMarkerExists');
      expect(enumVals).to.include('governmentMarkerAlreadyPlaced');
    });
  });
});