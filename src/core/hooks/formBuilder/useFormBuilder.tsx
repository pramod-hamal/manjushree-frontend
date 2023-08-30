import { FormikHelpers, useFormik } from "formik";

import CusCheckbox from "@/components/form/Checkboxleanq_support_coordinator";
import FormInput, {
  NumberInput,
  PasswordFormInput,
  TextAreaInput,
} from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import { FormField, FormbuilderProps } from "./interface/formBuilder.interface";

const useFormBuilder = ({
  initialValues,
  onSubmit,
  formFields,
  validationSchema,
}: FormbuilderProps<any>) => {
  /**
   * Initializing formin and adding initial values as well as validations schema
   * @param {any} {initialValues
   * @param {any} onSubmit
   * @param {any} validateOnMount:false
   * @param {any} validateOnChange:falseDescriptionOnBlur:false
   * @param {any} enableReinitialize:true
   * @param {any} }
   * @returns {any}
   */
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  /**
   * Render Form fields as per the formfields props
   * Its generates form fields as per its type and indexing in array
   * @returns {(JSX.Element | undefined)[]}
   */
  const renderFormFields = (): (JSX.Element | undefined)[] => {
    return formFields.map((formField: FormField, index: number) => {
      if (formField.visible && formField.visible(formik.values) === false)
        return;
      switch (formField.type) {
        case "text":
        case "date":
        case "email":
          return (
            <FormInput
              required={formField.required}
              label={formField.label}
              placeHolder={formField.placeHolder}
              name={formField.name}
              suffix={formField.suffix}
              prefix={formField.prefix}
              type={formField.type}
              value={formik.values[formField.name]}
              errors={formik.errors[formField.name]}
              onChange={formik.handleChange}
              disabled={formField.disabled}
            />
          );
        case "textarea":
          return (
            <TextAreaInput
              required={formField.required}
              label={formField.label}
              disabled={formField.disabled}
              placeHolder={formField.placeHolder}
              name={formField.name}
              suffix={formField.suffix}
              prefix={formField.prefix}
              value={formik.values[formField.name]}
              errors={formik.errors[formField.name]}
              onChange={formik.handleChange}
            />
          );
        case "password":
          return (
            <PasswordFormInput
              required={formField.required}
              disabled={formField.disabled}
              name={formField.name}
              suffix={formField.suffix}
              prefix={formField.prefix}
              type={formField.type}
              value={formik.values[formField.name]}
              errors={formik.errors[formField.name]}
              onChange={formik.handleChange}
            />
          );
        case "checkbox":
          return (
            <CusCheckbox
              required={formField.required}
              disabled={formField.disabled}
              value={formik.values[formField.name]}
              name={formField.name}
              onChange={formik.handleChange}
              title={formField.label!}
            />
          );
        case "number":
          return (
            <NumberInput
              required={formField.required}
              max={formField.max!}
              label={formField.label}
              min={formField.min!}
              placeHolder={formField.placeHolder}
              onChange={formik.handleChange}
              value={formik.values[formField.name]}
              name={formField.name}
            />
          );
        case "select":
          return (
            <CusSelect
              required={formField.required}
              disabled={formField.disabled}
              label={formField.label}
              onChange={(selectedValue: any) =>
                formik.setFieldValue(formField.name, selectedValue)
              }
              placeHolder={formField.placeHolder ?? ""}
              value={formik.values[formField.name]}
              options={formField.options!}
            />
          );
        default:
          break;
      }
    });
  };

  return { formik, renderFormFields };
};

export default useFormBuilder;
