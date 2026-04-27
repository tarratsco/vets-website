import { expect } from 'chai';
import {
  markerTypeUiSchema,
  markerTypeSchema,
  emblemOfBeliefUiSchema,
  emblemOfBeliefSchema,
  inscriptionUiSchema,
  inscriptionSchema,
  markerSelectionPages,
  validateInscriptionCharacters,
  validateInscriptionLength,
} from './markerSelection';

describe('markerSelection chapter', () => {
  let messages;
  let errors;

  beforeEach(() => {
    messages = [];
    errors = { addError: msg => messages.push(msg || '') };
  });

  describe('validateInscriptionCharacters', () => {
    it('does not error on valid characters', () => {
      validateInscriptionCharacters(errors, 'In loving memory, 1945-2023');
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error on invalid characters like &', () => {
      validateInscriptionCharacters(errors, 'Love & peace');
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error on special characters like <', () => {
      validateInscriptionCharacters(errors, '<script>');
      expect(messages).to.have.lengthOf(1);
    });

    it('does not throw when value is null', () => {
      expect(() =>
        validateInscriptionCharacters(errors, null),
      ).to.not.throw();
      expect(messages).to.have.lengthOf(0);
    });
  });

  describe('validateInscriptionLength', () => {
    it('does not error on 60 characters', () => {
      validateInscriptionLength(errors, 'A'.repeat(60));
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error on 61 characters', () => {
      validateInscriptionLength(errors, 'A'.repeat(61));
      expect(messages).to.have.lengthOf(1);
    });

    it('does not throw when value is null', () => {
      expect(() => validateInscriptionLength(errors, null)).to.not.throw();
      expect(messages).to.have.lengthOf(0);
    });
  });

  describe('markerTypeUiSchema', () => {
    it('has markerRequest.markerType field', () => {
      expect(markerTypeUiSchema.markerRequest).to.have.property('markerType');
    });
  });

  describe('markerTypeSchema', () => {
    it('requires markerRequest.markerType', () => {
      expect(markerTypeSchema.properties.markerRequest.required).to.include(
        'markerType',
      );
    });

    it('has five marker type enum values', () => {
      const prop = markerTypeSchema.properties.markerRequest.properties.markerType;
      expect(prop.enum).to.include('uprightMarble');
      expect(prop.enum).to.include('uprightGranite');
      expect(prop.enum).to.include('flatGranite');
      expect(prop.enum).to.include('flatMarble');
      expect(prop.enum).to.include('flatBronze');
    });
  });

  describe('emblemOfBeliefUiSchema', () => {
    it('has emblemOfBelief field', () => {
      expect(emblemOfBeliefUiSchema.markerRequest).to.have.property(
        'emblemOfBelief',
      );
    });
  });

  describe('inscriptionSchema', () => {
    it('personalInscription has maxLength of 60', () => {
      const prop =
        inscriptionSchema.properties.markerRequest.properties
          .personalInscription;
      expect(prop.maxLength).to.equal(60);
    });
  });

  describe('markerSelectionPages', () => {
    it('has three pages', () => {
      expect(markerSelectionPages).to.have.property('markerType');
      expect(markerSelectionPages).to.have.property('emblemOfBelief');
      expect(markerSelectionPages).to.have.property('inscription');
    });

    it('pages have correct paths', () => {
      expect(markerSelectionPages.markerType.path).to.equal(
        'marker-selection/marker-type',
      );
      expect(markerSelectionPages.emblemOfBelief.path).to.equal(
        'marker-selection/emblem-of-belief',
      );
      expect(markerSelectionPages.inscription.path).to.equal(
        'marker-selection/inscription',
      );
    });
  });
});