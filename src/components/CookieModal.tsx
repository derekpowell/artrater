import React, { useState } from 'react'

import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import short from 'short-uuid'
import { useCookies } from 'react-cookie'

import CloseWindow from './CloseWindow'

import texts from './texts'

interface IProps {
	hasCookie: boolean
	toggleHasCookie: VoidFunction
}

const CookieModal = (props: IProps) => {
	const { hasCookie, toggleHasCookie } = props
	const [isWarning, setIsWarning] = useState<boolean>(false)
	const [cookies, setCookie] = useCookies(['user'])
	const acceptCookie = () => {
		// redirect to the survey page
		if (cookies.user) {
			toggleHasCookie()
		} else {
			const userId = short.generate()
			// make this 90 days and update every visit
			setCookie('user', userId, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 90, secure: true })
			toggleHasCookie()
		}
	}
	const toggleIsWarning = () => {
		setIsWarning(!isWarning)
	}
	const declineCookie = () => {
		toggleIsWarning()
	}

	return (
		<>
			{isWarning ? (
				<CloseWindow isWarning={isWarning} toggleIsWarning={toggleIsWarning} />
			) : (
				<Dialog open={!hasCookie}>
					<DialogTitle>{texts.cookie.title}</DialogTitle>
					<DialogContent>{texts.cookie.paragrah}</DialogContent>
					<DialogActions sx={{ padding: 2 }}>
						<Button variant='outlined' color='primary' onClick={declineCookie}>
							Decline
						</Button>
						<Button variant='contained' color='primary' onClick={acceptCookie}>
							Accept
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	)
}

export default CookieModal
