import React from 'react'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

interface IProps {
	rateAndNext: (rate: number) => void
	rateRange: number[]
	ratings: boolean[]
}

const RateStars = (props: IProps) => {
	const { rateAndNext, ratings, rateRange } = props
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
