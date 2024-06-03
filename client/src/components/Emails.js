import React, { useEffect, useState } from 'react'
import { useOutletContext , useParams} from 'react-router-dom'
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/UseApi'
import {Checkbox, Box, List}  from '@mui/material'
import {DeleteOutline} from '@mui/icons-material'
import Email from './Email';
import NoMail from './common/NoMail';
import { EMPTY_TABS } from '../constants/constant';

const Emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refereshScreen , setRefereshScreen] = useState(false);

  const {openDrawer} = useOutletContext();

  const {type} = useParams();

  const getEmailService = useApi(API_URLS.getEmailFromType);
  const moveEmailToBinService = useApi(API_URLS.moveEmailToBin);
  const deleteEmailService = useApi(API_URLS.deleteMail)

  useEffect(() => {
    getEmailService.call({}, type);
  }, [type,refereshScreen]);

  const selectedAllEmails = (e) => {
    if(e.target.checked){
        const checkedemail = getEmailService?.response?.map(email => email._id);
        setSelectedEmails(checkedemail);
    }else{
      setSelectedEmails([]);
    }
  }

  const deleteSelectedEmails =(e) => {
    if(type === 'bin'){
      deleteEmailService.call(selectedEmails)
    }else{
      moveEmailToBinService.call(selectedEmails);
    }
    setRefereshScreen(prevState => !prevState)
  }

  return (

    <>
        <Box style={openDrawer ? {marginLeft: 250, width: 'calc(100% - 250px)'} : {width: '100%'}}>
           <Box style={{padding: '20px 10px 0 10px' , display: 'flex' , alignItems: 'center'}}>
              <Checkbox fontSize='small' onChange={(e) => selectedAllEmails(e)}/>
              <DeleteOutline fontSize='small' onClick={(e) => deleteSelectedEmails(e)} />
           </Box> 
           <List>
                {
                  getEmailService?.response?.map(email => (
                    <Email 
                      key={email._id} 
                      email={email} 
                      selectedEmails={selectedEmails}
                      setRefereshScreen={setRefereshScreen}
                      setSelectedEmails={setSelectedEmails}
                      />
                  ))
                }
           </List>
           {
            getEmailService?.response?.length === 0 &&
              <NoMail message={EMPTY_TABS[type]}/>
           }
        </Box>
        
    </>
  )
}

export default Emails