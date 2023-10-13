import React from 'react'
import { Skeleton } from 'antd'

import SelectedChargeList from './form/SelectedChargeList';
import useUpdateServiceDetailForm from './hooks/useUpdateServiceDetailForm';


export default function ServiceDetail({ id }: { id: string | number }) {
    const { isLoading, isFetching, formik, renderFormFields } = useUpdateServiceDetailForm({ id })

    if (isLoading || isFetching) { return <Skeleton /> }

    return (
        <div>
            <div className="flex justify-between items-center w-full">
                <h3 className="text-2xl font-semibold m-0 pb-5">Services</h3>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {renderFormFields()}
            </div>
            <div className='py-4'>
                <h3 className="text-xl font-semibold m-0 pb-5">Selected Charge List</h3>
                <SelectedChargeList formik={formik} data={formik.values.chargeItems} />
            </div>
        </div>
    )
}
