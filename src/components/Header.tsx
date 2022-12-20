import React from 'react'
import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const StyledHeader = styled(Paper)(({ theme }) => ({
	width: '100%',
	position: 'fixed',
	height: 60,
	top: 0,
	left: 0,
	display: 'flex',
	alignItems: 'center',
	paddingLeft: 24,
	paddingRight: 24,
	borderRadius: 0,
	margin: 0,
	[theme.breakpoints.up('sm')]: {
		paddingLeft: 48,
		paddingRight: 48,
		height: 70,
	},
}))

const Header = () => {
	return (
		<StyledHeader elevation={3}>
			<Typography variant='h1'>artrater</Typography>
		</StyledHeader>
	)
}

export default Header
