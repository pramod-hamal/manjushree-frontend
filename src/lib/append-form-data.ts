// utils.ts
export const appendFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
         formData.append(key, obj[key]);
    }
  }
  return formData;
};

export const multiFormData = (data:any)=>{
  const formData = new FormData();

for (const key in data) {
    if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object') {
            // Handle nested objects (like the 'address' and 'logo' properties)
            for (const nestedKey in data[key]) {
                if (data[key].hasOwnProperty(nestedKey)) {
                    formData.append(`${key}[${nestedKey}]`, data[key][nestedKey]);
                }
            }
        } else {
            formData.append(key, data[key]);
        }
    }
}
  return formData;
}