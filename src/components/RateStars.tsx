import React, { useState } from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

interface IProps {
	nextImgUrl: (str: string) => void
	imgUrl: string
}
const RateStars = (props: IProps) => {
	const rateRange = [1, 2, 3, 4, 5]

	const [isRated, setIsRated] = useState([false, false, false, false, false])
	// const API_URL = 'https://psjokdypgi.execute-api.us-east-1.amazonaws.com/test/pets'
	// const NEXT_IMAGE_URL = 'https://5dhjz9rws2.execute-api.us-east-1.amazonaws.com/default/nextImage'
	const API_URL = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/access_db'

	const rateAndNext = (rate: number) => {
		const copy = [...isRated]
		copy[rate] = true

		copy.forEach((bool, i) => (i < rate ? (copy[i] = true) : (copy[i] = false)))
		setIsRated(copy)

		fetch(API_URL)
			.then((response) => response.json())
			.then((data) => {
				console.log('check', data)
				const currentIndex = data.findIndex((element: any) => element.image === props.imgUrl)
				if (currentIndex) {
					props.nextImgUrl(data[currentIndex + 1].image)
				} else {
					props.nextImgUrl(data[0].image)
				}
			})
			.then((res) => setIsRated([false, false, false, false, false]))
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
