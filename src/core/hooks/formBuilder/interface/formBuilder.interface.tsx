import { FormikHelpers } from "formik";

export interface FormbuilderProps<T> {
    initialValues: T;
    onSubmit: (
        values: any,
        formikHelpers: FormikHelpers<any>
    ) => void | Promise<any>;
    formFields: FormField[];
    validationSchema?: any;
    showLabel?: boolean;
}

export interface FormField {
    name: string;
    placeHolder?: string;
    copy?:boolean;
    label?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    type: FormFieldType;
    options?: any[];
    isChecked?: boolean;
    onChange?: any;
    child?: any;
    visible?: (values: any) => boolean;
    disabled?: boolean;
    getValue?: (value: any) => any;
    min?: number;
    max?: number;
    required?: boolean;
}

export type FormFieldType =
    | "text"
    | "number"
    | "email"
    | "password"
    | "textarea"
    | "checkbox"
    | "checkboxList"
    | "radio"
    | "select"
    | "date"
    | "file"
    | "switch";