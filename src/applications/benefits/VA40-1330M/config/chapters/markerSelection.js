import {
  textUI,
  textareaUI,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ── Marker Type Selection ────────────────────────────────────────────────────

const MARKER_TYPE_LABELS = {
  uprightMarble: 'Upright marble headstone',
  uprightGranite: 'Upright granite headstone',
  flatGranite: 'Flat granite grave marker',
  flatMarble: 'Flat marble grave marker',
  flatBronze: 'Flat bronze grave marker',
};

const MARKER_TYPE_DESCRIPTIONS = {
  uprightMarble:
    'Traditional upright white marble, approximately 42 inches tall.',
  uprightGranite:
    'Traditional upright gray granite, approximately 42 inches tall.',
  flatGranite: 'Flat gray granite marker, set flush with the ground.',
  flatMarble: 'Flat white marble marker, set flush with the ground.',
  flatBronze: 'Flat bronze marker, set flush with the ground or on a base.',
};

const MARKER_TYPE_KEYS = Object.keys(MARKER_TYPE_LABELS);

export const markerTypeUiSchema = {
  markerRequest: {
    markerType: radioUI({
      title: 'What type of headstone or marker are you requesting?',
      hint:
        'The government provides several types of headstones and markers at no charge. All types include standard inscription. Availability may vary.',
      labels: MARKER_TYPE_LABELS,
      descriptions: MARKER_TYPE_DESCRIPTIONS,
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
        markerType: radioSchema(MARKER_TYPE_KEYS),
      },
    },
  },
};

// ── Emblem of Belief ─────────────────────────────────────────────────────────

// NOTE: This list is a placeholder. The authoritative NCA-approved emblem list
// must be obtained from NCA and used to populate this constant before launch.
const EMBLEM_LABELS = {
  '': 'No emblem of belief',
  latinCross: 'Latin Cross',
  starOfDavid: 'Star of David',
  crescentAndStar: 'Crescent and Star',
  buddhistWheel: 'Buddhist Wheel',
  nativeAmericanChurch: 'Native American Church',
  mormOn: 'Angel Moroni (Church of Jesus Christ of Latter-day Saints)',
  orthodox: 'Greek Cross (Eastern Orthodox)',
  atheist: 'Atomic Whirl (Atheist)',
};

const EMBLEM_KEYS = Object.keys(EMBLEM_LABELS);

export const emblemOfBeliefUiSchema = {
  markerRequest: {
    emblemOfBelief: selectUI({
      title: 'Emblem of belief (optional)',
      hint:
        'You may request one emblem of belief to be inscribed on the headstone or marker. Only NCA-approved emblems are available. If you do not want an emblem, select "No emblem of belief."',
      labels: EMBLEM_LABELS,
    }),
  },
};

export const emblemOfBeliefSchema = {
  type: 'object',
  properties: {
    markerRequest: {
      type: 'object',
      properties: {
        emblemOfBelief: selectSchema(EMBLEM_KEYS),
      },
    },
  },
};

// ── Inscription ──────────────────────────────────────────────────────────────

function validateInscriptionCharacters(errors, value) {
  if (!value) return;
  const pattern = /^[A-Za-z0-9 \-.,'"]*$/;
  if (!pattern.test(value)) {
    errors.addError(
      'Your inscription contains characters that are not allowed. Please use only letters, numbers, spaces, hyphens, periods, apostrophes, and commas.',
    );
  }
}

export const inscriptionUiSchema = {
  markerRequest: {
    personalInscription: textareaUI({
      title: 'Personal inscription (optional)',
      hint:
        'You may add a brief personal message. Maximum 60 characters. Only letters, numbers, spaces, hyphens, periods, apostrophes, and commas are permitted. NCA will review your inscription for compliance with VA inscription standards.',
      charcount: true,
      validations: [validateInscriptionCharacters],
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