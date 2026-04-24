export const TITLE = 'Report an enrollment change or termination';
export const SUBTITLE = 'VA Form 22-1999b';

export const CHANGE_TYPE_LABELS = {
  full_termination: 'Full termination of enrollment (student is no longer enrolled)',
  partial_withdrawal:
    'Withdrawal from one or more courses (partial — student remains enrolled in other courses)',
  credit_hour_reduction:
    'Reduction in credit hours (student is still enrolled)',
  correction: 'Correction to a previously submitted certification',
};

export const BENEFIT_CHAPTER_LABELS = {
  chapter_33: 'Chapter 33 — Post-9/11 GI Bill',
  chapter_30: 'Chapter 30 — Montgomery GI Bill — Active Duty (MGIB-AD)',
  chapter_35: 'Chapter 35 — Survivors\' and Dependents\' Educational Assistance',
  chapter_1606: 'Chapter 1606 — Montgomery GI Bill — Selected Reserve',
  chapter_1607: 'Chapter 1607 — Reserve Educational Assistance Program (REAP)',
};

export const ENROLLMENT_TYPE_LABELS = {
  full_time: 'Full-time',
  three_quarter_time: 'Three-quarter time',
  half_time: 'Half-time',
  less_than_half_time: 'Less than half-time',
};

export const REASON_FOR_CHANGE_LABELS = {
  voluntary_withdrawal: 'Voluntary withdrawal by student',
  academic_dismissal: 'Academic dismissal or suspension',
  disciplinary_dismissal: 'Disciplinary dismissal or suspension',
  military_deployment: 'Military deployment or service obligation',
  medical: 'Medical condition or illness',
  personal_family_emergency: 'Personal or family emergency',
  program_change: 'Change of program or major',
  transfer: 'Transfer to another institution',
  non_punitive_grade: 'Non-punitive grade reported (W, I, or equivalent)',
  reduction_no_reason: 'Reduction in course load (no specific reason reported)',
  other: 'Other reason not listed',
};

export const CORRECTION_ITEM_LABELS = {
  credit_hours: 'Credit hours (originally certified hours are incorrect)',
  enrollment_dates: 'Enrollment period dates (begin or end date is incorrect)',
  enrollment_type:
    'Enrollment type (full-time/part-time status was reported incorrectly)',
  tuition_fees: 'Tuition and fees amount (if applicable)',
  student_identity: 'Student name or identification number',
  benefit_chapter: 'Benefit chapter or program',
  other: 'Other (describe below)',
};

export const MITIGATING_REASON_CODES = [
  'voluntary_withdrawal',
  'medical',
  'personal_family_emergency',
  'non_punitive_grade',
];

export const LATE_SUBMISSION_THRESHOLD_DAYS = 30;