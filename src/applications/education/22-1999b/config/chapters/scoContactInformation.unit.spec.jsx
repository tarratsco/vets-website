import { expect } from 'chai';

import {
  scoContactInformationUiSchema,
  scoContactInformationSchema,
} from '../chapters/scoContactInformation';

describe('scoContactInformation page', () => {
  describe('uiSchema', () => {
    it('has scoFirstName field', () => {
      expect(scoContactInformationUiSchema.scoFirstName).to.exist;
    });

    it('scoFirstName has correct title', () => {
      expect(scoContactInformationUiSchema.scoFirstName['ui:title']).to.equal(
        'Your first name',
      );
    });

    it('has scoPhone field', () => {
      expect(scoContactInformationUiSchema.scoPhone).to.exist;
    });

    it('has scoEmail field', () => {
      expect(scoContactInformationUiSchema.scoEmail).to.exist;
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(scoContactInformationSchema.type).to.equal('object');
    });

    it('requires scoFirstName', () => {
      expect(scoContactInformationSchema.required).to.include('scoFirstName');
    });

    it('requires scoLastName', () => {
      expect(scoContactInformationSchema.required).to.include('scoLastName');
    });

    it('requires scoPhone', () => {
      expect(scoContactInformationSchema.required).to.include('scoPhone');
    });

    it('requires scoEmail', () => {
      expect(scoContactInformationSchema.required).to.include('scoEmail');
    });

    it('scoPhone has 10-digit pattern', () => {
      expect(
        scoContactInformationSchema.properties.scoPhone.pattern,
      ).to.equal('^\\d{10}$');
    });
  });
});