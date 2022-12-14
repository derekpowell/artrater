import React, { useEffect, useState } from 'react'

import { Box, Button, Typography, Stack, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'

export const MainContainer = styled(Box)({
	display: 'flex',
	marginTop: 70,
	justifyContent: 'center',
	alignItems: 'center',
	height: 'calc(100vh - 70px)',
	flexDirection: 'column',
})
export const BtnContainer = styled(Box)({
	width: '100%',
	textAlign: 'left',
})
export const styledBtn = {
	textTransform: 'capitalize',
	color: 'common.black',
}

export const InnerContainer = styled(Stack)(({ theme }) => ({
	maxWidth: '100%',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	height: '100%',
	maxHeight: '100%',
	padding: 24,
	[theme.breakpoints.up('sm')]: {
		width: '100%',
		maxWidth: 800,
		padding: 0,
		margin: 24,
	},
}))
export const ImgContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	maxWidth: '100%',
	alignItems: 'center',
	height: '100%',
	maxHeight: 'calc(100% - 200px)',
	padding: 24,
	[theme.breakpoints.up('sm')]: {
		width: 600,
		maxWidth: 600,
		padding: 0,
	},
}))
export const imgStyle = {
	width: 'auto',
	maxWidth: '100%',
	maxHeight: 'calc(100% - 24px)',
}

export const FullWidthHeight = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	maxWidth: '100%',
	alignItems: 'center',
	marginTop: 70,
	height: 'calc(100vh - 70px)',
	padding: 24,
	// [theme.breakpoints.up('sm')]: {
	// 	width: 600,
	// 	maxWidth: 600,
	// 	padding: 0,
	// },
}))
