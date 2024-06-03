import React from 'react'
import { useOutletContext , useLocation} from 'react-router-dom';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import { emptyprofile } from '../constants/constant';
import UseApi from '../hooks/UseApi';
import { API_URLS } from '../services/api.urls';

const IconWrapper = styled(Box)({
  padding: 15
});

const SubjectWrapper = styled(Typography)({
  fontSize: 22,
  margin: '10px 0 20px 75px',
  display: 'flex'
})

const Indicator = styled(Typography)({
  fontSize: 12,
  background: '#ddd',
  color: "#222",
  padding: '2px 4px',
  marginLeft: 6,
  borderRadius: 4,
  alignSelf: 'center'
});

const Container = styled(Box)({
  marginLeft: 15,
  width: '100%',
  '& > div': {
    display: 'flex',
    width: '100%',
    '& < p ': {
      fontSize: 12,
      color: '#5E5E5E'
    }
  }
  
});

const ImageWrapper = styled('img')({
  borderRadius: '50%',
  width: 40,
  height: 40,
  margin: '5px 10px 0 10px',
  background: '#cccccc'
})

const DateWrapper = styled(Box)({
  margin: '0 50px 0 auto',
  fontSize: 12,
  color: '#5E5E5E'
});

const ViewEmails = () => {
  const moveEmailToBinService = UseApi(API_URLS.moveEmailToBin);
    const {openDrawer} = useOutletContext();

    const {state} = useLocation();
    const {email} = state;

    const deleteMail = ( ) => {
      moveEmailToBinService.call([email._id]);
      window.history.back()
    }
  return (
    <>
        <Box style={openDrawer ? {marginLeft: 250} : {width: '100%'}}>
            <IconWrapper>
                <ArrowBack onClick={() => window.history.back()} color="action" fontSize='small'/>
                <Delete fontSize='small' color="action" style={{marginLeft: 40}} onClick={() => deleteMail()}/>
            </IconWrapper>
            <SubjectWrapper>
                {email.subject}
                <Indicator component='span'>
                  Inbox
                </Indicator>
            </SubjectWrapper>
            <Box style={{display: 'flex'}}>
              <ImageWrapper src={emptyprofile} alt='profilepic'/>
              <Container>
                <Box>
                    <Typography style={{marginTop: 10}}>{email.name}
                      <Box component='span'>&nbsp; &#60;{email.to}&#62;</Box>
                    </Typography>
                    <DateWrapper>
                      {(new window.Date(email.date)).getDate()} &nbsp;
                      {(new window.Date(email.date)).toLocaleDateString('default' , {month: 'long'})}&nbsp;
                      {(new window.Date(email.date)).getFullYear()}
                    </DateWrapper>                    
                </Box>
                <Typography style={{marginTop: 20}}>{email.body}</Typography>
              </Container>
            </Box>
        </Box>
        
    </>
  )
}

export default ViewEmails