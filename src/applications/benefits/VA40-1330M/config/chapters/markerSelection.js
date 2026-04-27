import {
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  textUI,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Marker type labels ───────────────────────────────────────────────────────

const MARKER_TYPE_LABELS = {
  uprightMarble: 'Upright marble headstone',
  uprightGranite: 'Upright granite headstone',
  flatGranite: 'Flat granite grave marker',
  flatMarble: 'Flat marble grave marker',
  flatBronze: 'Flat bronze grave marker',
};

const MARKER_TYPE_DESCRIPTIONS = {
  uprightMarble:
    'Traditional upright white marble headstone (approximately 42 inches tall)',
  uprightGranite:
    'Upright granite headstone, available in gray or black granite',
  flatGranite: 'Flat granite marker, flush or slightly raised from the ground',
  flatMarble: 'Flat white marble marker, flush or slightly raised',
  flatBronze:
    'Flat bronze marker, mounted on a granite base (base not included)',
};

// ─── Emblem of belief labels ─────────────────────────────────────────────────
// NOTE: This list is a placeholder. The full NCA-approved list must be
// confirmed with NCA before launch. See design question D3.

const EMBLEM_LABELS = {
  '': 'No emblem of belief',
  latinCross: 'Latin Cross',
  starOfDavid: 'Star of David',
  crescentAndStar: 'Crescent and Star',
  buddhistWheel: 'Buddhist Wheel',
  hinduOm: 'Hindu Om (Aum)',
  atheistSymbol: 'Atheist Symbol (American Atheists)',
};

// ─── Inscription validation ──────────────────────────────────────────────────

export function validateInscriptionCharacters(errors, fieldData) {
  if (!fieldData) return;
  const allowedPattern = /^[A-Za-z0-9 \-.,'"]*$/;
  if (!allowedPattern.test(fieldData)) {
    errors.addError(
      'Your inscription contains characters that are not allowed. Please use only letters, numbers, spaces, hyphens, periods, apostrophes, and commas.',
    );
  }
}

export function validateInscriptionLength(errors, fieldData) {
  if (!fieldData) return;
  if (fieldData.length > 60) {
    errors.addError(
      'Your inscription exceeds the maximum allowed length of 60 characters.',
    );
  }
}

// ─── Marker Type Page ─────────────────────────────────────────────────────────

export const markerTypeUiSchema = {
  markerRequest: {
    markerType: radioUI({
      title: 'What type of headstone or marker are you requesting?',
      hint:
        'The government provides several types of headstones and markers at no charge. All types include standard inscription. Availability may vary.',
      labels: MARKER_TYPE_LABELS,
      descriptions: MARKER_TYPE_DESCRIPTIONS,
      errorMessages: {
        required: 'Please select a headstone or marker type.',
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
        markerType: radioSchema(Object.keys(MARKER_TYPE_LABELS)),
      },
    },
  },
};

// ─── Emblem of Belief Page ────────────────────────────────────────────────────

export const emblemOfBeliefUiSchema = {
  markerRequest: {
    emblemOfBelief: selectUI({
      title: 'Emblem of belief (optional)',
      hint:
        'You may request one NCA-approved emblem of belief to be inscribed on the headstone or marker. Only NCA-approved emblems are available. Select "No emblem of belief" if you do not want one.',
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
        emblemOfBelief: selectSchema(Object.keys(EMBLEM_LABELS)),
      },
    },
  },
};

// ─── Inscription Page ─────────────────────────────────────────────────────────

export const inscriptionUiSchema = {
  markerRequest: {
    personalInscription: {
      ...textareaUI({
        title: 'Personal inscription (optional)',
        hint:
          'You may add a brief personal message. Maximum 60 characters. Only letters, numbers, spaces, hyphens, periods, apostrophes, and commas are permitted. NCA will review your inscription for compliance with VA inscription standards.',
        charcount: true,
      }),
      'ui:validations': [
        validateInscriptionCharacters,
        validateInscriptionLength,
      ],
    },
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

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const markerSelectionPages = {
  markerType: {
    path: 'marker-selection/marker-type',
    title: 'Marker type',
    uiSchema: markerTypeUiSchema,
    schema: markerTypeSchema,
  },
  emblemOfBelief: {
    path: 'marker-selection/emblem-of-belief',
    title: 'Emblem of belief',
    uiSchema: emblemOfBeliefUiSchema,
    schema: emblemOfBeliefSchema,
  },
  inscription: {
    path: 'marker-selection/inscription',
    title: 'Inscription information',
    uiSchema: inscriptionUiSchema,
    schema: inscriptionSchema,
  },
};