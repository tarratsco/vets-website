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
  describe('markerType page', () => {
    it('exports uiSchema and schema', () => {
      expect(markerTypeUiSchema).to.be.an('object');
      expect(markerTypeSchema).to.be.an('object');
    });

    it('schema requires markerRequest', () => {
      expect(markerTypeSchema.required).to.include('markerRequest');
    });

    it('markerRequest schema requires markerType', () => {
      const { required } = markerTypeSchema.properties.markerRequest;
      expect(required).to.include('markerType');
    });

    it('markerType enum has five valid types', () => {
      const enumVals =
        markerTypeSchema.properties.markerRequest.properties.markerType.enum;
      expect(enumVals).to.include('uprightMarble');
      expect(enumVals).to.include('uprightGranite');
      expect(enumVals).to.include('flatGranite');
      expect(enumVals).to.include('flatMarble');
      expect(enumVals).to.include('flatBronze');
      expect(enumVals).to.have.length(5);
    });
  });

  describe('emblemOfBelief page', () => {
    it('exports uiSchema and schema', () => {
      expect(emblemOfBeliefUiSchema).to.be.an('object');
      expect(emblemOfBeliefSchema).to.be.an('object');
    });

    it('emblemOfBelief schema property is string type', () => {
      const { emblemOfBelief } =
        emblemOfBeliefSchema.properties.markerRequest.properties;
      expect(emblemOfBelief.type).to.equal('string');
    });
  });

  describe('inscription page', () => {
    it('exports uiSchema and schema', () => {
      expect(inscriptionUiSchema).to.be.an('object');
      expect(inscriptionSchema).to.be.an('object');
    });

    it('personalInscription has maxLength of 60', () => {
      const { personalInscription } =
        inscriptionSchema.properties.markerRequest.properties;
      expect(personalInscription.maxLength).to.equal(60);
    });
  });
});