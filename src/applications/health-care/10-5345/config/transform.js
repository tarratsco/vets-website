/**
 * Transform form data for submission to vets-api.
 * Maps from platform-forms-system internal format to the API payload shape.
 */
const transformForSubmit = (formConfig, form) => {
  const { data } = form;

  // Strip view-only fields (prefixed with 'view:')
  const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
    if (!key.startsWith('view:')) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return JSON.stringify({
    form10_5345: {
      ...cleanData,
    },
  });
};

export default transformForSubmit;