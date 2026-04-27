import {
  fullNameUI,
  fullNameSchema,
  textUI,
  radioUI,
  radioSchema,
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ── Decedent Personal Info ───────────────────────────────────────────────────

export const decedentPersonalInfoUiSchema = {
  decedent: {
    name: fullNameUI(
      title => `Deceased service member's ${title}`,
    ),
    ssn: {
      ...ssnUI({
        title: 'Social Security number',
        hint:
          'Enter the service member\'s Social Security number. This is used to locate their service records.',
      }),
    },
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint: 'Enter the service member\'s date of birth as it appears on their service records.',
      dataDogHidden: true,
    }),
    dateOfDeath: currentOrPastDateUI({
      title: 'Date of death',
      hint:
        'Enter the date of death as it appears on the death certificate or DD Form 1300.',
      dataDogHidden: true,
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

// ── Decedent Service Info ────────────────────────────────────────────────────

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

export const decedentServiceInfoUiSchema = {
  decedent: {
    service: {
      branchOfService: selectUI({
        title: 'Branch of service',
        hint:
          'Select the branch in which the service member served at the time of death.',
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
          required: 'Please select a service component.',
        },
      }),
      rankAtDeath: textUI({
        title: 'Military rank or rating at time of death',
        hint:
          'Enter the rank exactly as it should appear on the headstone or marker. Example: Sergeant First Class, Petty Officer Second Class, Lance Corporal',
        errorMessages: {
          required: 'Please enter the service member\'s military rank.',
        },
      }),
      serviceNumber: textUI({
        title: 'Service or military ID number (optional)',
        hint: 'Enter the service member\'s military ID number if known.',
      }),
      serviceEntryDate: currentOrPastDateUI({
        title: 'Date military service began',
        hint:
          'Enter the date the service member first entered active military service. This appears on their DD Form 1300 or NGB Form 22.',
      }),
      serviceEndDate: currentOrPastDateUI({
        title: 'Date military service ended (if applicable)',
        hint: 'Leave blank if the service member was still serving at time of death.',
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

// ── Death Information ────────────────────────────────────────────────────────

export const deathInformationUiSchema = {
  decedent: {
    placeOfDeath: {
      city: textUI({
        title: 'City or location of death',
        hint: 'Enter the city, base name, or location where the service member died.',
        errorMessages: {
          required: 'Please enter the city or location of death.',
        },
      }),
      state: textUI({
        title: 'State (if applicable)',
        hint: 'Enter the two-letter state abbreviation, if the death occurred in the United States.',
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