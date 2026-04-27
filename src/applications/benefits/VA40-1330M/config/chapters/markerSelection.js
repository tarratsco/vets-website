import {
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const MARKER_TYPE_LABELS = {
  uprightMarble: 'Upright marble headstone',
  uprightGranite: 'Upright granite headstone',
  flatGranite: 'Flat granite grave marker',
  flatMarble: 'Flat marble grave marker',
  flatBronze: 'Flat bronze grave marker',
};

const MARKER_TYPE_KEYS = Object.keys(MARKER_TYPE_LABELS);

const EMBLEM_LABELS = {
  none: 'No emblem of belief',
  latinCross: 'Latin Cross (Christian)',
  starOfDavid: 'Star of David (Jewish)',
  crescentAndStar: 'Crescent and Star (Muslim)',
  buddhistWheel: 'Buddhist Wheel of Righteousness',
  hinduOm: 'Hindu Om',
  medicine_wheel: 'Medicine Wheel (Native American)',
  atheist: 'Atomic Whirl (Atheist)',
  other: 'Other approved emblem (contact NCA)',
};

const EMBLEM_KEYS = Object.keys(EMBLEM_LABELS);

export const markerTypeUiSchema = {
  markerRequest: {
    markerType: radioUI({
      title: 'What type of headstone or marker are you requesting?',
      hint:
        'The government provides several types of headstones and markers at no charge. All types include standard inscription. Availability may vary.',
      labels: MARKER_TYPE_LABELS,
      errorMessages: {
        required: 'Please select a marker type.',
      },
    }),
  },
};

export const markerTypeSchema = {
  type: 'object',
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

export const inscriptionUiSchema = {
  markerRequest: {
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