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
	const GET_TABLE_DATA = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/access_db'

	const [currentData, setCurrentData] = useState<ImgTableData>()
	const [completedData, setCompletedData] = useState<number[][]>([])
	const [isErr, setIsErr] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const DELETE_URL = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/deleteimage'
	const [tableName, setTableName] = useState('')
	const [isEnded, setIsEnded] = useState<boolean>(false)
	const nextImgUrl = (url: string) => {
		setImgUrl(url)
	}
	const getRandomInt = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	const getNewTableData = (tableNum: string) => {
		const url = new URL(GET_TABLE_DATA)
		const params = { tableNum }
		url.search = new URLSearchParams(params).toString()
		return fetch(url).then((response) => response.json())
	}
	const updateTableName = (name: string) => {
		setTableName(name)
	}
	const updateCompletedData = (newCombo: number[]) => {
		setCompletedData((oldArray) => [...oldArray, newCombo])
	}
	const updateCurrentData = (data: ImgTableData) => {
		setCurrentData(data)
	}

	const toggleIsEnded = () => {
		setIsEnded(!isEnded)
	}
	const getNextData = () => {
		setIsLoading(true)
		let result = true
		let newCombo: number[] = []
		let tableData: ImgData = { tableName: '', rows: [] }
		let rowNum = 0
		do {
			console.log('while loop')
			const tableNum = getRandomInt(0, 1) + ''
			getNewTableData(tableNum).then((data: ImgData) => {
				console.log({ data })
				tableData = data
				const maxIndex = data.rows.length - 1
				rowNum = getRandomInt(0, maxIndex)
				newCombo = [+tableNum, +rowNum]
				result = completedData.includes(newCombo)
				if (!result) {
					updateValues(newCombo, tableData, rowNum)
				}
			})
		} while (!result)
	}
	const updateValues = (newCombo: number[], tableData: ImgData, rowNum: number) => {
		setCompletedData((oldArray) => [...oldArray, newCombo])
		setTableName(tableData.tableName)
		setCurrentData(tableData.rows[rowNum])
		setImgUrl(tableData.rows[rowNum].image || '')
		setIsEnded(true)
		setIsLoading(false)
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
				{isErr || isLoading ? (
					<CircularProgress color='primary' />
				) : (
					<img onError={handleError} src={imgUrl} style={imgStyle} />
				)}
				<RateStars
					nextImgUrl={nextImgUrl}
					imgUrl={imgUrl}
					updateTableName={updateTableName}
					updateCurrentData={updateCurrentData}
					// updateCurrentIndex={updateCurrentIndex}
					getRandomInt={getRandomInt}
					getNewTableData={getNewTableData}
					completedData={completedData}
					updateCompletedData={updateCompletedData}
					getNextData={getNextData}
					isEnded={isEnded}
					toggleIsEnded={toggleIsEnded}
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
