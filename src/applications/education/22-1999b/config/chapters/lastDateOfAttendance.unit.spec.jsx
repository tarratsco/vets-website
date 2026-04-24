import { expect } from 'chai';

import {
  lastDateOfAttendanceUiSchema,
  lastDateOfAttendanceSchema,
} from '../chapters/lastDateOfAttendance';

describe('lastDateOfAttendance page', () => {
  describe('uiSchema', () => {
    it('has lastDateOfAttendance field', () => {
      expect(lastDateOfAttendanceUiSchema.lastDateOfAttendance).to.exist;
    });

    it('has correct title', () => {
      expect(
        lastDateOfAttendanceUiSchema.lastDateOfAttendance['ui:title'],
      ).to.equal('Last date of attendance');
    });

    it('has validations for current or past date', () => {
      expect(
        lastDateOfAttendanceUiSchema.lastDateOfAttendance['ui:validations'],
      ).to.be.an('array');
      expect(
        lastDateOfAttendanceUiSchema.lastDateOfAttendance['ui:validations'],
      ).to.have.length.greaterThan(0);
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(lastDateOfAttendanceSchema.type).to.equal('object');
    });

    it('requires lastDateOfAttendance', () => {
      expect(lastDateOfAttendanceSchema.required).to.include(
        'lastDateOfAttendance',
      );
    });
  });
});