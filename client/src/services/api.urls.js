export const API_URLS = {
    saveSentEmail: {
        endpoint: 'save',
        method: 'POST' // Ensure the method is correct
    },
    getEmailFromType:{
        endpoint: 'emails',
        method: 'GET'
    },
    saveDraftEmails:{
        endpoint: 'save-draft',
        method: 'POST'
    },
    moveEmailToBin:{
        endpoint: 'bin',
        method: 'POST'
    },
    toggleStarEmail:{
        endpoint: 'starred',
        method: 'POST'
    },
    deleteMail:{
        endpoint: 'delete',
        method: 'DELETE'
    }
}
