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
    it('exports a uiSchema object', () => {
      expect(markerTypeUiSchema).to.be.an('object');
    });

    it('has markerType on markerRequest', () => {
      expect(markerTypeUiSchema.markerRequest.markerType).to.exist;
    });
  });

  describe('markerTypeSchema', () => {
    it('exports a schema object', () => {
      expect(markerTypeSchema).to.be.an('object');
    });

    it('requires markerType on markerRequest', () => {
      const required = markerTypeSchema.properties.markerRequest.required;
      expect(required).to.include('markerType');
    });

    it('has correct enum values for markerType', () => {
      const prop =
        markerTypeSchema.properties.markerRequest.properties.markerType;
      expect(prop.enum).to.include('uprightMarble');
      expect(prop.enum).to.include('uprightGranite');
      expect(prop.enum).to.include('flatGranite');
      expect(prop.enum).to.include('flatMarble');
      expect(prop.enum).to.include('flatBronze');
    });
  });

  describe('emblemOfBeliefUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(emblemOfBeliefUiSchema).to.be.an('object');
    });

    it('has emblemOfBelief on markerRequest', () => {
      expect(emblemOfBeliefUiSchema.markerRequest.emblemOfBelief).to.exist;
    });
  });

  describe('emblemOfBeliefSchema', () => {
    it('exports a schema object', () => {
      expect(emblemOfBeliefSchema).to.be.an('object');
    });

    it('has emblemOfBelief property', () => {
      const prop =
        emblemOfBeliefSchema.properties.markerRequest.properties
          .emblemOfBelief;
      expect(prop).to.exist;
    });
  });

  describe('inscriptionUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(inscriptionUiSchema).to.be.an('object');
    });

    it('has personalInscription on markerRequest', () => {
      expect(
        inscriptionUiSchema.markerRequest.personalInscription,
      ).to.exist;
    });
  });

  describe('inscriptionSchema', () => {
    it('exports a schema object', () => {
      expect(inscriptionSchema).to.be.an('object');
    });

    it('personalInscription has maxLength of 60', () => {
      const prop =
        inscriptionSchema.properties.markerRequest.properties
          .personalInscription;
      expect(prop.maxLength).to.equal(60);
    });
  });
});