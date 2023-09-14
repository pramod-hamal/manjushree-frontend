import React from 'react'
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { DatePicker } from 'antd'
import ErrorMessage from './ErrorMessage';

const dateFormat = "DD/MM/YYYY";
dayjs.extend(customParseFormat);

interface CusDatePickerProps {
    onChange: (date:any,dateString:any) => void;
    value: any;
    name: string;
    errors: any;
    label: string;
    required: boolean;
}

export default function CusDatePicker({ onChange, name, value, errors, label, required }: CusDatePickerProps) {
    return (
        <div className="flex flex-col gap-3 text-sm" >
            {label && (
                <div className="flex items-center gap-2">
                    {required && <span className="text-sm text-primary-danger">*</span>}
                    <span>{label}</span>
                </div>
            )}
            <DatePicker className='w-full rounded-none' onChange={onChange} format={dateFormat} name={name} />
            {errors && <ErrorMessage message={errors} />}
        </div>
    )
}