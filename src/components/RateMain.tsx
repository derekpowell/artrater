import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Typography, CircularProgress } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import RateStars from '../components/RateStars'
import CompletedModal from './CompletedModal'
import { ImgTableData, ImgData, RatingData } from './types'
import {
	MainContainer,
	BtnContainer,
	styledBtn,
	InnerContainer,
	ImgContainer,
	imgStyle,
} from './StyledComponent'

const RateMain = () => {
	const { stars } = useParams()
	console.log({ stars })
	const minRate = 20
	const maxRate = 100
	const [numOfStars, setNumOfStars] = useState<number>(minRate)
	const numOfRatings = 1
	// const GET_TABLE_DATA = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/access_db'
	const DELETE_URL = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/deleteimage'
	const RANDOM_IMG = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/random-img'
	const [imgUrl, setImgUrl] = useState('')
	const [currentData, setCurrentData] = useState<ImgTableData>({ title: '' })
	const [completedData, setCompletedData] = useState<RatingData[]>([])
	const [isErr, setIsErr] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isCompleted, setIsCompleted] = useState<boolean>(false)

	// const [tableName, setTableName] = useState('')
	const [isEnded, setIsEnded] = useState<boolean>(false)

	const toggleIsCompleted = () => {
		setIsCompleted(!isCompleted)
	}
	const getRandomImgData = () => {
		//fetch random data via api
		let isDuplicate = true
		do {
			return fetch(RANDOM_IMG)
				.then((response) => response.json())
				.then((data) => {
					console.log({ data })
					console.log('rows', data.rows[0])
					const found = completedData.find((item) => item.contentId === data.rows[0].contentId)
					if (found) {
						isDuplicate = true
					} else {
						isDuplicate = false
					}
					setCurrentData(data.rows[0])
					setImgUrl(data.rows[0].image)
					setIsLoading(false)
					setIsErr(false)
					setIsEnded(true)
				})
				.catch((err) => console.log({ err }))
		} while (!isDuplicate)
	}
	// const getRandomInt = (min: number, max: number) => {
	// 	return Math.floor(Math.random() * (max - min + 1)) + min
	// }
	// const getNewTableData = (tableNum: string) => {
	// 	const url = new URL(GET_TABLE_DATA)
	// 	const params = { tableNum }
	// 	url.search = new URLSearchParams(params).toString()
	// 	return fetch(url).then((response) => response.json())
	// }

	const toggleIsEnded = () => {
		setIsEnded(!isEnded)
	}

	const updateComplitedData = (data: RatingData) => {
		console.log('data updated')
		setCompletedData((oldArray) => [...oldArray, data])
		setIsEnded(true)
		setIsLoading(false)
		setIsErr(false)
	}
	const handleError = () => {
		console.log('image url broken')
		setIsErr(true)
		const params = { id: '' }
		const url = new URL(DELETE_URL)
		if (currentData) {
			params.id = currentData.contentId + ''
			url.search = new URLSearchParams(params).toString()

			fetch(url).then((res) => {
				console.log('res', res.json())
				getRandomImgData()
			})
		} else {
			getRandomImgData()
		}
	}
	useEffect(() => {
		if (!!stars && +stars > maxRate) {
			setNumOfStars(maxRate)
		} else if (!!stars && +stars < minRate) {
			setNumOfStars(minRate)
		} else if (typeof stars !== 'undefined') {
			setNumOfStars(+stars)
		}
	}, [])

	return (
		<MainContainer>
			<CompletedModal isCompleted={isCompleted} completedData={completedData} />
			<InnerContainer>
				<Typography variant='h2' pt={1}>
					Rate for <b>{currentData?.title}</b> by <b>{currentData?.artistName}</b>
				</Typography>
				{isErr || isLoading ? (
					<CircularProgress color='primary' />
				) : (
					<ImgContainer>
						<img onError={handleError} src={imgUrl} style={imgStyle} />
					</ImgContainer>
				)}
				<RateStars
					getNextData={getRandomImgData}
					isEnded={isEnded}
					toggleIsEnded={toggleIsEnded}
					numOfStars={numOfStars}
					updateComplitedData={updateComplitedData}
					currentData={currentData}
					toggleIsCompleted={toggleIsCompleted}
					numOfRatings={numOfRatings}
					completedData={completedData}
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
