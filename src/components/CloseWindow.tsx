import React from 'react'

import { Button, Dialog, DialogContent, DialogActions, Alert, AlertTitle } from '@mui/material'
import texts from './texts'

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
			<DialogContent>
				<Alert severity='warning'>
					<AlertTitle>{texts.warningModal.alertTitle}</AlertTitle>
					{texts.warningModal.paragraph} <strong>{texts.warningModal.paragraphBold}</strong>
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
