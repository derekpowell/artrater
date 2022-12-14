import React from 'react'

import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Alert,
	AlertTitle,
} from '@mui/material'

interface IProps {
	isWarning: boolean
	toggleIsWarning: VoidFunction
}

const CloseWindow = (props: IProps) => {
	const { isWarning, toggleIsWarning } = props
	const goBack = () => {
		// redirect to the survey page
		toggleIsWarning()
	}

	const closeWindow = () => {
		//write func to close the window.
		window.close()
	}
	return (
		<Dialog open={isWarning}>
			{/* <DialogTitle>Warning</DialogTitle> */}
			<DialogContent>
				<Alert severity='warning'>
					<AlertTitle>Warning</AlertTitle>
					Are you sure you want to discontinue this survey?{' '}
					<strong>The reward code will be provided at the end of the survey.</strong>
				</Alert>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' color='primary' onClick={closeWindow}>
					Close window
				</Button>
				<Button variant='contained' color='primary' onClick={goBack}>
					Go back
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CloseWindow
