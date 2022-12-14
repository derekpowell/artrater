import React, { useState, useEffect } from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { RatingData, ImgTableData } from './types'

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
	toggleIsLoading: VoidFunction
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
		toggleIsLoading,
		imgUrl,
	} = props
	const rateRange = Array.from(Array(numOfStars).keys())
	const rateArr = new Array(numOfStars).fill(false)
	const [ratings, setRatings] = useState(rateArr)
	const [timeBegin, setTimeBegin] = useState<number>(Date.now())

	const rateAndNext = (rate: number) => {
		toggleIsLoading()
		const beginTime = timeBegin
		const endTime = Date.now()
		const diff = endTime - beginTime
		const copy = [...ratings]
		copy[rate] = true
		copy.forEach((bool, i) => (i <= rate ? (copy[i] = true) : (copy[i] = false)))
		setRatings(copy)
		const len = completedData.length + 1
		if (len >= numOfRatings) {
			toggleIsCompleted()
		} else {
			getNextData()
		}
		storeRatedData(rate, diff)
	}
	const storeRatedData = (rate: number, diff: number) => {
		const formatted: RatingData = {
			id: currentData.id || 0,
			contentId: currentData.contentId || null,
			time_spent: diff,
			url: currentData.image,
			rating: rate,
		}
		updateComplitedData(formatted)
	}
	useEffect(() => {
		if (isEnded) {
			setRatings(rateArr)
			setTimeBegin(Date.now())
			toggleIsEnded()
		}
	}, [imgUrl])
	useEffect(() => {
		//first time
		setTimeBegin(Date.now())
	}, [])

	return (
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
	)
}

export default RateStars
