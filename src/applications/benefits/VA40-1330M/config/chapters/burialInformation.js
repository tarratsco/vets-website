import {
  textUI,
  textSchema,
  phoneUI,
  phoneSchema,
  radioUI,
  radioSchema,
  addressUI,
  addressSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Cemetery Info ────────────────────────────────────────────────────────────

export const cemeteryInfoUiSchema = {
  burialLocation: {
    'ui:title': 'Cemetery information',
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
      labels: {
        street: 'Cemetery street address',
        city: 'City',
        state: 'State',
        postalCode: 'ZIP code',
      },
    }),
    cemeteryContactName: textUI({
      title: 'Cemetery contact person\'s name',
      hint:
        'The headstone or marker will be delivered to this cemetery. Provide the name of the person who should receive delivery.',
      errorMessages: {
        required: 'Please enter the cemetery contact name.',
      },
    }),
    cemeteryContactPhone: phoneUI('Cemetery contact phone number'),
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

// ─── Grave Location ───────────────────────────────────────────────────────────

export const graveLocationUiSchema = {
  burialLocation: {
    'ui:title': 'Grave location within the cemetery',
    'ui:description':
      'Providing the section, lot, and grave number helps ensure accurate delivery and installation. Enter what you know; all fields are optional.',
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

// ─── Existing Marker ──────────────────────────────────────────────────────────

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
        required: 'Please indicate whether there is already a marker at this grave.',
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

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const burialInformationPages = {
  cemeteryInfo: {
    path: 'burial-information/cemetery-info',
    title: 'Cemetery information',
    uiSchema: cemeteryInfoUiSchema,
    schema: cemeteryInfoSchema,
  },
  graveLocation: {
    path: 'burial-information/grave-location',
    title: 'Grave location',
    uiSchema: graveLocationUiSchema,
    schema: graveLocationSchema,
  },
  existingMarker: {
    path: 'burial-information/existing-marker',
    title: 'Existing headstone or marker',
    uiSchema: existingMarkerUiSchema,
    schema: existingMarkerSchema,
  },
};