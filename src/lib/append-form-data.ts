
export const appendFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
};

/**
 * Converts an object into a FormData object.
 * Handles nested objects by appending their keys and values to the FormData object with a specific format.
 * @param data - The object to convert into FormData.
 * @returns The FormData object containing all the key-value pairs from the input object.
 */
export const multiFormData = (data: any): FormData => {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      if (typeof value === 'object') {
        // Handle nested objects
        for (const nestedKey in value) {
          if (value.hasOwnProperty(nestedKey)) {
            const nestedValue = value[nestedKey];
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          }
        }
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
};