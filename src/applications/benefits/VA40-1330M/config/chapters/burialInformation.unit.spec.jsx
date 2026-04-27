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
    it('has burialLocation object', () => {
      expect(cemeteryInfoUiSchema).to.have.property('burialLocation');
    });

    it('burialLocation has cemeteryName', () => {
      expect(cemeteryInfoUiSchema.burialLocation).to.have.property(
        'cemeteryName',
      );
    });

    it('burialLocation has cemeteryAddress', () => {
      expect(cemeteryInfoUiSchema.burialLocation).to.have.property(
        'cemeteryAddress',
      );
    });

    it('burialLocation has cemeteryContactName', () => {
      expect(cemeteryInfoUiSchema.burialLocation).to.have.property(
        'cemeteryContactName',
      );
    });

    it('burialLocation has cemeteryContactPhone', () => {
      expect(cemeteryInfoUiSchema.burialLocation).to.have.property(
        'cemeteryContactPhone',
      );
    });
  });

  describe('cemeteryInfoSchema', () => {
    it('requires burialLocation', () => {
      expect(cemeteryInfoSchema.required).to.include('burialLocation');
    });

    it('burialLocation requires cemeteryName', () => {
      expect(
        cemeteryInfoSchema.properties.burialLocation.required,
      ).to.include('cemeteryName');
    });

    it('burialLocation requires cemeteryContactPhone', () => {
      expect(
        cemeteryInfoSchema.properties.burialLocation.required,
      ).to.include('cemeteryContactPhone');
    });
  });

  describe('graveLocationUiSchema', () => {
    it('has burialLocation.graveSection', () => {
      expect(graveLocationUiSchema.burialLocation).to.have.property(
        'graveSection',
      );
    });

    it('has burialLocation.graveLot', () => {
      expect(graveLocationUiSchema.burialLocation).to.have.property(
        'graveLot',
      );
    });

    it('has burialLocation.graveNumber', () => {
      expect(graveLocationUiSchema.burialLocation).to.have.property(
        'graveNumber',
      );
    });
  });

  describe('graveLocationSchema', () => {
    it('graveSection has maxLength 20', () => {
      expect(
        graveLocationSchema.properties.burialLocation.properties.graveSection
          .maxLength,
      ).to.equal(20);
    });
  });

  describe('existingMarkerUiSchema', () => {
    it('has burialLocation.existingMarkerPresent', () => {
      expect(existingMarkerUiSchema.burialLocation).to.have.property(
        'existingMarkerPresent',
      );
    });

    it('existingMarkerPresent has radio widget', () => {
      expect(
        existingMarkerUiSchema.burialLocation.existingMarkerPresent[
          'ui:widget'
        ],
      ).to.equal('radio');
    });
  });

  describe('existingMarkerSchema', () => {
    it('existingMarkerPresent has correct enum values', () => {
      const { enum: enumVals } =
        existingMarkerSchema.properties.burialLocation.properties
          .existingMarkerPresent;
      expect(enumVals).to.include('noExistingMarker');
      expect(enumVals).to.include('privateMarkerExists');
      expect(enumVals).to.include('governmentMarkerAlreadyPlaced');
    });
  });
});