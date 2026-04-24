import { expect } from 'chai';

import {
  lastDateOfAttendanceUiSchema,
  lastDateOfAttendanceSchema,
} from './lastDateOfAttendance';

describe('lastDateOfAttendance page', () => {
  it('uiSchema has lastDateOfAttendance field', () => {
    expect(lastDateOfAttendanceUiSchema.lastDateOfAttendance).to.be.an(
      'object',
    );
  });

  it('uiSchema has correct title', () => {
    expect(
      lastDateOfAttendanceUiSchema.lastDateOfAttendance['ui:title'],
    ).to.equal('Last date of attendance');
  });

  it('uiSchema has validations for current or past date', () => {
    expect(
      lastDateOfAttendanceUiSchema.lastDateOfAttendance['ui:validations'],
    ).to.be.an('array');
  });

  it('schema requires lastDateOfAttendance', () => {
    expect(lastDateOfAttendanceSchema.required).to.include(
      'lastDateOfAttendance',
    );
  });
});