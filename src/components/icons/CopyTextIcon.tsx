import React from 'react'
import { CopyOutlined } from '@ant-design/icons'

import { copyTextToClipboard } from '@/core/lib/copyToClipboardleanq_support_coordinator'

export default function CopyTextIcon({ val }: { val: string }) {
    return (
        <CopyOutlined className="text-primary-title mr-5" onClick={() => copyTextToClipboard(val)} />

    )
}
