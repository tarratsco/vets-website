import { expect } from 'chai';
import {
  cemeteryInfoUiSchema,
  cemeteryInfoSchema,
  graveLocationUiSchema,
  graveLocationSchema,
  existingMarkerUiSchema,
  existingMarkerSchema,
  burialInformationPages,
} from './burialInformation';

describe('burialInformation chapter', () => {
  describe('cemeteryInfoUiSchema', () => {
    it('has burialLocation top-level key', () => {
      expect(cemeteryInfoUiSchema).to.have.property('burialLocation');
    });

    it('has cemeteryName field', () => {
      expect(cemeteryInfoUiSchema.burialLocation).to.have.property(
        'cemeteryName',
      );
    });

    it('has cemeteryContactPhone field', () => {
      expect(cemeteryInfoUiSchema.burialLocation).to.have.property(
        'cemeteryContactPhone',
      );
    });
  });

  describe('cemeteryInfoSchema', () => {
    it('requires burialLocation', () => {
      expect(cemeteryInfoSchema.required).to.include('burialLocation');
    });

    it('burialLocation requires cemeteryName, address, contact fields', () => {
      const required = cemeteryInfoSchema.properties.burialLocation.required;
      expect(required).to.include('cemeteryName');
      expect(required).to.include('cemeteryAddress');
      expect(required).to.include('cemeteryContactName');
      expect(required).to.include('cemeteryContactPhone');
    });
  });

  describe('graveLocationUiSchema', () => {
    it('has graveSection, graveLot, graveNumber fields', () => {
      expect(graveLocationUiSchema.burialLocation).to.have.property(
        'graveSection',
      );
      expect(graveLocationUiSchema.burialLocation).to.have.property('graveLot');
      expect(graveLocationUiSchema.burialLocation).to.have.property(
        'graveNumber',
      );
    });
  });

  describe('graveLocationSchema', () => {
    it('grave fields are optional (not in required array)', () => {
      const props = graveLocationSchema.properties.burialLocation.properties;
      expect(props).to.have.property('graveSection');
      expect(props).to.have.property('graveLot');
      expect(props).to.have.property('graveNumber');
      // These should not be required
      const required = graveLocationSchema.properties.burialLocation.required;
      expect(required).to.be.undefined;
    });
  });

  describe('existingMarkerUiSchema', () => {
    it('has existingMarkerPresent radio field', () => {
      expect(existingMarkerUiSchema.burialLocation).to.have.property(
        'existingMarkerPresent',
      );
    });
  });

  describe('existingMarkerSchema', () => {
    it('requires existingMarkerPresent', () => {
      const required =
        existingMarkerSchema.properties.burialLocation.required;
      expect(required).to.include('existingMarkerPresent');
    });

    it('has three enum values', () => {
      const prop =
        existingMarkerSchema.properties.burialLocation.properties
          .existingMarkerPresent;
      expect(prop.enum).to.include('noExistingMarker');
      expect(prop.enum).to.include('privateMarkerExists');
      expect(prop.enum).to.include('governmentMarkerAlreadyPlaced');
    });
  });

  describe('burialInformationPages', () => {
    it('has three pages', () => {
      expect(burialInformationPages).to.have.property('cemeteryInfo');
      expect(burialInformationPages).to.have.property('graveLocation');
      expect(burialInformationPages).to.have.property('existingMarker');
    });

    it('pages have correct paths', () => {
      expect(burialInformationPages.cemeteryInfo.path).to.equal(
        'burial-information/cemetery-info',
      );
      expect(burialInformationPages.graveLocation.path).to.equal(
        'burial-information/grave-location',
      );
      expect(burialInformationPages.existingMarker.path).to.equal(
        'burial-information/existing-marker',
      );
    });
  });
});