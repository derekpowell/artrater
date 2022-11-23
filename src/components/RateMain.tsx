import React, { useState } from 'react'

import { Box, Button, Typography, Stack } from '@mui/material'
import { styled } from '@mui/system'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import RateStars from '../components/RateStars'

const MainContainer = styled(Box)({
	display: 'flex',
	marginTop: 70,
	justifyContent: 'center',
	alignItems: 'center',
	height: 'calc(100vh - 70px)',
	flexDirection: 'column',
})
const BtnContainer = styled(Box)({
	width: '100%',
	textAlign: 'left',
})
const styledBtn = {
	textTransform: 'capitalize',
	color: 'common.black',
}

const InnerContainer = styled(Stack)(({ theme }) => ({
	maxWidth: '100%',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	height: '100%',
	maxHeight: '100%',
	padding: 24,
	[theme.breakpoints.up('sm')]: {
		width: 600,
		maxWidth: 600,
		padding: 0,
	},
}))
const imgStyle = {
	width: 'auto',
	maxWidth: '100%',
	maxHeight: 700,
}
const RateMain = () => {
	const [imgUrl, setImgUrl] = useState(
		'https://uploads5.wikiart.org/00164/images/aaron-douglas/untitled4.png!Large.png',
	)
	const nextImgUrl = (url: string) => {
		setImgUrl(url)
	}
	return (
		<MainContainer>
			<InnerContainer>
				<Typography variant='h2'>Rate for painting xxx</Typography>
				<img src={imgUrl} style={imgStyle} />
				<RateStars nextImgUrl={nextImgUrl} imgUrl={imgUrl} />
				<BtnContainer>
					<Button variant='text' startIcon={<ArrowBackIosNewIcon />} sx={styledBtn}>
						Previous
					</Button>
				</BtnContainer>
			</InnerContainer>
		</MainContainer>
	)
}

export default RateMain
