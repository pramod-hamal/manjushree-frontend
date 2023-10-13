"use client"

import React, { useState } from 'react'
import { useFormik } from 'formik'

import { useImportMutation } from '@/store/features/settings/import/apiSliceleanq_support_coordinator'

import FlatButton from '@/components/buttons/Buttonleanq_support_coordinator'
import CusModal from '@/components/modals/Modalleanq_support_coordinator'
import FileUpload from '@/components/form/FileUploadleanq_support_coordinator'
import { appendFormData } from '@/core/lib/append-form-dataleanq_support_coordinator'
import { useToast } from '@/core/lib/toast/useToastleanq_support_coordinator'

export default function AddFile() {
    const [show, setShow] = useState(false);
    const showToast = useToast()

    const toogleShow = () => setShow(!show);

    const [add] = useImportMutation();

    const onSubmit = (values: any, { setSubmitting }: any) => {
        const formData = appendFormData(values);
        add(formData).unwrap()
            .then((data: any) => {
                showToast({ title: "Charge Item Uploaded", type: "success" })
            })
            .catch((error: any) => {
                showToast({ title: "Something went wrong", type: "error" })
            })
            .finally(() => { setSubmitting(false) })
    }

    const formik = useFormik({
        initialValues: { file: null },
        onSubmit: onSubmit
    })

    return (
        <div>
            <FlatButton title='Import' onClick={toogleShow} />
            <CusModal show={show} title='Import Charge Sheet' onClose={toogleShow}>
                <div className='space-y-5'>
                    <FileUpload
                        value={null}
                        onChange={(file: any) => {
                            console.log(file)
                            var allowedTypes = ['application/xlsx', 'application/xls', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
                            if (!allowedTypes.includes(file.file.type)) {
                                showToast({ title: 'Invalid file type. Please upload a Excel file', type: "warning" });
                            }
                            else {
                                formik.setFieldValue("file", file.file)
                            }
                        }}
                    />
                    <div className='flex flex-row-reverse'>
                        <FlatButton title='Upload' onClick={formik.handleSubmit} loading={formik.isSubmitting} />
                    </div>
                </div>
            </CusModal>
        </div>
    )
}