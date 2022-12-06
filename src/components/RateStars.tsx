import React, { useState, useEffect } from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

interface IProps {
	getNextData: VoidFunction
	isEnded: boolean
	toggleIsEnded: VoidFunction
}

const RateStars = (props: IProps) => {
	const { getNextData, isEnded, toggleIsEnded } = props
	const rateRange = [1, 2, 3, 4, 5]
	const [isRated, setIsRated] = useState([false, false, false, false, false])

	const rateAndNext = (rate: number) => {
		const copy = [...isRated]
		copy[rate] = true
		copy.forEach((bool, i) => (i < rate ? (copy[i] = true) : (copy[i] = false)))
		setIsRated(copy)
		getNextData()
	}
	useEffect(() => {
		if (isEnded) {
			setIsRated([false, false, false, false, false])
			toggleIsEnded()
		}
	}, [isEnded])
	return (
		<Stack direction='row'>
			{rateRange.map((rate, i) => {
				return (
					<Box key={`rate-${rate}`}>
						{!isRated[i] ? (
							<IconButton aria-label='star' size='large' onClick={() => rateAndNext(rate)}>
								<StarBorderIcon fontSize='inherit'></StarBorderIcon>
							</IconButton>
						) : (
							<IconButton aria-label='star filled' size='large'>
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
