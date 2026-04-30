import { expect } from 'chai';
import {
  APPLICANT_TYPE_LABELS,
  BRANCH_OF_SERVICE_LABELS,
  BRANCH_KEYS,
  FLAG_RECIPIENT_RELATIONSHIP_LABELS,
  FLAG_RECIPIENT_RELATIONSHIP_KEYS,
  APPLICANT_RELATIONSHIP_LABELS,
  APPLICANT_RELATIONSHIP_KEYS,
  DISCHARGE_CHARACTER_LABELS,
  RESERVE_GUARD_CRITERIA_LABELS,
  RESERVE_GUARD_CRITERIA_KEYS,
  US_STATE_OPTIONS,
  US_STATE_KEYS,
} from './index';

describe('constants/index', () => {
  it('APPLICANT_TYPE_LABELS has 4 entries', () => {
    expect(Object.keys(APPLICANT_TYPE_LABELS)).to.have.lengthOf(4);
  });

  it('BRANCH_OF_SERVICE_LABELS has 10 entries', () => {
    expect(Object.keys(BRANCH_OF_SERVICE_LABELS)).to.have.lengthOf(10);
  });

  it('BRANCH_KEYS matches keys of BRANCH_OF_SERVICE_LABELS', () => {
    expect(BRANCH_KEYS).to.deep.equal(
      Object.keys(BRANCH_OF_SERVICE_LABELS),
    );
  });

  it('FLAG_RECIPIENT_RELATIONSHIP_KEYS matches labels keys', () => {
    expect(FLAG_RECIPIENT_RELATIONSHIP_KEYS).to.deep.equal(
      Object.keys(FLAG_RECIPIENT_RELATIONSHIP_LABELS),
    );
  });

  it('APPLICANT_RELATIONSHIP_KEYS matches labels keys', () => {
    expect(APPLICANT_RELATIONSHIP_KEYS).to.deep.equal(
      Object.keys(APPLICANT_RELATIONSHIP_LABELS),
    );
  });

  it('DISCHARGE_CHARACTER_LABELS includes honorable, dishonorable, unknown', () => {
    expect(DISCHARGE_CHARACTER_LABELS).to.have.key('honorable');
    expect(DISCHARGE_CHARACTER_LABELS).to.have.key('dishonorable');
    expect(DISCHARGE_CHARACTER_LABELS).to.have.key('unknown');
  });

  it('RESERVE_GUARD_CRITERIA_KEYS matches labels keys', () => {
    expect(RESERVE_GUARD_CRITERIA_KEYS).to.deep.equal(
      Object.keys(RESERVE_GUARD_CRITERIA_LABELS),
    );
  });

  it('US_STATE_OPTIONS includes OUTSIDE_US', () => {
    const outsideUs = US_STATE_OPTIONS.find(
      s => s.value === 'OUTSIDE_US',
    );
    expect(outsideUs).to.exist;
  });

  it('US_STATE_KEYS includes standard state abbreviations', () => {
    expect(US_STATE_KEYS).to.include('VA');
    expect(US_STATE_KEYS).to.include('CA');
    expect(US_STATE_KEYS).to.include('TX');
  });

  it('US_STATE_OPTIONS has value and label for each entry', () => {
    US_STATE_OPTIONS.forEach(state => {
      expect(state.value).to.be.a('string').and.not.be.empty;
      expect(state.label).to.be.a('string').and.not.be.empty;
    });
  });
});