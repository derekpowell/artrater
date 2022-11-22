import React, { useState } from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const RateStars = () => {
	const rateRange = [1, 2, 3, 4, 5]
	const [isRated, setIsRated] = useState([false, false, false, false, false])
	const rateAndNext = (rate: number) => {
		console.log('clicked', rate)
		const copy = [...isRated]
		copy[rate] = true

		copy.forEach((bool, i) => (i < rate ? (copy[i] = true) : (copy[i] = false)))
		setIsRated(copy)

		// write db access and store
	}
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
