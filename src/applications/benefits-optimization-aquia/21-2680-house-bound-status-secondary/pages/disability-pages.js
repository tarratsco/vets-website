/**
 * @module pages/disability-pages
 * @description Single-page configuration for Disabilities
 * VA Form 21-2680 - House Bound Status (Medical Professional)
 *
 * Uses the shared ArrayField molecule to collect permanent and
 * totally disabling disabilities inline on a single page.
 * Starts blank with an "Add a Disability" button.
 */

import React from 'react';
import { titleUI } from 'platform/forms-system/src/js/web-component-patterns';
import { ArrayField } from '@bio-aquia/shared/components/molecules/array-field/array-field';

/**
 * Custom field component that renders disabilities as an inline array.
 * Integrates with the forms system via onChange/formData.
 */
const DisabilitiesField = ({ formData, onChange }) => {
  const items = formData || [];

  const handleChange = (_name, newItems) => {
    onChange(newItems);
  };

  return (
    <ArrayField
      name="disabilities"
      value={items}
      onChange={handleChange}
      defaultItem={{ description: '' }}
      itemName="disability"
      addButtonText={
        items.length > 0 ? 'Add Another Disability' : 'Add a Disability'
      }
      minItems={0}
      isItemEmpty={item => !item?.description}
      getItemSummary={item => item?.description || 'Disability'}
      renderItem={(item, index, handleItemChange) => (
        <va-text-input
          label="Disability"
          required
          value={item.description}
          onInput={e => handleItemChange(index, 'description', e.target.value)}
        />
      )}
    />
  );
};

export const disabilitiesUiSchema = {
  ...titleUI('Disabilities'),
  'ui:description':
    'What disability(ies) are considered permanent and totally disabling? Add items below.',
  disabilities: {
    'ui:field': DisabilitiesField,
  },
};

export const disabilitiesSchema = {
  type: 'object',
  properties: {
    disabilities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          description: { type: 'string' },
        },
      },
    },
  },
};
