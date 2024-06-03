import React from 'react'
import {AppBar , Toolbar, styled, Box, InputBase} from '@mui/material'
import {Menu as MenuIcon, Search, Tune, HelpOutline, Settings, Apps, AccountCircle} from '@mui/icons-material';
import {gmailLogo} from '../constants/constant'

const StyledAppbar = styled(AppBar)({
    backgroundColor: "#F5F5F5",
    boxShadow: 'none'
})
 const SearchWrapper = styled(Box)({
    backgroundColor: "#EAF1FB",
    marginLeft: 80,
    borderRadius: 8,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {
        width: '100%',
        padding: '0 10px'
    }
 })
 const OtionWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    '& > svg':{
        marginLeft: 20
    }
 })
function Header({toggleDrawer}) {
  return (
    <>
        <StyledAppbar position='static'>
            <Toolbar>
                <MenuIcon color='action' onClick={toggleDrawer}/>
                <img src={gmailLogo} alt ="logo" style={{width: 110 , marginLeft: 15}}/>
                <SearchWrapper>
                    <Search color='action'/>
                    <InputBase placeholder='Search Mail'/>
                    <Tune color='action'/>
                </SearchWrapper>
                <OtionWrapper>
                    <HelpOutline color='action'/>
                    <Settings color='action'/>
                    <Apps color='action'/>
                    <AccountCircle color='action'/>
                </OtionWrapper>
            </Toolbar>
            
        </StyledAppbar>
    </>
  )
}

export default Header