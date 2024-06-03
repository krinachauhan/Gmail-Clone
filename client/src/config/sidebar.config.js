import { Photo ,Star, Send, InsertDriveFile, Delete, Mail } from "@mui/icons-material"

export const SIDEBAR_DATA=[
    {
        name: 'inbox',
        title: 'Inbox',
        icon: Photo
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: Star
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: Send
    },
    {
        name: 'drafts',
        title: 'Drafts',
        icon: InsertDriveFile
    },
    {
        name: 'bin',
        title: 'Bin',
        icon: Delete
    },
    {
        name: 'allmail',
        title: 'All Mail',
        icon: Mail
    }
    
]