import { useFormik } from "formik";

import CusCheckbox from "@/components/form/Checkboxleanq_support_coordinator";
import FormInput, {
  NumberInput,
  PasswordFormInput,
  TextAreaInput,
} from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import { FormField, FormbuilderProps } from "./interface/formBuilder.interface";
import CusDatePicker from "@/components/form/DatePickerleanq_support_coordinator";

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
        case "email":
          return (
            <FormInput
              key={index}
              required={formField.required}
              label={formField.label}
              placeHolder={formField.placeHolder}
              name={formField.name}
              suffix={formField.suffix}
              copy={formField.copy}
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
              key={index}
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
              key={index}
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
              key={index}
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
              key={index}
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
              key={index}
              required={formField.required}
              disabled={formField.disabled}
              errors={formik.errors[formField.name]}
              label={formField.label}
              onChange={(selectedValue: any) =>
                formField.onChange ? formField.onChange(selectedValue) : formik.setFieldValue(formField.name, selectedValue)
              }
              placeHolder={formField.placeHolder ?? ""}
              value={formik.values[formField.name]}
              options={formField.options!}
            />
          );
        case "date":
          return (
            <CusDatePicker
              key={index}
              required={formField.required ?? false}
              label={formField.label ?? ""}
              name={formField.name}
              onChange={(date: any, dateString: any) =>
                formik.setFieldValue(formField.name, dateString)
              }
              disabled={formField.disabled ?? false}
              value={formik.values[formField.name]}
              errors={formik.errors[formField.name]}
            />
          )
        default:
          break;
      }
    });
  };

  return { formik, renderFormFields };
};

export default useFormBuilder;
