import React from 'react'
import {Box, Typography, Checkbox, styled} from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes'
import UseApi from '../hooks/UseApi';
import { API_URLS } from '../services/api.urls';

const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > div':{
        display: 'flex',
        width: '100%',
        '& > p': {
            fontSize: 14
        }
    }
});

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6

});

const DateTypo = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
}) 

const Email = ({email,selectedEmails, setRefereshScreen,setSelectedEmails}) => {
    const navigate = useNavigate();

    const toggleStarredService = UseApi(API_URLS.toggleStarEmail);

    const toggleStarredMail = () => {
        toggleStarredService.call({id: email._id, value: !email.starred})
        setRefereshScreen(prevState => !prevState)
    }

    const onValueChange = () => {
        if(selectedEmails.includes(email._id)){
            setSelectedEmails(prevState => prevState.filter(id => id != email._id));
        }else{
            setSelectedEmails(prevState => [...prevState, email._id])
        }
    }

  return (
    <>
        <Wrapper>
            <Checkbox 
            fontSize='small'
            checked={selectedEmails.includes(email._id)}
            onChange={() => onValueChange()}
            />
            {
                email.starred ?
                    <Star fontSize='small' style={{marginRight: 10, color: '#FCD12A'}} onClick={() => toggleStarredMail()}/>
                :
                    <StarBorder fontSize='small' style={{ marginRight: 10}} onClick={() => toggleStarredMail()}/>
            }
            
            <Box onClick={() => navigate(routes.view.path, { state: {email: email}})}>
                <Typography style={{ width: 200, overflow: 'hidden'}}>{email.name}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography>{email.subject} {email.body && '-' } {email.body}</Typography>
                <DateTypo>
                    {(new window.Date(email.date)).getDate()}
                    {(new window.Date(email.date)).toLocaleDateString('default' , {month: 'long'})}
                </DateTypo>
            </Box>
            
        </Wrapper>
    </>
  )
}

export default Email