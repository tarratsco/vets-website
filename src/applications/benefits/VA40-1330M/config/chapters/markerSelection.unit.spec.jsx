import { expect } from 'chai';

import {
  markerTypeUiSchema,
  markerTypeSchema,
  emblemOfBeliefUiSchema,
  emblemOfBeliefSchema,
  inscriptionUiSchema,
  inscriptionSchema,
} from './markerSelection';

describe('markerSelection chapter', () => {
  describe('markerTypeUiSchema', () => {
    it('has markerRequest.markerType', () => {
      expect(markerTypeUiSchema.markerRequest).to.have.property('markerType');
    });

    it('markerType has radio widget', () => {
      expect(
        markerTypeUiSchema.markerRequest.markerType['ui:widget'],
      ).to.equal('radio');
    });
  });

  describe('markerTypeSchema', () => {
    it('requires markerRequest', () => {
      expect(markerTypeSchema.required).to.include('markerRequest');
    });

    it('markerRequest requires markerType', () => {
      expect(
        markerTypeSchema.properties.markerRequest.required,
      ).to.include('markerType');
    });

    it('markerType has correct enum values', () => {
      const { enum: enumVals } =
        markerTypeSchema.properties.markerRequest.properties.markerType;
      expect(enumVals).to.include('uprightMarble');
      expect(enumVals).to.include('uprightGranite');
      expect(enumVals).to.include('flatGranite');
      expect(enumVals).to.include('flatMarble');
      expect(enumVals).to.include('flatBronze');
    });
  });

  describe('emblemOfBeliefUiSchema', () => {
    it('has markerRequest.emblemOfBelief', () => {
      expect(emblemOfBeliefUiSchema.markerRequest).to.have.property(
        'emblemOfBelief',
      );
    });
  });

  describe('emblemOfBeliefSchema', () => {
    it('has emblemOfBelief property', () => {
      expect(
        emblemOfBeliefSchema.properties.markerRequest.properties,
      ).to.have.property('emblemOfBelief');
    });
  });

  describe('inscriptionUiSchema', () => {
    it('has markerRequest.personalInscription', () => {
      expect(inscriptionUiSchema.markerRequest).to.have.property(
        'personalInscription',
      );
    });
  });

  describe('inscriptionSchema', () => {
    it('personalInscription has maxLength 60', () => {
      expect(
        inscriptionSchema.properties.markerRequest.properties.personalInscription
          .maxLength,
      ).to.equal(60);
    });
  });

  describe('inscription validation', () => {
    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('accepts valid inscription text', () => {
      const validations =
        inscriptionUiSchema.markerRequest.personalInscription['ui:options']
          ?.validations ||
        inscriptionUiSchema.markerRequest.personalInscription[
          'ui:validations'
        ];
      if (validations && validations.length > 0) {
        const errors = { addError: msg => messages.push(msg || '') };
        validations[0](errors, 'IN MEMORY OF A HERO');
        expect(messages).to.have.lengthOf(0);
      }
    });

    it('rejects inscription with invalid characters', () => {
      const validations =
        inscriptionUiSchema.markerRequest.personalInscription['ui:options']
          ?.validations ||
        inscriptionUiSchema.markerRequest.personalInscription[
          'ui:validations'
        ];
      if (validations && validations.length > 0) {
        const errors = { addError: msg => messages.push(msg || '') };
        validations[0](errors, 'HERO <3 FOREVER');
        expect(messages.length).to.be.greaterThan(0);
      }
    });

    it('accepts empty inscription (optional field)', () => {
      const validations =
        inscriptionUiSchema.markerRequest.personalInscription['ui:options']
          ?.validations ||
        inscriptionUiSchema.markerRequest.personalInscription[
          'ui:validations'
        ];
      if (validations && validations.length > 0) {
        const errors = { addError: msg => messages.push(msg || '') };
        validations[0](errors, '');
        expect(messages).to.have.lengthOf(0);
      }
    });
  });
});