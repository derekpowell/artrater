import { RatingData } from './types'

const FIND_IMG = process.env.REACT_APP_FIND_IMG
const SAVE_SURVEY = process.env.REACT_APP_SAVE_SURVEY
const DELETE_SURVEY = process.env.REACT_APP_DELETE_SURVEY

export const findImage = async (id: number) => {
	//fetch
	const params = { id: '' }
	const url = new URL(FIND_IMG || '')
	params.id = id + ''
	url.search = new URLSearchParams(params).toString()
	return await fetch(url).then((res) => res.json())
}

export const storeSurvey = async (data: RatingData) => {
	return await fetch(SAVE_SURVEY || '', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'no-cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin,
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then((response) => response.json())
		.then((res) => console.log('successfully saved', res))
		.catch((err) => console.log(err))
}

export const deleteSurvey = async (id: string) => {
	//fetch delete url
	const params = { id: '' }
	const url = new URL(DELETE_SURVEY || '')
	params.id = id + ''
	url.search = new URLSearchParams(params).toString()
	return await fetch(url).then((res) => res.json())
}
