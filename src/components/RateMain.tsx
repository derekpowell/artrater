import React, { useState } from 'react'

import { Box, Button, Typography, Stack, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import RateStars from '../components/RateStars'
import { ImgTableData, ImgData } from './types'

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
	maxHeight: 'calc(100% - 200px)',
}
const RateMain = () => {
	const [imgUrl, setImgUrl] = useState(
		'https://uploads5.wikiart.org/00164/images/aaron-douglas/untitled4.png!Large.png',
	)
	const [currentData, setCurrentData] = useState<ImgTableData>()
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [isErr, setIsErr] = useState<boolean>(false)
	const DELETE_URL = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/deleteimage'
	const GET_URL = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/access_db'
	const [tableName, setTableName] = useState('')
	const nextImgUrl = (url: string) => {
		setImgUrl(url)
	}

	const updateTableName = (name: string) => {
		setTableName(name)
	}
	const updateCurrentData = (data: ImgTableData) => {
		setCurrentData(data)
	}
	const updateCurrentIndex = (index: number) => {
		setCurrentIndex(index)
	}
	const getNextData = () => {
		fetch(GET_URL)
			.then((response) => response.json())
			.then((data: ImgData) => {
				console.log('check', data)
				const nextIndex = currentIndex + 1
				updateTableName(data.tableName)
				nextImgUrl(data.rows[nextIndex].image)
				updateCurrentData(data.rows[nextIndex])
				setCurrentIndex(nextIndex)
				setIsErr(false)
			})
	}
	const handleError = () => {
		console.log('image url broken')
		setIsErr(true)
		const url = new URL(DELETE_URL)
		const params = {
			table: tableName,
			id: '',
		}
		if (currentData) {
			params.id = currentData.contentId + ''
		}
		url.search = new URLSearchParams(params).toString()

		fetch(url).then((res) => {
			console.log('res', res.json())
			getNextData()
		})
	}
	return (
		<MainContainer>
			<InnerContainer>
				<Typography variant='h2'>
					Rate for <b>{currentData?.title}</b> by <b>{currentData?.artistName}</b>
				</Typography>
				{isErr ? (
					<CircularProgress color='primary' />
				) : (
					<img onError={handleError} src={imgUrl} style={imgStyle} />
				)}
				<RateStars
					nextImgUrl={nextImgUrl}
					imgUrl={imgUrl}
					updateTableName={updateTableName}
					updateCurrentData={updateCurrentData}
					updateCurrentIndex={updateCurrentIndex}
				/>
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
