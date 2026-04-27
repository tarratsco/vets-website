import {
  textUI,
  textSchema,
  fullNameUI,
  fullNameSchema,
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Validation helpers ──────────────────────────────────────────────────────

export function validateDateOfDeathAfterBirth(errors, fieldData, formData) {
  const dob = formData?.decedent?.dateOfBirth;
  const dod = fieldData;
  if (!dob || !dod) return;
  if (new Date(dod) <= new Date(dob)) {
    errors.addError('Date of death must be after date of birth.');
  }
}

export function validateDateOfDeathNotFuture(errors, fieldData) {
  if (!fieldData) return;
  if (new Date(fieldData) > new Date()) {
    errors.addError('Date of death cannot be in the future.');
  }
}

export function validateServiceEntryBeforeDeath(errors, fieldData, formData) {
  const dod = formData?.decedent?.dateOfDeath;
  const entry = fieldData;
  if (!dod || !entry) return;
  if (new Date(entry) >= new Date(dod)) {
    errors.addError('Service entry date must be before the date of death.');
  }
}

// ─── Branch of Service labels ────────────────────────────────────────────────

const BRANCH_LABELS = {
  army: 'Army',
  navy: 'Navy',
  airForce: 'Air Force',
  marineCorps: 'Marine Corps',
  coastGuard: 'Coast Guard',
  spaceForce: 'Space Force',
  armyNationalGuard: 'Army National Guard',
  armyReserve: 'Army Reserve',
  navyReserve: 'Navy Reserve',
  airNationalGuard: 'Air National Guard',
  airForceReserve: 'Air Force Reserve',
  marineCorpsReserve: 'Marine Corps Reserve',
  coastGuardReserve: 'Coast Guard Reserve',
};

// ─── Decedent Personal Info ──────────────────────────────────────────────────

export const decedentPersonalInfoUiSchema = {
  decedent: {
    'ui:title': 'Personal information of the deceased service member',
    name: {
      ...fullNameUI(
        title =>
          `Deceased service member\'s ${title} (as it appears on service records)`,
      ),
    },
    ssn: ssnUI(),
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint:
        'Enter the date of birth as it appears on the service member\'s service records.',
      dataDogHidden: true,
    }),
    dateOfDeath: {
      ...currentOrPastDateUI({
        title: 'Date of death',
        hint:
          'Enter the date of death as it appears on the death certificate or DD Form 1300.',
        dataDogHidden: true,
      }),
      'ui:validations': [
        validateDateOfDeathAfterBirth,
        validateDateOfDeathNotFuture,
      ],
    },
  },
};

export const decedentPersonalInfoSchema = {
  type: 'object',
  required: ['decedent'],
  properties: {
    decedent: {
      type: 'object',
      required: ['name', 'ssn', 'dateOfBirth', 'dateOfDeath'],
      properties: {
        name: fullNameSchema,
        ssn: ssnSchema,
        dateOfBirth: currentOrPastDateSchema,
        dateOfDeath: currentOrPastDateSchema,
      },
    },
  },
};

// ─── Decedent Service Info ───────────────────────────────────────────────────

export const decedentServiceInfoUiSchema = {
  decedent: {
    service: {
      'ui:title': 'Military service information',
      branchOfService: selectUI({
        title: 'Branch of service',
        labels: BRANCH_LABELS,
        errorMessages: {
          required: 'Please select a branch of service.',
        },
      }),
      component: radioUI({
        title: 'Service component',
        labels: {
          active: 'Active duty',
          guard: 'National Guard',
          reserve: 'Reserve',
        },
        errorMessages: {
          required: 'Please select a service component.',
        },
      }),
      rankAtDeath: textUI({
        title: 'Military rank or rating at time of death',
        hint:
          'Enter the rank exactly as it should appear on the headstone or marker. For example: Sergeant First Class, Petty Officer Second Class',
        errorMessages: {
          required: 'Please enter the service member\'s military rank.',
        },
      }),
      serviceNumber: textUI({
        title: 'Service or military ID number (optional)',
        hint: 'Enter the service number if different from the Social Security number.',
      }),
      serviceEntryDate: {
        ...currentOrPastDateUI({
          title: 'Date military service began',
          hint:
            'Enter the date the service member first entered military service.',
        }),
        'ui:validations': [validateServiceEntryBeforeDeath],
      },
      serviceEndDate: currentOrPastDateUI({
        title: 'Date military service ended (optional)',
        hint:
          'If the service member was still on active duty at death, leave this blank.',
      }),
    },
  },
};

export const decedentServiceInfoSchema = {
  type: 'object',
  required: ['decedent'],
  properties: {
    decedent: {
      type: 'object',
      required: ['service'],
      properties: {
        service: {
          type: 'object',
          required: ['branchOfService', 'component', 'rankAtDeath', 'serviceEntryDate'],
          properties: {
            branchOfService: selectSchema(Object.keys(BRANCH_LABELS)),
            component: radioSchema(['active', 'guard', 'reserve']),
            rankAtDeath: {
              type: 'string',
              minLength: 1,
              maxLength: 50,
            },
            serviceNumber: {
              type: 'string',
              maxLength: 20,
            },
            serviceEntryDate: currentOrPastDateSchema,
            serviceEndDate: currentOrPastDateSchema,
          },
        },
      },
    },
  },
};

// ─── Death Information ────────────────────────────────────────────────────────

export const deathInformationUiSchema = {
  decedent: {
    placeOfDeath: {
      'ui:title': 'Place of death',
      city: textUI({
        title: 'City or location of death',
        hint:
          'Enter the city, base name, or location where the service member died.',
        errorMessages: {
          required: 'Please enter the city or location of death.',
        },
      }),
      state: textUI({
        title: 'State (if death occurred in the United States)',
        hint: 'Enter the two-letter state abbreviation.',
      }),
      country: textUI({
        title: 'Country',
        hint: 'Enter the country where the service member died.',
        errorMessages: {
          required: 'Please enter the country of death.',
        },
      }),
    },
  },
};

export const deathInformationSchema = {
  type: 'object',
  properties: {
    decedent: {
      type: 'object',
      properties: {
        placeOfDeath: {
          type: 'object',
          required: ['city', 'country'],
          properties: {
            city: {
              type: 'string',
              maxLength: 100,
            },
            state: {
              type: 'string',
              maxLength: 2,
            },
            country: {
              type: 'string',
              maxLength: 3,
            },
          },
        },
      },
    },
  },
};

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const deceasedInformationPages = {
  decedentPersonalInfo: {
    path: 'deceased-information/personal-info',
    title: 'Personal information of the deceased service member',
    uiSchema: decedentPersonalInfoUiSchema,
    schema: decedentPersonalInfoSchema,
  },
  decedentServiceInfo: {
    path: 'deceased-information/service-info',
    title: 'Military service information',
    uiSchema: decedentServiceInfoUiSchema,
    schema: decedentServiceInfoSchema,
  },
  deathInformation: {
    path: 'deceased-information/death-information',
    title: 'Place of death',
    uiSchema: deathInformationUiSchema,
    schema: deathInformationSchema,
  },
};