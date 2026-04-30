import { expect } from 'chai';
import { burialPlaceUiSchema, burialPlaceSchema } from './burialPlace';

describe('burialPlace page', () => {
  describe('uiSchema', () => {
    it('has veteranInformation group', () => {
      expect(burialPlaceUiSchema.veteranInformation).to.be.an('object');
    });

    it('has placeOfBurialCemeteryName field', () => {
      expect(
        burialPlaceUiSchema.veteranInformation.placeOfBurialCemeteryName,
      ).to.be.an('object');
    });

    it('has placeOfBurialCity field', () => {
      expect(
        burialPlaceUiSchema.veteranInformation.placeOfBurialCity,
      ).to.be.an('object');
    });

    it('has placeOfBurialState field', () => {
      expect(
        burialPlaceUiSchema.veteranInformation.placeOfBurialState,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('requires cemetery name, city, and state', () => {
      const required =
        burialPlaceSchema.properties.veteranInformation.required;
      expect(required).to.include('placeOfBurialCemeteryName');
      expect(required).to.include('placeOfBurialCity');
      expect(required).to.include('placeOfBurialState');
    });
  });
});