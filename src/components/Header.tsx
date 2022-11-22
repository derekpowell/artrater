import React from 'react'
import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'

const StyledHeader = styled(Paper)({
	width: '100%',
	position: 'fixed',
	height: 70,
	top: 0,
	left: 0,
	display: 'flex',
	alignItems: 'center',
	paddingLeft: 48,
	paddingRight: 48,
	borderRadius: 0,
	margin: 0,
})

const Header = () => {
	return (
		<StyledHeader elevation={3}>
			<Typography variant='h1'>artrater</Typography>
		</StyledHeader>
	)
}

export default Header
