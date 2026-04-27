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
  describe('markerTypeSchema', () => {
    it('requires markerRequest', () => {
      expect(markerTypeSchema.required).to.include('markerRequest');
    });

    it('markerRequest requires markerType', () => {
      expect(
        markerTypeSchema.properties.markerRequest.required,
      ).to.include('markerType');
    });

    it('markerType enum contains all five types', () => {
      const { enum: enumVals } = markerTypeSchema.properties.markerRequest.properties.markerType;
      expect(enumVals).to.include('uprightMarble');
      expect(enumVals).to.include('uprightGranite');
      expect(enumVals).to.include('flatGranite');
      expect(enumVals).to.include('flatMarble');
      expect(enumVals).to.include('flatBronze');
    });
  });

  describe('markerTypeUiSchema', () => {
    it('has markerType title', () => {
      expect(
        markerTypeUiSchema.markerRequest.markerType['ui:title'],
      ).to.be.a('string');
    });

    it('has descriptions object', () => {
      expect(
        markerTypeUiSchema.markerRequest.markerType['ui:options'].descriptions,
      ).to.be.an('object');
    });
  });

  describe('emblemOfBeliefSchema', () => {
    it('has markerRequest with emblemOfBelief', () => {
      expect(
        emblemOfBeliefSchema.properties.markerRequest.properties.emblemOfBelief,
      ).to.be.an('object');
    });

    it('emblemOfBelief enum includes empty string for no emblem', () => {
      const { enum: enumVals } = emblemOfBeliefSchema.properties.markerRequest.properties.emblemOfBelief;
      expect(enumVals).to.include('');
    });
  });

  describe('inscriptionSchema', () => {
    it('personalInscription has maxLength 60', () => {
      expect(
        inscriptionSchema.properties.markerRequest.properties.personalInscription.maxLength,
      ).to.equal(60);
    });
  });

  describe('inscriptionUiSchema', () => {
    it('has personalInscription field', () => {
      expect(
        inscriptionUiSchema.markerRequest.personalInscription,
      ).to.be.an('object');
    });

    it('has charcount option enabled', () => {
      expect(
        inscriptionUiSchema.markerRequest.personalInscription['ui:options'].charcount,
      ).to.equal(true);
    });
  });
});