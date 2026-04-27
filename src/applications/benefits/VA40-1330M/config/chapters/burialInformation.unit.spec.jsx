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
  describe('cemeteryInfoUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(cemeteryInfoUiSchema).to.be.an('object');
    });

    it('has burialLocation with cemeteryName, cemeteryAddress, cemeteryContactName, cemeteryContactPhone', () => {
      const loc = cemeteryInfoUiSchema.burialLocation;
      expect(loc.cemeteryName).to.exist;
      expect(loc.cemeteryAddress).to.exist;
      expect(loc.cemeteryContactName).to.exist;
      expect(loc.cemeteryContactPhone).to.exist;
    });
  });

  describe('cemeteryInfoSchema', () => {
    it('exports a schema object', () => {
      expect(cemeteryInfoSchema).to.be.an('object');
    });

    it('requires cemeteryName, cemeteryAddress, cemeteryContactName, cemeteryContactPhone', () => {
      const required = cemeteryInfoSchema.properties.burialLocation.required;
      expect(required).to.include('cemeteryName');
      expect(required).to.include('cemeteryAddress');
      expect(required).to.include('cemeteryContactName');
      expect(required).to.include('cemeteryContactPhone');
    });
  });

  describe('graveLocationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(graveLocationUiSchema).to.be.an('object');
    });

    it('has graveSection, graveLot, graveNumber on burialLocation', () => {
      const loc = graveLocationUiSchema.burialLocation;
      expect(loc.graveSection).to.exist;
      expect(loc.graveLot).to.exist;
      expect(loc.graveNumber).to.exist;
    });
  });

  describe('graveLocationSchema', () => {
    it('exports a schema object', () => {
      expect(graveLocationSchema).to.be.an('object');
    });

    it('has graveSection, graveLot, graveNumber properties', () => {
      const props = graveLocationSchema.properties.burialLocation.properties;
      expect(props.graveSection).to.exist;
      expect(props.graveLot).to.exist;
      expect(props.graveNumber).to.exist;
    });
  });

  describe('existingMarkerUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(existingMarkerUiSchema).to.be.an('object');
    });

    it('has existingMarkerPresent field on burialLocation', () => {
      expect(
        existingMarkerUiSchema.burialLocation.existingMarkerPresent,
      ).to.exist;
    });
  });

  describe('existingMarkerSchema', () => {
    it('exports a schema object', () => {
      expect(existingMarkerSchema).to.be.an('object');
    });

    it('requires existingMarkerPresent', () => {
      const required =
        existingMarkerSchema.properties.burialLocation.required;
      expect(required).to.include('existingMarkerPresent');
    });

    it('has correct enum values for existingMarkerPresent', () => {
      const prop =
        existingMarkerSchema.properties.burialLocation.properties
          .existingMarkerPresent;
      expect(prop.enum).to.include('noExistingMarker');
      expect(prop.enum).to.include('privateMarkerExists');
      expect(prop.enum).to.include('governmentMarkerAlreadyPlaced');
    });
  });
});