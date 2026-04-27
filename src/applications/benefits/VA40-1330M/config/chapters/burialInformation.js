import {
  textUI,
  radioUI,
  radioSchema,
  phoneUI,
  phoneSchema,
  addressUI,
  addressSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ── Cemetery Info ────────────────────────────────────────────────────────────

export const cemeteryInfoUiSchema = {
  burialLocation: {
    cemeteryName: textUI({
      title: 'Cemetery name',
      hint:
        'Enter the full name of the private cemetery where the service member is buried.',
      errorMessages: {
        required: 'Please enter the cemetery name.',
      },
    }),
    cemeteryAddress: addressUI({
      omit: ['isMilitary'],
      hint: 'Enter the cemetery\'s mailing address for delivery of the headstone or marker.',
    }),
    cemeteryContactName: textUI({
      title: "Cemetery contact person's name",
      hint:
        'The headstone or marker will be delivered to this cemetery. Provide the name of the person who should receive delivery.',
      errorMessages: {
        required: 'Please enter the cemetery contact name.',
      },
    }),
    cemeteryContactPhone: phoneUI({
      title: 'Cemetery contact phone number',
      hint: '10-digit phone number.',
      errorMessages: {
        required: 'Please enter the cemetery contact phone number.',
      },
    }),
  },
};

export const cemeteryInfoSchema = {
  type: 'object',
  required: ['burialLocation'],
  properties: {
    burialLocation: {
      type: 'object',
      required: [
        'cemeteryName',
        'cemeteryAddress',
        'cemeteryContactName',
        'cemeteryContactPhone',
      ],
      properties: {
        cemeteryName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        cemeteryAddress: addressSchema(),
        cemeteryContactName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        cemeteryContactPhone: phoneSchema,
      },
    },
  },
};

// ── Grave Location ───────────────────────────────────────────────────────────

export const graveLocationUiSchema = {
  burialLocation: {
    graveSection: textUI({
      title: 'Section',
      hint: 'Enter the section of the cemetery where the grave is located, if known.',
    }),
    graveLot: textUI({
      title: 'Lot',
      hint: 'Enter the lot number, if known.',
    }),
    graveNumber: textUI({
      title: 'Grave number',
      hint: 'Enter the grave or plot number, if known.',
    }),
  },
};

export const graveLocationSchema = {
  type: 'object',
  properties: {
    burialLocation: {
      type: 'object',
      properties: {
        graveSection: {
          type: 'string',
          maxLength: 20,
        },
        graveLot: {
          type: 'string',
          maxLength: 20,
        },
        graveNumber: {
          type: 'string',
          maxLength: 20,
        },
      },
    },
  },
};

// ── Existing Marker ──────────────────────────────────────────────────────────

export const existingMarkerUiSchema = {
  burialLocation: {
    existingMarkerPresent: radioUI({
      title: 'Is there already a headstone, marker, or grave monument at this grave?',
      labels: {
        noExistingMarker: 'No — the grave currently has no permanent marker',
        privateMarkerExists:
          'Yes — there is a privately purchased headstone or marker',
        governmentMarkerAlreadyPlaced:
          'Yes — a government-furnished headstone or marker has already been placed',
      },
      errorMessages: {
        required: 'Please indicate whether an existing marker is present.',
      },
    }),
  },
};

export const existingMarkerSchema = {
  type: 'object',
  required: ['burialLocation'],
  properties: {
    burialLocation: {
      type: 'object',
      required: ['existingMarkerPresent'],
      properties: {
        existingMarkerPresent: radioSchema([
          'noExistingMarker',
          'privateMarkerExists',
          'governmentMarkerAlreadyPlaced',
        ]),
      },
    },
  },
};