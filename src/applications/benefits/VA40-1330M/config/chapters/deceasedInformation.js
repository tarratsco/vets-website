import {
  textUI,
  textSchema,
  fullNameUI,
  fullNameSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  ssnUI,
  ssnSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const BRANCH_OF_SERVICE_LABELS = {
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

const BRANCH_KEYS = Object.keys(BRANCH_OF_SERVICE_LABELS);

// ── Chapter 2 Page 1 — Decedent Personal Info ─────────────────────────────────

export const decedentPersonalInfoUiSchema = {
  decedent: {
    'ui:title': 'Personal information of the deceased service member',
    name: {
      ...fullNameUI(title => `Service member\'s ${title}`),
    },
    ssn: {
      ...ssnUI(),
      'ui:title': 'Social Security number',
      'ui:options': {
        hint: 'Enter the service member\'s Social Security number. This is used to locate their service records.',
        dataDogHidden: true,
      },
    },
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint: 'Enter the service member\'s date of birth as it appears on their service records.',
    }),
    dateOfDeath: currentOrPastDateUI({
      title: 'Date of death',
      hint: 'Enter the date of death as it appears on the death certificate or DD Form 1300.',
    }),
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

// ── Chapter 2 Page 2 — Decedent Service Info ──────────────────────────────────

export const decedentServiceInfoUiSchema = {
  decedent: {
    service: {
      'ui:title': 'Military service information',
      branchOfService: selectUI({
        title: 'Branch of service',
        hint: 'Select the branch in which the service member served at the time of death.',
        labels: BRANCH_OF_SERVICE_LABELS,
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
          required: 'Please select the service component.',
        },
      }),
      rankAtDeath: textUI({
        title: 'Military rank or rating at time of death',
        hint: 'Enter the rank exactly as it should appear on the headstone or marker. Example: Sergeant First Class, Petty Officer Second Class.',
        errorMessages: {
          required: 'Please enter the service member\'s military rank.',
        },
      }),
      serviceNumber: textUI({
        title: 'Service or military ID number (optional)',
        hint: 'Enter the service number if different from Social Security number.',
      }),
      serviceEntryDate: currentOrPastDateUI({
        title: 'Date military service began',
        hint: 'Enter the date the service member first entered active military service.',
      }),
      serviceEndDate: currentOrPastDateUI({
        title: 'Date military service ended (optional)',
        hint: 'Leave blank if the service member was still serving at the time of death.',
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
            branchOfService: selectSchema(BRANCH_KEYS),
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

// ── Chapter 2 Page 3 — Death Information ──────────────────────────────────────

export const deathInformationUiSchema = {
  decedent: {
    placeOfDeath: {
      'ui:title': 'Place of death',
      city: textUI({
        title: 'City or location of death',
        hint: 'Enter the city, base name, or location where the service member died.',
        errorMessages: {
          required: 'Please enter the city or location of death.',
        },
      }),
      state: textUI({
        title: 'State (if applicable)',
        hint: 'Enter the 2-letter state abbreviation, if the service member died in the United States.',
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