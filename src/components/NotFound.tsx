import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { FullWidthHeight } from './StyledComponent'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<FullWidthHeight>
			<Typography variant='h1' mb={2}>
				Not Found
			</Typography>
			<Button variant='contained' color='primary' onClick={() => navigate(-1)}>
				Go back
			</Button>
		</FullWidthHeight>
	)
}

export default NotFound
