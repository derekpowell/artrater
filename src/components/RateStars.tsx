import React, { useState } from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const RateStars = () => {
	const rateRange = [1, 2, 3, 4, 5]
	const [isRated, setIsRated] = useState([false, false, false, false, false])
	const API_URL = 'https://psjokdypgi.execute-api.us-east-1.amazonaws.com/test/pets'
	const NEXT_IMAGE_URL = 'https://5dhjz9rws2.execute-api.us-east-1.amazonaws.com/default/nextImage'
	// const POSTGRESQL_DB_HOST = 'artrater-free.cpl8bova6euu.us-east-1.rds.amazonaws.com'
	// const POSTGRESQL_DB_USER = 'artrater_dev'
	// const POSTGRESQL_DB_PASSWORD = 'artrater_dev_123'
	// const POSTGRESQL_DB = 'artrater-free'
	// const POSTGRESQL_PORT = 5432

	// const TABLE_NAME = 'Douglas Aaron'

	const rateAndNext = (rate: number) => {
		const copy = [...isRated]
		copy[rate] = true

		copy.forEach((bool, i) => (i < rate ? (copy[i] = true) : (copy[i] = false)))
		setIsRated(copy)

		fetch(API_URL)
			.then((response) => response.json())
			.then((data) => console.log('check', data))
		// save data via api gateway
		// take next image
		fetch(NEXT_IMAGE_URL)
			.then((res) => res.json())
			.then((data) => console.log('check', data))
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
