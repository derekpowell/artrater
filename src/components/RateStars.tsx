import React, { useState, useEffect } from 'react'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useCookies } from 'react-cookie'
import short from 'short-uuid'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import { RatingData, ImgTableData } from './types'
import { storeSurvey } from './functions'
import { useParams } from 'react-router-dom'

interface IProps {
	getNextData: VoidFunction
	isEnded: boolean
	toggleIsEnded: VoidFunction
	numOfStars: number
	updateComplitedData: (data: RatingData) => void
	currentData: ImgTableData
	toggleIsCompleted: VoidFunction
	numOfRatings: number
	completedData: RatingData[]
	updateIsLoading: (state: boolean) => void
	imgUrl: string
}

const RateStars = (props: IProps) => {
	const {
		getNextData,
		isEnded,
		toggleIsEnded,
		numOfStars,
		updateComplitedData,
		currentData,
		toggleIsCompleted,
		numOfRatings,
		completedData,
		updateIsLoading,
		imgUrl,
	} = props
	const rateRange = Array.from(Array(numOfStars).keys())
	const rateArr = new Array(numOfStars).fill(false)
	const [ratings, setRatings] = useState(rateArr)
	const [timeBegin, setTimeBegin] = useState<number>(Date.now())
	const [cookies] = useCookies(['user'])
	const { extUserId, groupId, misc } = useParams()
	const rateAndNext = (rate: number) => {
		updateIsLoading(true)
		toggleIsEnded()
		const beginTime = timeBegin
		const endTime = Date.now()
		const diff = endTime - beginTime
		const copy = [...ratings]
		copy[rate] = true
		copy.forEach((bool, i) => (i <= rate ? (copy[i] = true) : (copy[i] = false)))
		setRatings(copy)
		const len = completedData.length + 1
		storeRatedData(rate, diff).then((res) => {
			console.log({ res })
			if (len >= numOfRatings) {
				toggleIsCompleted()
			} else {
				getNextData()
			}
		})
	}
	const storeRatedData = (rate: number, diff: number) => {
		const id = short.generate()
		const formatted: RatingData = {
			id: id,
			paintingId: currentData.id || 0,
			userId: cookies.user,
			rating: rate + 1,
			timestamp: Date.now(),
			time_spent: diff,
			extUserId: extUserId || '',
			groupId: groupId || '',
			misc: misc || '',
		}

		updateComplitedData(formatted)
		return storeSurvey(formatted)
	}
	useEffect(() => {
		if (isEnded) {
			setRatings(rateArr)
			setTimeBegin(Date.now())
			toggleIsEnded()
		}
	}, [imgUrl])

	useEffect(() => {
		setTimeBegin(Date.now())
	}, [])

	return (
		<Stack>
			<Typography variant='h2' mb={1} sx={{ textAlign: 'center' }}>
				Your rating
			</Typography>
			<Stack direction='row' sx={{ flexWrap: 'wrap' }}>
				{rateRange.map((rate, i) => {
					return (
						<Box key={`rate-${rate}`}>
							{!ratings[i] ? (
								<IconButton
									aria-label='star'
									size='large'
									onClick={() => rateAndNext(rate)}
									sx={{ padding: 0 }}
								>
									<StarBorderIcon fontSize='inherit'></StarBorderIcon>
								</IconButton>
							) : (
								<IconButton aria-label='star filled' size='large' sx={{ padding: 0 }}>
									<StarIcon fontSize='inherit' color='primary' />
								</IconButton>
							)}
						</Box>
					)
				})}
			</Stack>
		</Stack>
	)
}

export default RateStars
