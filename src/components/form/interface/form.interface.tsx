import { InputRef } from "antd";

export interface CusCheckBoxProps {
    onChange: any;
    title: string;
    name: string;
    value: boolean;
    label?: string;
    disabled?: boolean;
    errors?: any;
    required?: boolean;
}

export interface ErrorMessageProps {
    message: string;
}


export interface FormInputProps {
    name: string;
    onChange: any;
    placeHolder?: string;
    value: any;
    errors: any;
    disabled?: boolean;
    key?: any;
    className?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    type?: FormInputTypes;
    label?: string;
    required?: boolean;
    onKeyDown?: any;
    copy?: boolean;
    ref?: React.Ref<InputRef> | undefined;
}

export interface NumberInputProps {
    placeHolder?: string;
    onChange: any;
    value: number;
    name: string;
    max: number;
    min: number;
    errors?: any;
    label?: string;
    required?: boolean;
    class?: string;
}


export type FormInputTypes =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

export interface CusSelectProps {
    placeHolder: string;
    onChange: any;
    options: CusSelectOption[];
    value: any;
    mode?: "multiple" | "tags";
    label?: string;
    errors?: any;
    required?: boolean;
    disabled?: boolean;
}

export interface CusSelectOption {
    value: string | number;
    label: string;
}
