import React from 'react'

import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'

import { RatingData } from './types'
import texts from './texts'

interface IProps {
	isCompleted: boolean
	children?: JSX.Element | JSX.Element[]
	completedData: RatingData[]
}
const CompletedModal = (props: IProps) => {
	const { isCompleted } = props
	const closeWindow = () => {
		console.log('close window')
		window.close()
	}
	return (
		<Dialog open={isCompleted}>
			<DialogTitle>{texts.completedModal.title}</DialogTitle>
			<DialogContent>{texts.completedModal.paragraph}</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={closeWindow}>
					{texts.completedModal.buttonText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CompletedModal
