import React, { useState } from 'react'
import { Box, Dialog, InputBase, TextField, Typography, styled, Button } from '@mui/material'
import {  Close, Delete, } from '@mui/icons-material'
import UseApi from '../hooks/UseApi'
import { API_URLS } from '../services/api.urls'

const dialogStyled =  {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0'
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '18px 15px',
    background: '#f2f6fc',
    '& > p':{
        fontSize: 14,
        fontWight: 500
    }
});

const RecipientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div': {
        fontSize: 14,
        BorderBottom: '1px solid #F5F5F5',
        MarginTop: 10

    }
});

const Footer = styled(Box)({
    display:'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    alignItems: 'center',


});

const SendButton = styled(Button)({
    background: '#0057D0',
    color: '#fff',    
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: 18,
    width: 100
})
export const ComposedMail = ({openDialog, setOpenDialog}) => {
    const [data,setData] = useState({});
    const sentEmailService = UseApi(API_URLS.saveSentEmail);
    const savedDraftService = UseApi(API_URLS.saveDraftEmails);

    const onValueChange = (e) => {
        setData({...data,[e.target.name]: e.target.value})
        console.log(data);
    }
    const config ={
        Host : "smtp.elasticemail.com",
        Username : "myvote3211@yopmail.com",
        Password : "49AF3B6893BBA3EEB23756C7E08E76CD9818",
        Port: 2525,
    }

    const closeComposedMail = (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: "myvote1233@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            attachment: '',
            name: 'Krina Chauhan',
            starred: false,
            type: 'drafts'

        }

        savedDraftService.call(payload)

        if(!savedDraftService.error){
            setOpenDialog(false);
            setData({});
        }
    }

    const sendMail = (e) => {
        e.preventDefault();
        if(window.Email){
            window.Email.send({
                ...config,
                 To : data.to,
                 From : "myvote1233@gmail.com",
                 Subject : data.subject,
                 Body : data.body
             }).then(
               message => alert(message)
             );
        }
        
        const payload = {
            to: data.to,
            from: "myvote1233@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            attachment: '',
            name: 'Krina Chauhan',
            starred: false,
            type: 'sent'

        }

        sentEmailService.call(payload)

        if(!sentEmailService.error){
            setOpenDialog(false);
            setData({});
        }

        setOpenDialog(false);
    }
    
    
    const DeleteMail = () => {
        setOpenDialog(false);
    }
  return (
    <>
        <Dialog 
            
            open={openDialog}
            PaperProps={{ sx: dialogStyled }}>
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize='small' onClick={(e) => closeComposedMail(e)}/>

            </Header> 
            <RecipientsWrapper>
                <InputBase placeholder='Recipients' name='to' onChange={(e) => onValueChange(e)}/>
                <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChange(e)}/>
            </RecipientsWrapper>
            <TextField
                multiline 
                rows={20} 
                sx={{ '& .MuiOutlinedInput-notchedOutline': {border: 'none'}}}
                name='body' 
                onChange={(e) => onValueChange(e)}
                />
            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
                <Delete onClick={() => DeleteMail()}/>
            </Footer>
        </Dialog>
    </>
  )
}
