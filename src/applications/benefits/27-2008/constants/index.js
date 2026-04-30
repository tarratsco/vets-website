export const APPLICANT_TYPE_LABELS = {
  nextOfKin:
    'I am the next-of-kin (surviving spouse, child, parent, sibling, or other relative)',
  funeralDirector:
    'I am a funeral director or funeral home representative',
  vsoRepresentative:
    'I am a Veterans Service Organization (VSO) representative or other authorized representative',
  closeFriend:
    'I am a close friend of the Veteran with no living next-of-kin available',
};

export const BRANCH_OF_SERVICE_LABELS = {
  army: 'Army',
  navy: 'Navy',
  airForce: 'Air Force',
  spaceForce: 'Space Force',
  marineCorps: 'Marine Corps',
  coastGuard: 'Coast Guard',
  usphs: 'USPHS (U.S. Public Health Service)',
  noaa: 'NOAA (National Oceanic and Atmospheric Administration)',
  selectedReserve: 'Selected Reserve (see eligibility note)',
  other: 'Other (see eligibility note)',
};

export const BRANCH_KEYS = Object.keys(BRANCH_OF_SERVICE_LABELS);

export const FLAG_RECIPIENT_RELATIONSHIP_LABELS = {
  survivingSpouse: 'Surviving spouse',
  child: 'Child',
  parent: 'Parent (including adoptive, stepparent, or foster parent)',
  brotherOrSister: 'Brother or sister (including half-blood)',
  uncleOrAunt: 'Uncle or aunt',
  nephewOrNiece: 'Nephew or niece',
  cousinOrGrandparent: 'Cousin or grandparent',
  friend: 'Friend (no living next-of-kin available)',
  other: 'Other',
};

export const FLAG_RECIPIENT_RELATIONSHIP_KEYS = Object.keys(
  FLAG_RECIPIENT_RELATIONSHIP_LABELS,
);

export const APPLICANT_RELATIONSHIP_LABELS = {
  survivingSpouse: 'Surviving spouse',
  child: 'Child',
  parent: 'Parent (including adoptive, stepparent, or foster parent)',
  brotherOrSister: 'Brother or sister',
  uncleOrAunt: 'Uncle or aunt',
  nephewOrNiece: 'Nephew or niece',
  cousinOrGrandparent: 'Cousin or grandparent',
  funeralDirector: 'Funeral director or funeral home representative',
  vsoRepresentative:
    'Veterans Service Organization (VSO) representative',
  closeFriend: 'Close friend',
  otherAuthorizedRepresentative: 'Other authorized representative',
};

export const APPLICANT_RELATIONSHIP_KEYS = Object.keys(
  APPLICANT_RELATIONSHIP_LABELS,
);

export const DISCHARGE_CHARACTER_LABELS = {
  honorable:
    'Yes \u2014 the Veteran\'s discharge was under honorable or other-than-dishonorable conditions',
  dishonorable: 'No \u2014 the Veteran received a dishonorable discharge',
  unknown: "I don't know the discharge character",
};

export const RESERVE_GUARD_CRITERIA_LABELS = {
  retiredPayEligible:
    'The Veteran was entitled to retired pay for service in the reserves, or would have been entitled but for being under 60 years of age',
  servedFullEnlistment:
    'The Veteran served at least one full enlistment (or, as an officer, completed the period of initial obligation)',
  disabilityDischarge:
    'The Veteran was discharged for a disability incurred or aggravated in the line of duty',
  diedWhileMember:
    'The Veteran died while a member of the Selected Reserve',
};

export const RESERVE_GUARD_CRITERIA_KEYS = Object.keys(
  RESERVE_GUARD_CRITERIA_LABELS,
);

export const US_STATE_OPTIONS = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'GU', label: 'Guam' },
  { value: 'VI', label: 'U.S. Virgin Islands' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'UM', label: 'U.S. Minor Outlying Islands' },
  { value: 'OUTSIDE_US', label: 'Outside the United States' },
];

export const US_STATE_KEYS = US_STATE_OPTIONS.map(s => s.value);