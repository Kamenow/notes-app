export function setErrors(
  error: any,
  fieldNames: { fieldName: string; setFieldError: (value: string) => void }[]
) {
  Object.entries(error.response.data.data).map(([fieldName, value]) => {
    console.log(fieldName);
    const errorField = fieldNames.find(
      (field) => field.fieldName === fieldName
    );

    if (errorField) {
      errorField.setFieldError(value as string);
    }
  });
}
