import {
  fullNameUI,
  fullNameSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textUI,
  textSchema,
  ssnUI,
  ssnSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

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

const BRANCH_KEYS = Object.keys(BRANCH_LABELS);

export const decedentPersonalInfoUiSchema = {
  decedent: {
    'ui:title': 'Personal information of the deceased service member',
    name: fullNameUI(
      title => `Deceased service member\'s ${title}`,
    ),
    ssn: ssnUI(),
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint:
        'Enter the service member\'s date of birth as it appears on their service records',
    }),
    dateOfDeath: currentOrPastDateUI({
      title: 'Date of death',
      hint:
        'Enter the date of death as it appears on the death certificate or DD Form 1300',
    }),
  },
};

export const decedentPersonalInfoSchema = {
  type: 'object',
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

export const decedentServiceInfoUiSchema = {
  decedent: {
    service: {
      'ui:title': 'Military service information',
      branchOfService: selectUI({
        title: 'Branch of service',
        hint: 'Select the branch in which the service member served at the time of death',
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
          'Enter the rank exactly as it should appear on the headstone or marker. Example: Sergeant First Class',
        errorMessages: {
          required: 'Please enter the service member\'s military rank.',
        },
      }),
      serviceNumber: textUI({
        title: 'Service or military ID number (optional)',
        hint: 'Enter the service number if different from Social Security number',
      }),
      serviceEntryDate: currentOrPastDateUI({
        title: 'Date military service began',
        hint:
          'Enter the date the service member first entered active military service',
      }),
      serviceEndDate: currentOrPastDateUI({
        title: 'Date military service ended (optional)',
        hint: 'If applicable, enter the date military service ended',
      }),
    },
  },
};

export const decedentServiceInfoSchema = {
  type: 'object',
  properties: {
    decedent: {
      type: 'object',
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

export const deathInformationUiSchema = {
  decedent: {
    placeOfDeath: {
      'ui:title': 'Place of death',
      city: textUI({
        title: 'City or location of death',
        hint: 'Enter the city, base name, or location where the service member died',
      }),
      state: textUI({
        title: 'State (if applicable)',
        hint: 'Enter the 2-letter state abbreviation',
      }),
      country: textUI({
        title: 'Country',
        hint: 'Enter the country where the service member died',
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