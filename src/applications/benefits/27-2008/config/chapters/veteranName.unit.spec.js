import { expect } from 'chai';
import { veteranNameUiSchema, veteranNameSchema } from './veteranName';

describe('veteranName page', () => {
  describe('uiSchema', () => {
    it('has veteranInformation group', () => {
      expect(veteranNameUiSchema.veteranInformation).to.be.an('object');
    });

    it('has firstName field', () => {
      expect(veteranNameUiSchema.veteranInformation.firstName).to.be.an(
        'object',
      );
      expect(
        veteranNameUiSchema.veteranInformation.firstName['ui:title'],
      ).to.be.a('string');
    });

    it('has lastName field', () => {
      expect(veteranNameUiSchema.veteranInformation.lastName).to.be.an(
        'object',
      );
    });

    it('has maidenOrOtherName field', () => {
      expect(
        veteranNameUiSchema.veteranInformation.maidenOrOtherName,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('requires firstName and lastName', () => {
      const required =
        veteranNameSchema.properties.veteranInformation.required;
      expect(required).to.include('firstName');
      expect(required).to.include('lastName');
    });

    it('does not require middleName', () => {
      const required =
        veteranNameSchema.properties.veteranInformation.required;
      expect(required).to.not.include('middleName');
    });

    it('does not require maidenOrOtherName', () => {
      const required =
        veteranNameSchema.properties.veteranInformation.required;
      expect(required).to.not.include('maidenOrOtherName');
    });
  });
});