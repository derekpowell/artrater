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
	} = props
	const rateRange = Array.from(Array(numOfStars).keys())
	const rateArr = new Array(numOfStars).fill(false)
	const [isRated, setIsRated] = useState(rateArr)

	const rateAndNext = (rate: number) => {
		const copy = [...isRated]
		copy[rate] = true
		copy.forEach((bool, i) => (i < rate ? (copy[i] = true) : (copy[i] = false)))
		setIsRated(copy)
		storeRatedData(rate)
		console.log({ completedData })
		if (completedData.length > numOfRatings) {
			toggleIsCompleted()
		} else {
			getNextData()
		}
	}
	const storeRatedData = (rate: number) => {
		const formatted: RatingData = {
			title: currentData.title || '',
			contentId: currentData.contentId || null,
			artistContentId: currentData.artistContentId || null,
			artistName: currentData.artistName || '',
			completitionYear: currentData.completitionYear || null,
			genre: currentData.genre || '',
			style: currentData.style || '',
			tags: currentData.tags,
			image: currentData.image,
			height: currentData.height,
			width: currentData.width,
			artistUrl: currentData.artistUrl,
			url: currentData.url,
			maxRate: numOfStars,
			rate: rate,
		}
		updateComplitedData(formatted)
	}
	useEffect(() => {
		if (isEnded) {
			setIsRated(rateArr)
			toggleIsEnded()
		}
	}, [isEnded])
	return (
		<Stack direction='row' sx={{ flexWrap: 'wrap' }}>
			{rateRange.map((rate, i) => {
				return (
					<Box key={`rate-${rate}`}>
						{!isRated[i] ? (
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
								<StarIcon fontSize='inherit' />
							</IconButton>
						)}
					</Box>
				)
			})}
		</Stack>
	)
}

export default RateStars
