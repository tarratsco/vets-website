/**
 * Chapter 5, Screen 8 — Condo Project Check
 * Conditional: shown only when propertyType === 'condo'
 * VA Form 26-1805
 */
import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const condoProjectCheckUiSchema = {
  propertyInformation: {
    'ui:title': 'Condominium project details',
    condoProjectDetails: {
      'ui:title': 'Condo project information',
      condoProjectName: textUI({
        title: 'Condominium project name',
        hint:
          'Enter the full legal name of the condominium project as it appears on legal documents.',
        errorMessages: {
          required: 'Enter the condominium project name.',
        },
      }),
      hoaName: textUI({
        title: 'Homeowners Association (HOA) name (optional)',
        hint: 'Enter the name of the HOA if different from the condo project name.',
      }),
      vaProjectApprovalId: textUI({
        title: 'VA condo project approval ID (if known)',
        hint:
          'If you know the VA project approval ID for this condo project, enter it here. This helps VA quickly confirm project approval status.',
      }),
    },
  },
};

export const condoProjectCheckSchema = {
  type: 'object',
  properties: {
    propertyInformation: {
      type: 'object',
      properties: {
        condoProjectDetails: {
          type: 'object',
          required: ['condoProjectName'],
          properties: {
            condoProjectName: { type: 'string', maxLength: 100 },
            hoaName: { type: 'string', maxLength: 100 },
            vaProjectApprovalId: { type: 'string', maxLength: 20 },
          },
        },
      },
    },
  },
};