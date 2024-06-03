import { Box, Button, styled, List, ListItem } from '@mui/material'
import Create from '@mui/icons-material/Create';
import React, { useState } from 'react'
import { SIDEBAR_DATA } from '../config/sidebar.config';
import { ComposedMail } from './ComposedMail';
import { useParams, NavLink } from 'react-router-dom';
import {routes} from "../routes/routes"

const ComposeButton = styled(Button)({
    background: '#c2e7ff',
    color: '#001d35',
    padding: 16,
    borderRadius: 16,
    minWidth: 140,
    textTransform: 'none'
});

const Container = styled(Box)({
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: 8,
    '& > ul':{
        padding: '10px 0 0 5px',
        fontSize: 15,
        fontWeight: 500,
        cursor: 'pointer',
        '& > a':{
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    '& > ul > a > li > svg':{
        marginRight: 20
    }
})
function SidebarContent() {
    const [openDialog, setOpenDialog] = useState(false);

    const { type } = useParams();

    const ComposeClick = () => {
        setOpenDialog(true)
    }
  return (
    <>
        <Container>
            
            <ComposeButton onClick={() => ComposeClick()}>
                <Create/> Compose
            </ComposeButton>
            <List>
                {
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <ListItem style={type === data.name.toLowerCase() ? {
                                backgroundColor: '#d3e3fd',
                                borderRadius: '0 16px 16px 0'
                            } : {}}>
                                <data.icon fontSize='small'/> 
                                {data.title}
                            </ListItem>
                        </NavLink>
                        
                    ))
                }
            </List>
            <ComposedMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
        </Container>
    </>
  )
}

export default SidebarContent