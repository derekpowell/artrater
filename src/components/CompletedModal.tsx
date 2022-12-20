import React from 'react'

import short from 'short-uuid'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useCookies } from 'react-cookie'

import { RatingData } from './types'

interface IProps {
	isCompleted: boolean
	children?: JSX.Element | JSX.Element[]
	completedData: RatingData[]
}
const CompletedModal = (props: IProps) => {
	const { isCompleted } = props
	const closeWindow = () => {
		window.close()
	}
	return (
		<Dialog open={isCompleted}>
			<DialogTitle>Rating has been completed</DialogTitle>
			<DialogContent>Congratulations!</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={closeWindow}>
					Close this window.
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CompletedModal
