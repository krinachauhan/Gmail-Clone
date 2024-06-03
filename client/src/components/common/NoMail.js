import { Box , Divider, Typography, styled} from '@mui/material'
import React from 'react'

const Component = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
    opacity: '.8',
    width: '100%'
});

const DividerWrapper = styled(Divider)({
    width: '100%',
    marginTop: 10
})

const NoMail = ({message}) => {
  return (
    <>
        <Component>
            <Typography>{message.heading}</Typography>
            <Typography>{message.subHeading}</Typography>
            <DividerWrapper/>
        </Component>
    </>
  )
}

export default NoMail