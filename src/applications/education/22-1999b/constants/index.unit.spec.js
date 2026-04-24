import { expect } from 'chai';
import {
  FORM_TITLE,
  FORM_SUBTITLE,
  BENEFIT_CHAPTER_LABELS,
  BENEFIT_CHAPTER_KEYS,
  ENROLLMENT_TYPE_LABELS,
  ENROLLMENT_TYPE_KEYS,
  TYPE_OF_CHANGE_LABELS,
  TYPE_OF_CHANGE_KEYS,
  REASON_FOR_CHANGE_LABELS,
  REASON_FOR_CHANGE_KEYS,
  MITIGATING_REASON_CODES,
  CORRECTION_ITEM_LABELS,
  CORRECTION_ITEM_KEYS,
} from './index';

describe('constants', () => {
  it('FORM_TITLE is a non-empty string', () => {
    expect(FORM_TITLE).to.be.a('string').and.not.be.empty;
  });

  it('FORM_SUBTITLE is a non-empty string', () => {
    expect(FORM_SUBTITLE).to.be.a('string').and.not.be.empty;
  });

  it('BENEFIT_CHAPTER_LABELS contains chapter_33', () => {
    expect(BENEFIT_CHAPTER_LABELS).to.have.property('chapter_33');
  });

  it('BENEFIT_CHAPTER_KEYS contains all expected chapters', () => {
    expect(BENEFIT_CHAPTER_KEYS).to.include('chapter_33');
    expect(BENEFIT_CHAPTER_KEYS).to.include('chapter_30');
    expect(BENEFIT_CHAPTER_KEYS).to.include('chapter_35');
    expect(BENEFIT_CHAPTER_KEYS).to.include('chapter_1606');
  });

  it('ENROLLMENT_TYPE_KEYS has 4 values', () => {
    expect(ENROLLMENT_TYPE_KEYS).to.have.lengthOf(4);
  });

  it('TYPE_OF_CHANGE_KEYS contains all 4 change types', () => {
    expect(TYPE_OF_CHANGE_KEYS).to.include('full_termination');
    expect(TYPE_OF_CHANGE_KEYS).to.include('partial_withdrawal');
    expect(TYPE_OF_CHANGE_KEYS).to.include('credit_hour_reduction');
    expect(TYPE_OF_CHANGE_KEYS).to.include('correction');
  });

  it('REASON_FOR_CHANGE_KEYS has 11 values', () => {
    expect(REASON_FOR_CHANGE_KEYS).to.have.lengthOf(11);
  });

  it('MITIGATING_REASON_CODES contains voluntary_withdrawal and medical', () => {
    expect(MITIGATING_REASON_CODES).to.include('voluntary_withdrawal');
    expect(MITIGATING_REASON_CODES).to.include('medical');
    expect(MITIGATING_REASON_CODES).to.include('personal_family_emergency');
    expect(MITIGATING_REASON_CODES).to.include('non_punitive_grade');
  });

  it('CORRECTION_ITEM_KEYS contains expected correction items', () => {
    expect(CORRECTION_ITEM_KEYS).to.include('credit_hours');
    expect(CORRECTION_ITEM_KEYS).to.include('enrollment_dates');
    expect(CORRECTION_ITEM_KEYS).to.include('other');
  });

  it('BENEFIT_CHAPTER_KEYS matches BENEFIT_CHAPTER_LABELS keys', () => {
    expect(BENEFIT_CHAPTER_KEYS).to.deep.equal(
      Object.keys(BENEFIT_CHAPTER_LABELS),
    );
  });

  it('ENROLLMENT_TYPE_KEYS matches ENROLLMENT_TYPE_LABELS keys', () => {
    expect(ENROLLMENT_TYPE_KEYS).to.deep.equal(
      Object.keys(ENROLLMENT_TYPE_LABELS),
    );
  });
});