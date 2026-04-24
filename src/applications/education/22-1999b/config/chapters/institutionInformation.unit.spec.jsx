import { expect } from 'chai';

import {
  institutionInformationUiSchema,
  institutionInformationSchema,
} from '../chapters/institutionInformation';

describe('institutionInformation page', () => {
  describe('uiSchema', () => {
    it('has facilityCode field', () => {
      expect(institutionInformationUiSchema.facilityCode).to.exist;
    });

    it('facilityCode has a ui:title', () => {
      expect(institutionInformationUiSchema.facilityCode['ui:title']).to.equal(
        'VA Facility Code',
      );
    });

    it('has institutionName field', () => {
      expect(institutionInformationUiSchema.institutionName).to.exist;
    });

    it('institutionName has a ui:title', () => {
      expect(
        institutionInformationUiSchema.institutionName['ui:title'],
      ).to.equal('Institution name');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(institutionInformationSchema.type).to.equal('object');
    });

    it('requires facilityCode', () => {
      expect(institutionInformationSchema.required).to.include('facilityCode');
    });

    it('requires institutionName', () => {
      expect(institutionInformationSchema.required).to.include(
        'institutionName',
      );
    });

    it('facilityCode has 8-digit pattern', () => {
      expect(
        institutionInformationSchema.properties.facilityCode.pattern,
      ).to.equal('^\\d{8}$');
    });
  });
});