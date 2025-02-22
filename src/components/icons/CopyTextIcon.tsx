import React from 'react'
import { Tooltip } from 'antd'

import { copyTextToClipboard } from '@/core/lib/copyToClipboardleanq_support_coordinator'

export default function CopyTextIcon({ val }: { val: string }) {
    return (
        <Tooltip key={val} title="Copied to clipboard" trigger="click" arrow={false}>
            <svg width="16" onClick={() => copyTextToClipboard(val)} height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer hover:scale-105 transition-all'>
                <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#878D96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#878D96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Tooltip>
    )
}
