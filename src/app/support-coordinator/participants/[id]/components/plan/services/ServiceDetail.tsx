import { useGetPlanServiceDetailQuery } from '@/store/features/participants/plan/apiSliceleanq_support_coordinator'
import { Skeleton } from 'antd'
import React from 'react'


export default function ServiceDetail({ id }: { id: string | number }) {
    const { data, isLoading, error } = useGetPlanServiceDetailQuery(id)

    if (isLoading) { return <Skeleton /> }

    const serviceDetail = data?.data;

    return (
        <div>
            <div className="flex justify-between items-center w-full">
                <h3 className="text-2xl font-semibold m-0 pb-5">Services</h3>
            </div>
            <div className='flex flex-col gap-5'>
                <p> Name : {serviceDetail?.name}</p>
                <p> Management Type : {serviceDetail?.managementType}</p>
                <p> Sc Rate : {serviceDetail?.scRate}</p>
                <p> Budget : {serviceDetail?.budget}</p>
            </div>
        </div>
    )
}
