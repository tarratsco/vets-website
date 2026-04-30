import { expect } from 'chai';
import { burialPlaceUiSchema, burialPlaceSchema } from './burialPlace';

describe('chapters/burialPlace', () => {
  it('should export uiSchema and schema', () => {
    expect(burialPlaceUiSchema).to.be.an('object');
    expect(burialPlaceSchema).to.be.an('object');
  });

  it('uiSchema should have cemetery name, city, and state fields', () => {
    const { veteranInformation } = burialPlaceUiSchema;
    expect(veteranInformation).to.have.property('placeOfBurialCemeteryName');
    expect(veteranInformation).to.have.property('placeOfBurialCity');
    expect(veteranInformation).to.have.property('placeOfBurialState');
  });

  it('schema should require all three burial place fields', () => {
    const { required } = burialPlaceSchema.properties.veteranInformation;
    expect(required).to.include('placeOfBurialCemeteryName');
    expect(required).to.include('placeOfBurialCity');
    expect(required).to.include('placeOfBurialState');
  });

  it('placeOfBurialState schema should include OUTSIDE_US', () => {
    const { placeOfBurialState } = burialPlaceSchema.properties.veteranInformation.properties;
    expect(placeOfBurialState).to.be.an('object');
    expect(placeOfBurialState.enum).to.include('OUTSIDE_US');
  });
});