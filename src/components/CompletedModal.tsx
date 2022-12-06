import React from 'react'

import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'

interface IProps {
	isCompleted: boolean
	children?: JSX.Element | JSX.Element[]
}
const CompletedModal = (props: IProps) => {
	const { isCompleted } = props
	return (
		<Dialog open={isCompleted}>
			<DialogTitle>Rating has been completed</DialogTitle>
			<DialogContent>Explanation how to get rewarded.</DialogContent>
			<DialogActions>
				<Button color='primary'>Get reward</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CompletedModal
