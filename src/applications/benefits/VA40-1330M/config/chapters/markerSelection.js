import {
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  textUI,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { EMBLEM_OPTIONS } from '../../constants';

// ── Chapter 4 Page 1 — Marker Type ────────────────────────────────────────────

export const markerTypeUiSchema = {
  markerRequest: {
    markerType: radioUI({
      title: 'What type of headstone or marker are you requesting?',
      hint:
        'The government provides several types of headstones and markers at no charge. All types include standard inscription. Availability may vary.',
      labels: {
        uprightMarble: 'Upright marble headstone',
        uprightGranite: 'Upright granite headstone',
        flatGranite: 'Flat granite grave marker',
        flatMarble: 'Flat marble grave marker',
        flatBronze: 'Flat bronze grave marker',
      },
      descriptions: {
        uprightMarble:
          'Traditional upright white marble, approximately 42 inches tall.',
        uprightGranite:
          'Traditional upright granite, approximately 42 inches tall.',
        flatGranite: 'Flat granite marker, placed flush with the ground.',
        flatMarble: 'Flat marble marker, placed flush with the ground.',
        flatBronze:
          'Flat bronze marker on a granite base, placed flush with the ground.',
      },
      errorMessages: {
        required: 'Please select a marker type.',
      },
    }),
  },
};

export const markerTypeSchema = {
  type: 'object',
  required: ['markerRequest'],
  properties: {
    markerRequest: {
      type: 'object',
      required: ['markerType'],
      properties: {
        markerType: radioSchema([
          'uprightMarble',
          'uprightGranite',
          'flatGranite',
          'flatMarble',
          'flatBronze',
        ]),
      },
    },
  },
};

// ── Chapter 4 Page 2 — Emblem of Belief ──────────────────────────────────────

export const emblemOfBeliefUiSchema = {
  markerRequest: {
    emblemOfBelief: selectUI({
      title: 'Emblem of belief (optional)',
      hint:
        'You may request one emblem of belief to be inscribed on the headstone or marker. Only NCA-approved emblems are available. If you do not want an emblem, select "No emblem."',
      labels: EMBLEM_OPTIONS,
    }),
  },
};

export const emblemOfBeliefSchema = {
  type: 'object',
  properties: {
    markerRequest: {
      type: 'object',
      properties: {
        emblemOfBelief: {
          type: 'string',
        },
      },
    },
  },
};

// ── Chapter 4 Page 3 — Inscription ───────────────────────────────────────────

export const inscriptionUiSchema = {
  markerRequest: {
    'ui:title': 'Inscription information',
    personalInscription: textareaUI({
      title: 'Personal inscription (optional)',
      hint:
        'You may add a brief personal message. Maximum 60 characters. Only letters, numbers, spaces, hyphens, periods, apostrophes, and commas are permitted. NCA will review your inscription for compliance with VA inscription standards.',
      charcount: true,
    }),
  },
};

export const inscriptionSchema = {
  type: 'object',
  properties: {
    markerRequest: {
      type: 'object',
      properties: {
        personalInscription: {
          type: 'string',
          maxLength: 60,
        },
      },
    },
  },
};