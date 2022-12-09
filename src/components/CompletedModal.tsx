import React from 'react'

import short from 'short-uuid'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { RatingData } from './types'

interface IProps {
	isCompleted: boolean
	children?: JSX.Element | JSX.Element[]
	completedData: RatingData[]
}
const CompletedModal = (props: IProps) => {
	const { isCompleted, completedData } = props

	const saveData = () => {
		const userId = short.generate()
		console.log('userId', userId)
		const timestamp = Date.now()
		const SAVE_URL = 'https://8lk48vno8a.execute-api.us-east-1.amazonaws.com/dev/save-rates'
		const formatted = {
			userId,
			timestamp,
			rates: completedData,
		}
		console.log({ formatted })
		fetch(SAVE_URL, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'no-cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(formatted), // body data type must match "Content-Type" header
		})
			.then((response) => response.json())
			.then((res) => {
				console.log('successfully saved', res)
			})
			.catch((err) => console.log(err))
	}
	return (
		<Dialog open={isCompleted}>
			<DialogTitle>Rating has been completed</DialogTitle>
			<DialogContent>Explanation how to get rewarded with mTuk.</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={saveData}>
					Get reward
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CompletedModal
