import { expect } from 'chai';
import { burialPlaceUiSchema, burialPlaceSchema } from './burialPlace';

describe('chapters/burialPlace', () => {
  it('exports uiSchema and schema', () => {
    expect(burialPlaceUiSchema).to.be.an('object');
    expect(burialPlaceSchema).to.be.an('object');
  });

  it('has placeOfBurialCemeteryName, placeOfBurialCity, placeOfBurialState in uiSchema', () => {
    const fields = burialPlaceUiSchema.veteranInformation;
    expect(fields.placeOfBurialCemeteryName).to.exist;
    expect(fields.placeOfBurialCity).to.exist;
    expect(fields.placeOfBurialState).to.exist;
  });

  it('schema requires all three burial place fields', () => {
    const required =
      burialPlaceSchema.properties.veteranInformation.required;
    expect(required).to.include('placeOfBurialCemeteryName');
    expect(required).to.include('placeOfBurialCity');
    expect(required).to.include('placeOfBurialState');
  });

  it('placeOfBurialState schema has OUTSIDE_US enum value', () => {
    const stateSchema =
      burialPlaceSchema.properties.veteranInformation.properties
        .placeOfBurialState;
    expect(stateSchema.enum).to.include('OUTSIDE_US');
  });
});