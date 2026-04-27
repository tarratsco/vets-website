import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  phoneUI,
  phoneSchema,
  addressUI,
  addressSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const cemeteryInfoUiSchema = {
  burialLocation: {
    'ui:title': 'Cemetery information',
    cemeteryName: textUI({
      title: 'Cemetery name',
      hint: 'Enter the full name of the private cemetery where the service member is buried',
      errorMessages: {
        required: 'Please enter the cemetery name.',
      },
    }),
    cemeteryAddress: addressUI({
      omit: ['isMilitary'],
      customConfig: {
        'ui:title': 'Cemetery mailing address',
        street: textUI({
          title: 'Cemetery street address',
          hint: 'Enter the cemetery\'s mailing address for delivery of the headstone or marker',
        }),
      },
    }),
    cemeteryContactName: textUI({
      title: "Cemetery contact person's name",
      hint:
        'Provide the name of the person at the cemetery who should receive delivery of the headstone or marker.',
      errorMessages: {
        required: 'Please enter the cemetery contact person\'s name.',
      },
    }),
    cemeteryContactPhone: phoneUI('Cemetery contact phone number'),
  },
};

export const cemeteryInfoSchema = {
  type: 'object',
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

export const graveLocationUiSchema = {
  burialLocation: {
    'ui:title': 'Grave location within the cemetery',
    graveSection: textUI({
      title: 'Section',
      hint: 'Enter the section of the cemetery where the grave is located, if known',
    }),
    graveLot: textUI({
      title: 'Lot',
      hint: 'Enter the lot number, if known',
    }),
    graveNumber: textUI({
      title: 'Grave number',
      hint: 'Enter the grave or plot number, if known',
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
        required: 'Please indicate whether there is an existing marker at this grave.',
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