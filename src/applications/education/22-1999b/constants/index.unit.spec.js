import { expect } from 'chai';
import {
  TITLE,
  SUBTITLE,
  CHANGE_TYPE_LABELS,
  BENEFIT_CHAPTER_LABELS,
  ENROLLMENT_TYPE_LABELS,
  REASON_FOR_CHANGE_LABELS,
  CORRECTION_ITEM_LABELS,
  MITIGATING_REASON_CODES,
  LATE_SUBMISSION_THRESHOLD_DAYS,
} from './index';

describe('constants', () => {
  it('TITLE is a non-empty string', () => {
    expect(TITLE).to.be.a('string').and.not.empty;
  });

  it('SUBTITLE references the form number', () => {
    expect(SUBTITLE).to.include('22-1999b');
  });

  it('CHANGE_TYPE_LABELS has 4 entries', () => {
    expect(Object.keys(CHANGE_TYPE_LABELS)).to.have.lengthOf(4);
  });

  it('BENEFIT_CHAPTER_LABELS includes chapter_33', () => {
    expect(BENEFIT_CHAPTER_LABELS).to.have.property('chapter_33');
  });

  it('ENROLLMENT_TYPE_LABELS has 4 entries', () => {
    expect(Object.keys(ENROLLMENT_TYPE_LABELS)).to.have.lengthOf(4);
  });

  it('REASON_FOR_CHANGE_LABELS has 11 entries', () => {
    expect(Object.keys(REASON_FOR_CHANGE_LABELS)).to.have.lengthOf(11);
  });

  it('CORRECTION_ITEM_LABELS has 7 entries', () => {
    expect(Object.keys(CORRECTION_ITEM_LABELS)).to.have.lengthOf(7);
  });

  it('MITIGATING_REASON_CODES is a non-empty array', () => {
    expect(MITIGATING_REASON_CODES).to.be.an('array').and.not.empty;
    expect(MITIGATING_REASON_CODES).to.include('voluntary_withdrawal');
  });

  it('LATE_SUBMISSION_THRESHOLD_DAYS is 30', () => {
    expect(LATE_SUBMISSION_THRESHOLD_DAYS).to.equal(30);
  });
});