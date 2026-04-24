import {
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

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

export const REASON_FOR_CHANGE_KEYS = Object.keys(REASON_FOR_CHANGE_LABELS);

export const MITIGATING_REASON_CODES = [
  'voluntary_withdrawal',
  'medical',
  'personal_family_emergency',
  'non_punitive_grade',
];

export const reasonForChangeUiSchema = {
  reasonForChange: selectUI({
    title: 'Primary reason for this enrollment change',
    hint:
      'Select the reason that best describes why this enrollment change occurred. If more than one reason applies, select the primary reason. Your answer may determine whether VA needs additional information to protect the student from an overpayment debt.',
    labels: REASON_FOR_CHANGE_LABELS,
    errorMessages: {
      required:
        'Please select the primary reason for this enrollment change.',
    },
  }),
};

export const reasonForChangeSchema = {
  type: 'object',
  required: ['reasonForChange'],
  properties: {
    reasonForChange: selectSchema(REASON_FOR_CHANGE_KEYS),
  },
};