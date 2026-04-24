import { expect } from 'chai';

import {
  TITLE,
  SUBTITLE,
  CHANGE_TYPE_KEYS,
  REASON_FOR_CHANGE_KEYS,
  BENEFIT_CHAPTER_KEYS,
  ENROLLMENT_TYPE_KEYS,
  CORRECTION_ITEM_KEYS,
  MITIGATING_REASON_CODES,
  LATE_SUBMISSION_THRESHOLD_DAYS,
} from './constants';

describe('constants', () => {
  it('TITLE is a non-empty string', () => {
    expect(TITLE).to.be.a('string').and.have.length.greaterThan(0);
  });

  it('SUBTITLE references the correct form number', () => {
    expect(SUBTITLE).to.include('22-1999b');
  });

  it('CHANGE_TYPE_KEYS has 4 options', () => {
    expect(CHANGE_TYPE_KEYS).to.have.lengthOf(4);
  });

  it('REASON_FOR_CHANGE_KEYS has 11 options', () => {
    expect(REASON_FOR_CHANGE_KEYS).to.have.lengthOf(11);
  });

  it('BENEFIT_CHAPTER_KEYS has 5 options', () => {
    expect(BENEFIT_CHAPTER_KEYS).to.have.lengthOf(5);
  });

  it('ENROLLMENT_TYPE_KEYS has 4 options', () => {
    expect(ENROLLMENT_TYPE_KEYS).to.have.lengthOf(4);
  });

  it('CORRECTION_ITEM_KEYS has 7 options', () => {
    expect(CORRECTION_ITEM_KEYS).to.have.lengthOf(7);
  });

  it('MITIGATING_REASON_CODES contains expected codes', () => {
    expect(MITIGATING_REASON_CODES).to.include('voluntary_withdrawal');
    expect(MITIGATING_REASON_CODES).to.include('medical');
    expect(MITIGATING_REASON_CODES).to.include('personal_family_emergency');
    expect(MITIGATING_REASON_CODES).to.include('non_punitive_grade');
  });

  it('LATE_SUBMISSION_THRESHOLD_DAYS is 30', () => {
    expect(LATE_SUBMISSION_THRESHOLD_DAYS).to.equal(30);
  });
});