import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Typography, CircularProgress } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
// import { useCookies } from 'react-cookie'

import RateStarsText from './RateStarsText'
import CompletedModal from './CompletedModal'

import { RatingData, TextTableData } from './types'
import {
	MainContainer,
	BtnContainer,
	styledBtn,
	InnerContainer,
	TextContainer,
} from './StyledComponent'
import { findImage, deleteSurvey } from './functions'

const RateTextMain = () => {
	const { rates } = useParams()
	const minNumOfRatings = 20
	const maxNumOfRatings = 100
	const numOfStars = 5
	const [numOfRatings, setNumOfRatings] = useState<number>(rates ? +rates : maxNumOfRatings)
	const RANDOM_TEXT = process.env.REACT_APP_RANDOM_TEXT
	const [currentData, setCurrentData] = useState<TextTableData>({
		contentId: '',
		text: '',
		author: '',
	})
	const [completedData, setCompletedData] = useState<RatingData[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isCompleted, setIsCompleted] = useState<boolean>(false)
	const [isEnded, setIsEnded] = useState<boolean>(false)

	const toggleIsCompleted = () => {
		setIsCompleted(!isCompleted)
	}

	const getRandomTextData = () => {
		const fetchRandomText = () => {
			fetch(RANDOM_TEXT || '')
				.then((response) => response.json())
				.then((data) => {
					const found = completedData.find((item) => item.textId === data.rows[0].contentId)
					if (found) {
						fetchRandomText()
						console.log('duplicated', found.id)
					} else {
						console.log('not duplicated')
						setCurrentData(data.rows[0])
						setIsEnded(true)
					}
				})
		}

		fetchRandomText()
	}
	const toggleIsEnded = () => {
		setIsEnded(!isEnded)
	}
	const updateIsLoading = (state: boolean) => {
		setIsLoading(state)
	}

	const updateComplitedData = (data: RatingData) => {
		setCompletedData((oldArray) => [...oldArray, data])
	}

	const handlePrevious = async () => {
		const copy = [...completedData]
		const popped = copy.pop()
		setCompletedData(copy)
		if (popped?.paintingId) {
			const data = await findImage(+popped?.paintingId)
			if (data) {
				setIsEnded(true)
				setCurrentData(data.rows[0])
			}
		}
		if (completedData.length && popped?.id) {
			deleteSurvey(popped?.id)
		}
	}

	useEffect(() => {
		getRandomTextData()
		if (!!rates && +rates > maxNumOfRatings) {
			setNumOfRatings(maxNumOfRatings)
		} else if (!!rates && +rates < minNumOfRatings) {
			setNumOfRatings(minNumOfRatings)
		}
	}, [])

	return (
		<MainContainer>
			<CompletedModal isCompleted={isCompleted} completedData={completedData} />
			<InnerContainer>
				{isLoading ? (
					<CircularProgress color='primary' />
				) : (
					<TextContainer>
						<Typography variant='h3' sx={{ textAlign: 'justify' }}>
							{currentData && currentData.text}
						</Typography>
						<Typography variant='h4' sx={{ textAlign: 'right', width: '100%' }}>
							-{currentData && currentData.author}
						</Typography>
					</TextContainer>
				)}
				<RateStarsText
					getNextData={getRandomTextData}
					isEnded={isEnded}
					toggleIsEnded={toggleIsEnded}
					numOfStars={numOfStars}
					updateComplitedData={updateComplitedData}
					currentData={currentData}
					toggleIsCompleted={toggleIsCompleted}
					updateIsLoading={updateIsLoading}
					numOfRatings={numOfRatings}
					completedData={completedData}
				/>
				<BtnContainer>
					{!!completedData.length && (
						<Button
							variant='text'
							startIcon={<ArrowBackIosNewIcon />}
							sx={styledBtn}
							onClick={handlePrevious}
						>
							Previous
						</Button>
					)}
				</BtnContainer>
			</InnerContainer>
		</MainContainer>
	)
}

export default RateTextMain
